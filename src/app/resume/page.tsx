'use client'

import { redirect } from "next/navigation"
import { useViewContext } from "../../context/ViewContext"

export default function Page() {
    const { setActive } = useViewContext()
    setActive('Resume')
    redirect('https://docs.google.com/document/d/1Vh0rQwhL9VdwooimxvWiWOwfLQpsSa9KLT_xrYmZ_dU/edit?tab=t.0', )
}