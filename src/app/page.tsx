'use client'

import Eyes from "./ui/Eyes"
import { useTheme } from "./context/ThemeContext"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"


export default function Home() {

  
  return ( // top level horizontal div
  <div className={`mt-6 md:mt-6 gap-10 md:gap-25 flex flex-col md:flex-row px-2 md:px-20 pt-10}`}>
    <SideBar/>
    <Slideshow/>
  </div>
  )
}


function SideBar() {
  const { toggleTheme } = useTheme()

  return ( // side bar vertical container: headshot, name, links, dark mode
  <div className={`w-auto h-full flex flex-col gap-6 md:gap-10`}>
    <Image src="./headshot0.jpg" alt="headshot" width={150} height={150} className="rounded-lg w-48 h-48 md:w-50 md:h-50"/>
    <Link href="/" className="w-fit text-3xl md:text-5xl font-bold hover:underline">
      Andrew<br/>
      Minghan<br/>
      Jiang<br/>
      .com
      <br/>
    </Link>
    <ul className="w-fit list-none text-lg md:text-2xl flex flex-col gap-3 md:gap-5">
      <Link href="https://github.com/minghanminghan/" target="_blank" className="hover:underline">
        github
      </Link>
      <Link href="https://www.linkedin.com/in/andrewminghanjiang/" target="_blank" className="hover:underline">
        linkedIn
      </Link>
      <Link href="https://substack.com/@valensdeludo684036" target="_blank" className="hover:underline">
        blog
      </Link>
      <Link href="mailto:amj7925@nyu.edu" target="_blank" className="hover:underline">
        email
      </Link>
      <Link href="https://docs.google.com/document/d/1Vh0rQwhL9VdwooimxvWiWOwfLQpsSa9KLT_xrYmZ_dU" target="_blank" className="hover:underline">
        resume
      </Link>
    </ul>
    {/* eyes */}
    <div onClick={toggleTheme} className={`w-fit cursor-pointer`}>
      <Eyes/>
    </div>
  </div>
  )
}

type Slide = {
  name: String,
  desc: any,  // may be ui component
}
const slides: Slide[] = [
  {
    name: 'readme',
    desc: 
      <div className="w-full h-full flex flex-col md:flex-col gap-10 md:gap-10 text-center justify-center">
        <p>Hi! I&apos;m Andrew.</p>
        <p>NYU '26 with BAs in Computer Science, Math, and Psychology.</p>
        <p>Currently a Software Engineer @ Disney.</p>
        <p>Feel free to reach out!</p>
      </div>
  },
  {
    name: 'slm',
    desc: 
      <div className="flex flex-col md:flex-col gap-4">
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
      <div className="flex flex-col md:flex-col gap-4">
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
      <div className="flex flex-col md:flex-col gap-4">
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
      <div className="flex flex-col md:flex-col gap-4">
        <p>Deep learning chess bot</p>
        <span>
          <u><Link href='/chess-bot'>try it out!</Link></u>
          &emsp; <u><Link target='_blank' href='https://github.com/minghanminghan/chess-bot'>code</Link></u>
        </span>
      </div>
  },
]


function Slideshow() {
  const [active, setActive] = useState(0)

  return ( // vertical slideshow container: index on top, content below
  <div className={`w-full h-auto gap-6 md:gap-10 pt-6 text-lg md:text-2xl flex flex-col`}>
    {/* slideshow index */}
    <div className={`w-full h-auto flex flex-row flex-wrap justify-between`}>
      {slides.map((v, i) => ( // ordered list
        <span key={i} className='flex flex-row' onClick={() => setActive(i)}>
          <p className={`text-nowrap cursor-pointer hover:underline${i === active ? ' underline' : ''}`}>[ {v.name} ]</p>
        </span>
      ))}
    </div>

    {/* desc & demo container */}
    <div className="px-16 md:px-16 pt-4 w-full h-full">
      { slides[active].desc }
    </div>

    {/* next button */}
    <div className="fixed bottom-6 right-10">
      <button
        onClick={() => setActive((active + 1) % slides.length)}
        className="cursor-pointer w-15 h-15 rounded-full flex items-center justify-center"
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