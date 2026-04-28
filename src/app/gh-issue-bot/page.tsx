"use client"

import Link from "next/link";
import { useState } from "react";
import { RequestBody } from "@/app/api/gh-issue-bot/route";

// TODO: add a "use my slm model!" button here

export default function GH_Issue_Bot() {
	const [formOpen, setFormOpen] = useState(true)
	const [msgsOpen, setMsgsOpen] = useState(false)
	const [messages, setMessages] = useState<string[]>([])

	async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData) as unknown as RequestBody

		setFormOpen(false)
		setMsgsOpen(true)
		setMessages([])

		const response = await fetch('/api/gh-issue-bot', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})

		const reader = response.body!.getReader()
		const decoder = new TextDecoder()

		while (true) {
			const { done, value } = await reader.read()
			if (done) break

			const text = decoder.decode(value, { stream: true })
			for (const line of text.split('\n')) {
				if (line.startsWith('data: ')) {
					try {
						const { message } = JSON.parse(line.slice(6))
						setMessages(prev => [...prev, message])
					} catch {}
				}
			}
		}
	}

	return (
		// horizontal parent wrapper
		<div className="my-5 flex-1 md:max-w-[60vw] mx-auto h-full flex flex-col items-center justify-center gap-4">
			{/* title */}
			<div className="w-full flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold">Github Issue Bot</h1>
				<Link target="_blank" href="https://github.com/minghanminghan/gh-issue-to-pr">
					<u>code</u>
				</Link>
			</div>

			{/* form: api key, endpoint, issue */}
			<div className="w-full border rounded">
				<button
					className="w-full flex justify-between items-center px-4 py-2 font-semibold cursor-pointer"
					onClick={() => setFormOpen(o => !o)}
				>
					<span>Form</span>
					<span>{formOpen ? '▲' : '▼'}</span>
				</button>
				{formOpen && <form
					className="bg-white shadow-md rounded px-8 pt-6 pb-8"
					onSubmit={handleSubmit}
				>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="api_key">
							API Key
						</label>
						<input required
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							name="api_key"
							id="api_key"
							type="text"
							placeholder="API Key"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="api_endpoint">
							API Endpoint
						</label>
						<input required
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							name="api_endpoint"
							id="api_endpoint"
							type="text"
							placeholder="API Endpoint"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issue_url">
							Github Issue URL
						</label>
						<input required
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							name="issue_url"
							id="issue_url"
							type="text"
							placeholder="https://github.com/..."
						/>
					</div>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Submit
					</button>
				</form>}
				</div>

			{/* messages */}
			<div className="w-full border rounded">
				<button
					className="w-full flex justify-between items-center px-4 py-2 font-semibold cursor-pointer"
					onClick={() => setMsgsOpen(o => !o)}
				>
					<span>Messages</span>
					<span>{msgsOpen ? '▲' : '▼'}</span>
				</button>
				{msgsOpen && (
					<ul className="px-4 pb-4 flex flex-col gap-1 font-mono text-sm max-h-96 overflow-y-auto">
						{messages.length === 0
							? <li className="text-gray-400">No messages yet.</li>
							: messages.map((m, i) => <li key={i}>&gt; {m}</li>)
						}
					</ul>
				)}
			</div>
		</div>
	)
}
