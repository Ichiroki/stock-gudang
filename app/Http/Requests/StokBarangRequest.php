<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StokBarangRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
                "produk_id" => "required|exists:produks,id",
                "stock" => "required|integer|gt:5",
                "minimum_stock" => "required|integer|gt:5",
                "last_updated_by" => "required|string",
            ];
        }
        if($this->method() == "PUT" || $this->method() === "PATCH") {
            return [
                "produk_id" => "required|exists:produks,id",
                "stock" => "required|integer",
                "minimum_stock" => "required|integer",
                "last_updated_by" => "required|string",
            ];
        }
    }
}
