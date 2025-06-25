type Setter<T> = React.Dispatch<React.SetStateAction<T>>

export const addField = <T extends object>(setter: Setter<T>, key: keyof T, newItem: unknown) => {
    setter(prev => ({
        ...prev,
        [key]: [...(prev[key] as []), newItem]
    }))
}

export const removeField = <T extends object>(setter: Setter<T>, key: keyof T, index: unknown) => {
    setter(prev => ({
        ...prev,
        [key]: (prev[key] as unknown[]).filter((_, i) => i !== index)
    }))
};

export const createHandleDetailChange = <T extends Record<string, any>, K extends keyof T = keyof T>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    getProducts: () => { id: number, name: string, unit_price: number }[],
    fieldKey: K
  ) => {
    return (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target

      setter(prev => {
        const updatedDetails = [...(prev[fieldKey] as any[])]

        updatedDetails[index] = {
          ...updatedDetails[index],
          [name]: name === "quantity" || name === "product_id" ? parseInt(value) : value,
        }

        if (name === "product_id") {
          const selectedProduct = getProducts().find(
            (p) => p.id === parseInt(value)
          )
          updatedDetails[index].unit_price = selectedProduct ? selectedProduct.unit_price : 0
        }

        const quantity = updatedDetails[index].quantity || 0
        const unit_price = updatedDetails[index].unit_price || 0
        updatedDetails[index].subtotal = quantity * unit_price

        return {
          ...prev,
          [fieldKey]: updatedDetails,
        }
      })
    }
  }
