<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KategoriRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        if($this->method() == "POST") {
            return [
                "name" => "required|string"
            ];
        }
        if($this->method() == "PUT" || $this->method() === "PATCH") {
            return [
                "name" => "required|string"
            ];
        }
    }
}
