"use client"

import Eyes from "./Eyes"
import { useTheme } from "../context/ThemeContext"
import Image from "next/image"
import Link from "next/link"

export default function SideBar() {
  const { toggleTheme } = useTheme()

  return ( // side bar vertical container: headshot, name, links, dark mode
  <div className="w-full md:w-fit shrink-0 h-fit flex flex-col items-center justify-center text-center gap-6 md:gap-10 border-2 border-white rounded-3xl bg-[var(--bubble-bg)] p-6 md:p-8">
    {/* mobile wrapper: inherit properties */}
    <div className="items-center justify-center flex md:flex-col gap-6 md:gap-10">
      <Link href="/">
          <Image src="./headshot0.jpg" alt="headshot" width={150} height={150} className="rounded-lg w-30 h-30 md:w-50 md:h-50"/>
      </Link>
      <Link href="/" className="w-fit flex flex-col items-center text-xl md:text-5xl font-bold hover:underline">
        <p>Andrew&nbsp;</p>
        <p>Minghan&nbsp;</p>
        <p>Jiang&nbsp;</p>
        <p>.com&nbsp;</p>
      </Link>
    </div>
    <ul className="w-fit list-none text-lg md:text-2xl flex md:flex-col items-center gap-3 md:gap-5">
      <Link href="https://github.com/minghanminghan/" target="_blank" className="w-fit h-fit hover:underline">
        github
      </Link>
      <Link href="https://substack.com/@valensdeludo684036" target="_blank" className="w-fit h-fit hover:underline">
        blog
      </Link>
      <Link href="https://www.linkedin.com/in/andrewminghanjiang/" target="_blank" className="w-fit h-fit hover:underline">
        linkedIn
      </Link>
      <Link href="mailto:amj7925@nyu.edu" target="_blank" className="w-fit h-fit hover:underline">
        email
      </Link>
      <Link href="https://docs.google.com/document/d/1Vh0rQwhL9VdwooimxvWiWOwfLQpsSa9KLT_xrYmZ_dU" target="_blank" className="w-fit h-fit hover:underline">
        resume
      </Link>
    </ul>
    {/* eyes - fixed bottom-left on mobile, inline on desktop */}
    <div onClick={toggleTheme} className="fixed bottom-6 left-10 cursor-pointer w-12 h-12 md:static md:w-25 md:h-25">
      <Eyes/>
    </div>
  </div>
  )
}