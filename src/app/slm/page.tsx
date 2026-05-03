"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "../context/ThemeContext"

type Message = { role: "user" | "assistant"; content: string }

export default function SLM() {
  const { theme } = useTheme()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function send() {
    if (!input.trim() || streaming) return

    const userMsg: Message = { role: "user", content: input.trim() }
    const next: Message[] = [...messages, userMsg, { role: "assistant", content: "" }]
    setMessages(next)
    setInput("")
    setStreaming(true)
    inputRef.current?.focus()

    try {
      const res = await fetch("/api/slm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })

      if (!res.ok) {
        setMessages(prev => {
          const copy = [...prev]
          copy[copy.length - 1] = { role: "assistant", content: `error: ${res.status} ${res.statusText}` }
          return copy
        })
        return
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const text = decoder.decode(value, { stream: true })
        for (const line of text.split("\n")) {
          if (!line.startsWith("data: ")) continue
          const raw = line.slice(6).trim()
          if (raw === "[DONE]") break
          try {
            const { token } = JSON.parse(raw)
            setMessages(prev => {
              const copy = [...prev]
              copy[copy.length - 1] = {
                role: "assistant",
                content: copy[copy.length - 1].content + token + " ",
              }
              return copy
            })
          } catch {}
        }
      }
    } finally {
      setStreaming(false)
    }
  }

  return (
    // full width div
    <div className="w-full flex flex-col items-center justify-center">
      {/* actual wrapper for everything */}
      <div className="w-[80vw] md:w-[60vw] mt-5 md:mt-10 flex flex-col h-[65vh] md:h-[85vh]">
        {/* title + code */}
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-2xl font-bold">SLM</h1>
          <Link target="_blank" href="https://github.com/minghanminghan/slm">
            <u>code</u>
          </Link>
        </div>
        {/* message display */}
        <div className="w-full flex-1 overflow-y-auto border rounded p-4 flex flex-col gap-2 text-sm">
          {messages.length === 0 && (
            <span className="text-gray-400 m-auto">send a message to start</span>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <span className={`px-3 py-1 rounded max-w-[80%] whitespace-pre-wrap ${
                m.role === "user" ? "bg-blue-500 text-white" : theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-800"
              }`}>
                {m.content}
                {m.role === "assistant" && streaming && i === messages.length - 1 && "▌"}
              </span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        {/* message input */}
        <div className="w-full mt-4 flex gap-2">
          <input
            ref={inputRef}
            className="flex-1 border rounded px-3 py-2 focus:outline-none text-sm"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="message"
            disabled={streaming}
          />
          <button
            className="border rounded px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={send}
            disabled={streaming}
          >
            send
          </button>
        </div>
      </div>
    </div>
  )
}
