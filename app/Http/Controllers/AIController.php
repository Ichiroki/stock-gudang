<?php

namespace App\Http\Controllers;

use App\Models\AI\ChatMessage;
use App\Models\AI\ChatSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIController extends Controller
{
    public function index() {
        $userId = auth()->id();

        $sessions = ChatSession::where("user_id", $userId)->withCount('messages')->latest()->get();

        return response()->json($sessions, 200);
    }

    public function createSession(Request $request) {
        $request->validate([
            'title' => 'nullable|string|max:255'
        ]);

        $session = ChatSession::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'started_at' => now()
        ]);

        return response()->json($session, 200);
    }

    public function addMessage(Request $request, $sessionId) {
        $request->validate([
            'role' => 'required|in:users,assistant',
            'messages' => 'required|string'
        ]);

        $session = ChatSession::findOrFail($sessionId);

        if($session->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized', 403]);
        }

        $message = ChatMessage::create([
            'chat_session_id' => $sessionId,
            'role' => $request->role,
            'message' => $request->message,
            'created_at' => now()
        ]);

        return response()->json($message, 200);
    }

    public function addMessageWithAI(Request $request, $sessionId) {
        $request->validate([
            'message' => 'required|string'
        ]);

        $session = ChatSession::findOrFail($sessionId);

        if($session->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized', 403]);
        }

        ChatMessage::create([
            'chat_session_id' => $sessionId,
            'role' => 'user',
            'message' => $request->message,
            'created_at' => now()
        ]);

        $messages = ChatMessage::where('chat_session_id', $sessionId)->orderBy('created_at')->get()->map(fn($m) => [
            'role' => $m->role,
            'content' => $m->message
        ])
        ->toArray();

        $response = Http::post('http://localhost:11434/chat', [
            'model' => 'llama3',
            'messages' => $messages,
            'stream' => false
        ]);

        $aiReply = $response['choices'][0]['message']['content'] ?? "Maaf, saya tidak bisa menjawab saat ini";

        $assistantMessage = ChatMessage::create([
            'chat_session_id' => $sessionId,
            'role' => 'assistant',
            'message' => $aiReply,
            'created_at' => now()
        ]);

        return response()->json($assistantMessage);
    }

    public function getMessages($sessionId) {
        $sessions = ChatSession::with(['messages'])->findOrFail($sessionId);

        if($sessions->user_id !== auth()->id()) {
            return response()->json(['error'=> 'Unauthorized', 403]);
        }

        return response()->json($sessions->messages);
    }

    public function searchMessages(Request $request, $sessionId)
    {
        $request->validate([
            'q' => 'required|string',
        ]);

        $session = ChatSession::findOrFail($sessionId);

        if ($session->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $results = ChatMessage::where('chat_session_id', $sessionId)
            ->where('message', 'like', '%' . $request->q . '%')
            ->get();

        return response()->json($results);
    }

    public function deleteSession($id) {
        $sessions = ChatSession::with('messages')->findOrFail($id);

        if($sessions->user_id !== auth()->id()) {
            return response()->json(['error'=> 'Unauthorized', 403]);
        }

        $sessions->messages()->delete();
        $sessions->delete();

        return response()->json(['messages' => "Sesi berhasil dihapus"]);
    }
}
