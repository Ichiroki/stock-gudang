import { SharedData } from "@/types"
import { Button } from "@headlessui/react"
import { usePage } from "@inertiajs/react"
import axios from "axios"
import { MessageCircle, X } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type MessageType = {
    message: string
    role: string
}

function ChatWidget() {

    const { auth } = usePage<SharedData>().props
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<MessageType[]>([])
    const [input, setInput] = useState('')
    const [sessionId, setSessionId] = useState<number | null>(null)

    useEffect(() => {
        const chatBox = document.querySelector('.chat-scroll-container')
        if(chatBox) chatBox.scrollTop = chatBox.scrollHeight
    }, [messages])

    useEffect(() => {
        if(isOpen && !sessionId) {
            axios.post('/chat/sessions', {
                user_id: auth.user.id,
                title: 'AI Assistant'
            }).then(res => {
                setSessionId(res.data.id)
            })
        }
    }, [isOpen])

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = input.trim
        if(!trimmed || !sessionId) return

        const userMsg = { role: 'user', message: input }

        setMessages(prev => [...prev, userMsg])
        setInput('')

        const res = await axios.post(`/chat/sessions/${sessionId}/ask`, {
            message: input
        })

        setMessages(prev => [
            ...prev,
            {
                role: 'assistant',
                message: res.data.message
            },
        ])
    }

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
                aria-label="Open Chat"
            >
                <MessageCircle/>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: .3 }}
                    className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-lg dark:bg-stone-900 border rounded-lg flex flex-col z-50"
                    >
                        <div className="p-3 border-b flex justify-between">
                            <strong>AI Assistant</strong>
                            <button onClick={() => setIsOpen(false)}>
                                <X></X>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-3 space-y-2 chat-scroll-container">
                        {messages.map((msg, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                key={idx}
                                className={`p-2 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-blue-100 dark:bg-blue-500 self-end' : 'bg-gray-100 dark:text-stone-900 self-start'}`}>
                                    {msg.message}
                            </motion.div>
                        ))}
                        </div>

                        <form onSubmit={sendMessage} className="p-2 border-t flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                className="flex-1 border rounded px-2 py-1"
                                placeholder="Tulis pertanyaan..."
                            />
                            <button type="submit" className="bg-blue-500 text-white px-3 rounded">Kirim</button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default ChatWidget;
