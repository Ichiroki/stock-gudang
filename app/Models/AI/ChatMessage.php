<?php

namespace App\Models\AI;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    use HasFactory;

    protected $table = 'ai_chat_messages';

    public $timestamps = false;

    protected $fillable = [
        "chat_session_id",
        "role",
        "message",
        "created_at"
    ];

    protected $dates = ["created_at"];

    public function session(){
        return $this->belongsTo(ChatSession::class);
    }
}
