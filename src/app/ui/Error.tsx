"use client"

import { useRouter } from "next/navigation"

export default function Error() {
    const router = useRouter()

    return (
        <div className="w-full h-screen flex flex-col gap-4 text-center items-center justify-center">
            <p>Not implemented yet. Sorry!</p>
            <button className="rounded outline p-2 cursor-pointer" onClick={() => router.back()}>Back</button>
        </div>
    )
}