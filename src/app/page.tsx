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
  {
    name: 'slm',
    desc: 
      <div className="flex flex-col gap-4">
        <p>small language model that implements GQA</p>
        <span>
          <u><Link href='/slm'>try it out!</Link></u>
          &emsp; <u><Link target='_blank' href='https://github.com/minghanminghan/slm'>code</Link></u>
        </span>
        {/* <video className="w-300 h-150 outline">
          <source src="slm-demo.mp4" type="video/mp4"/>
          video demo placeholder
        </video> */}
      </div>
  },
  {
    name: 'mobile terminal',
    desc:
      <div className="flex flex-col gap-4">
        <p>SSH into any terminal from any browser (recommended to use tailscale & tmux for optimal vibe coding)</p>
        <u><Link target='_blank' href='https://github.com/minghanminghan/mobile-terminal'>code</Link></u>
        {/* <video className="w-300 h-150 outline">
          <source src="mobile-terminal-demo.mp4" type="video/mp4"/>
          video demo placeholder
        </video> */}
      </div>
  },
  {
    name: 'github issue bot',
    desc: 
      <div className="flex flex-col gap-4">
        <p>End-to-end issue to PR bot that automatically & autonomously turns Github issues into PRs,</p>
        <p>allowing users to interface with code entirely from the Github app without touching their IDE.</p>
        <ul className="list-disc list-inside flex flex-col gap-4">
          <li>Uses mini-swe-agent harness for coding</li>
          <li>Auto-retries on GH Actions failures and PR comments</li>
        </ul>
        <span>
          <u><Link href='/gh-issue-bot'>try it out!</Link></u>
          &emsp; <u><Link target='_blank' href='https://github.com/minghanminghan/gh-issue-to-pr'>code</Link></u>
        </span>
      </div>
  },
  {
    name: 'chess bot',
    desc:
      <div className="flex flex-col gap-4">
        <p>Deep learning chess bot</p>
        <span>
          <u><Link href='/chess-bot'>try it out!</Link></u>
          &emsp; <u><Link target='_blank' href='https://github.com/minghanminghan/chess-bot'>code</Link></u>
        </span>
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
    </div>

    {/* desc & demo container */}
    <div className="px-8 md:px-16 pt-4 w-full h-100 md:flex-1 flex flex-col items-center text-center justify-center">
      <div className="w-fit max-w-full border-2 border-white rounded-3xl bg-[var(--bubble-bg)] px-8 py-6 md:px-12 md:py-10">
        { slides[active].desc }
      </div>
    </div>

    {/* next button */}
    <div className="fixed bottom-6 right-10">
      <button
        onClick={() => setActive((active + 1) % slides.length)}
        className="cursor-pointer w-12 h-12 md:w-15 md:h-15 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          className="w-6 h-6">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>
    </div>
  </div>
  )
}