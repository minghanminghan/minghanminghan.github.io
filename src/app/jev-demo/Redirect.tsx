"use client"

import { useEffect } from "react"

export default function Redirect({ url }: { url: string }) {
  useEffect(() => {
    // replace, not assign: /jev-demo stays out of history, so back goes home
    window.location.replace(url)
  }, [url])

  return null
}
