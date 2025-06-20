<?php

namespace App\Models\AI;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatSession extends Model
{
    use HasFactory;

    protected $table = "ai_chat_sessions";

    protected $fillable = [
        'user_id',
        'title',
        'started_at'
    ];

    protected $dates = ['started_at'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function messages() {
        return $this->hasMany(ChatMessage::class);
    }
}
