'use client'

import Link from "next/link"
import { useState } from "react"


type Slide = {
  name: String,
  desc: any,  // ui component
}
const slides: Slide[] = [
  {
    name: 'readme',
    desc:
      <div className="flex flex-col gap-4 md:gap-10">
        <p>Hi! I&apos;m Andrew</p>
        <p>NYU '26 BA in Computer Science, Math, Psychology</p>
        <p>Currently: Software Engineer @ Disney</p>
        <p>Feel free to reach out!</p>
      </div>
  },
]


export default function Slideshow() {
  const [active, setActive] = useState(0)

  return ( // vertical slideshow container: index on top, content below
  <div className="w-full gap-6 md:gap-10 pt-6 text-lg md:text-2xl flex flex-col items-center">
    {/* slideshow index */}
    <div className="w-fit h-fit flex flex-row flex-wrap gap-x-6 gap-y-2 border-2 border-white rounded-2xl bg-[var(--bubble-bg)] px-6 py-3">
      {slides.map((v, i) => ( // ordered list
        <span key={i} className={"flex cursor-pointer [&:hover_p]:underline"} onClick={() => setActive(i)}>
          [&nbsp;<p className={`text-nowrap flex${i === active ? ' underline' : ''}`}>{v.name}</p>&nbsp;]
        </span>
      ))}
      <Link href="/jev-demo" className="flex [&:hover_p]:underline">
        [&nbsp;<p className="text-nowrap flex">jev-demo</p>&nbsp;]
      </Link>
    </div>

    {/* desc & demo container */}
    <div className="px-8 md:px-16 pt-4 w-full h-100 md:flex-1 flex flex-col items-center text-center justify-center">
      <div className="w-fit max-w-full border-2 border-white rounded-3xl bg-[var(--bubble-bg)] px-8 py-6 md:px-12 md:py-10">
        { slides[active].desc }
      </div>
    </div>
  </div>
  )
}