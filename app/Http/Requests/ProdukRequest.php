<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProdukRequest extends FormRequest
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
                "name" => "required|string",
                "code" => "required|string",
                "category_id" => "required|integer|exists:kategoris,id",
                "units" => "required|string",
                "unit_price" => "required",
                "minimum_stock" => "required|integer"
            ];
        }
        if($this->method() == "PUT" || $this->method() === "PATCH") {
            return [
                "name" => "required|string",
                "code" => "required|string",
                "category_id" => "required|integer|exists:kategoris,id",
                "units" => "required|string",
                "unit_price" => "required",
                "minimum_stock" => "required|integer"
            ];
        }
    }
}
