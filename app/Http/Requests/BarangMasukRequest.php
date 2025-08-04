<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BarangMasukRequest extends FormRequest
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
                "reference_code" => "required|string",
                "date" => "required|string",
                "supplier_name" => "required|string",
                "description" => "required|string",
                "created_by" => "required",
                "product_details" => "required|array",
                "product_details.*.product_id" => "required|exists:produks,id",
                "product_details.*.quantity" => "required|integer",
                "product_details.*.unit_price" => "required|numeric",
                "product_details.*.subtotal" => "required|numeric",
            ];
        }
        if($this->method() == "PUT" || $this->method() == "PATCH") {
            return [
                "reference_code" => "required|string",
                "date" => "required|string",
                "supplier_name" => "required|string",
                "description" => "required|string",
                "created_by" => "required",
                "product_details" => "required|array",
                "product_details.*.id" => 'required|integer',
                "product_details.*.product_id" => "required|exists:produks,id",
                "product_details.*.quantity" => "required|integer",
                "product_details.*.unit_price" => "required|numeric",
                "product_details.*.subtotal" => "required|numeric",
            ];
        }
    }
}
