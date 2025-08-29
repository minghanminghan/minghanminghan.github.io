'use client'

import { redirect } from "next/navigation"
import { useViewContext } from "../../context/ViewContext"

export default function Page() {
    const { setActive } = useViewContext()
    setActive('Resume')
    redirect('/Andrew_Jiang_Resume.pdf')
}