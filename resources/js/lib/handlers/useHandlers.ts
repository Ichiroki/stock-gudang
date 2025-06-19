import { FormEvent, ChangeEvent } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

type Setter<T> = React.Dispatch<React.SetStateAction<T>>

export const createHandleChange = <T extends object>(setter: Setter<T>) => (e: ChangeEvent<HTMLInputElement | HTMLFormElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setter(prev => ({...prev, [name]: value}))
}

export const createHandleEditChange = <T extends object>(setter: Setter<T>) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setter(prev => ({...prev, [name]: value}))
}

export const createShow = <T extends object>(
        setter: React.Dispatch<React.SetStateAction<T>>,
        url: string,
        mapFn?: (data: any) => T
    ) => async() => {
    try {
        const res = await axios.get(url)
        const data = res.data.data

        if(mapFn) {
            setter(mapFn(data))
        } else {
            setter(data)
        }
    } catch(e) {
        console.error('njir error', e)
    }
}

export const createHandleSubmit = (url: string, data: any, successMessage: string) => async (e: FormEvent) => {
    e.preventDefault()
    try {
        const res = await axios.post(url, data)
        if(res.data.status === "success") {
            toast(successMessage)
        }
    } catch(e) {
        toast(`Njir gagal ${e}`)
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
