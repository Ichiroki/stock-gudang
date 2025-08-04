import { FormEvent, ChangeEvent } from 'react'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

type Setter<T> = React.Dispatch<React.SetStateAction<T>>

export const createHandleChange = <T extends object>(setter: Setter<T>) => (e: ChangeEvent<HTMLInputElement | HTMLFormElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setter(prev => ({...prev, [name]: value}))
}

export const createHandleEditChange = <T extends object>(setter: Setter<T>) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setter(prev => ({...prev, [name]: value}))
}

export const createGet = <T>(
    url: string,
    setter: React.Dispatch<React.SetStateAction<T>>,
    // pagination?: React.Dispatch<React.SetStateAction<T>>
  ) => async () => {
    try {
      const res = await axios.get(url)
    //   const { current_page, data, last_page} = res.data
      const {data} = res.data
      setter(data)
    //   pagination({
    //     current_page: current_page,
    //     last_page: last_page
    //   })
    } catch (e) {
      console.error('njir error', e)
    }
  }

export const createShow = <T, R = any>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    url: string,
    mapFn?: (data: R) => T
  ) => async () => {
    try {
      const res = await axios.get(url)
      const data: R = res.data.data
      setter(mapFn ? mapFn(data) : (data as unknown as T))
    } catch (e) {
        console.error('njir error', e)
    }
  }

export const createHandleSubmit = (url: string, data: any, successMessage: string, errorMessage: React.Dispatch<React.SetStateAction<T>>) => async (e: FormEvent) => {
    e.preventDefault()
    try {
        const res = await axios.post(url, data, {
            headers: {
                "Accept": "application/json"
            }
        })
        if(res.data.status === "success") {
            toast(successMessage)
            errorMessage({})
        }
        if(res.status === 302) {
            toast("Fitur ini hanya untuk pembelian aplikasi")
        }
    } catch(e) {
        const error = e as AxiosError<any>

        if(error.response?.status === 422) {
            const validationErrors = error.response.data.errors
            errorMessage(validationErrors)
        } else {
            toast(`Gagal menyimpan data: ${e.response.message}`)
        }
    }
}

export const createHandleUpdate = (url: string, data: any, successMessage?: string) => async (e: FormEvent) => {
    e.preventDefault()
    try {
        const res = await axios.put(url, data)
        if(res.data.status === "success") {
            toast(successMessage)
        }
    } catch(e) {
        toast(`Njir gagal ${e}`)
    }
}

export const createHandleDelete = (url: string, successMessage?: string) => async (e: FormEvent) => {
    e.preventDefault()
    try {
        const res = await axios.delete(url)
        if(res.data.status === "success") {
            toast(successMessage)
        }
    } catch(e) {
        toast(`Njir gagal ${e}`)
    }
}
