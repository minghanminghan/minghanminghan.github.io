'use client'

import Eyes from "./ui/Eyes"
import { useTheme } from "./context/ThemeContext"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const { toggleTheme } = useTheme()
  const outline = false
  

  return (
    <div className={`flex flex-row gap-25 px-60 pt-10 ${outline ? "outline-1" : ""}`}>
      <div className={`w-auto h-full flex flex-col gap-10 ${outline ? "outline-1" : ""}`}>
        <Link href="/" className="w-fit text-5xl font-bold hover:underline">
          Andrew<br/>
          Minghan<br/>
          Jiang<br/>
          .com
          <br/>
        </Link>
        <ul className="w-fit list-none text-2xl flex flex-col gap-5">
          <Link href="https://github.com/minghanminghan/" target="_blank" className="hover:underline">
            GitHub
          </Link>
          <Link href="https://www.linkedin.com/in/andrewminghanjiang/" target="_blank" className="hover:underline">
            LinkedIn
          </Link>
          <Link href="mailto:amj7925@nyu.edu" target="_blank" className="hover:underline">
            Email
          </Link>
          <Link href="https://docs.google.com/document/d/1Vh0rQwhL9VdwooimxvWiWOwfLQpsSa9KLT_xrYmZ_dU" target="_blank" className="hover:underline">
            Resume
          </Link>
        </ul>
        <div
          onClick={toggleTheme}
          className={`mt-65 w-fit cursor-pointer text-lg text-center hover:underline ${outline ? "outline-1" : ""}`}
        >
          <Eyes/>
          <p>Click me!</p>
        </div>
      </div>
      <div className={`w-full h-auto text-2xl flex flex-col gap-10 ${outline ? "outline-1" : ""}`}>
        <div className="w-full h-auto flex flex-row gap-25">
          <Image src="./headshot0.jpg" alt="headshot" width={400} height={400} className="rounded-lg"/>
          <div className="justify-center flex flex-col gap-4">
            <p>Hi! I&apos;m Andrew, an NYU senior majoring in
              <ul className="list-disc list-inside ml-5">
                <li>Computer Science</li>
                <li>Math</li>
                <li>Psychology</li>
              </ul>
            </p>
            <p>I&apos;m passionate about
              <ul className="list-disc list-inside ml-5">
                <li>Software Engineering</li>
                <li>Machine Learning</li>
                <li>Data Science</li>
              </ul>
            </p>
            <p>Feel free to reach out!</p>
          </div>
        </div>
        <div className={`mx-10 flex flex-col gap-8 ${outline ? "outline-1" : ""}`}>
          <b>Projects</b>
          <p>
            <Link href="https://github.com/minghanminghan/chess-bot" target="_blank" className="hover:underline">
              [ Deep Neural Net Chess Bot ]
            </Link>
            &nbsp;- inspired by&nbsp;
            <Link href="https://arxiv.org/abs/1712.01815" className="underline" target="_blank">AlphaZero</Link>
            &nbsp;paper, trained using RL with self-play
          </p>
          <p>
            <Link href="https://github.com/minghanminghan/particle-sim" target="_blank" className="hover:underline">
              [ Particle Simulator ]
            </Link>
            &nbsp;- n-body gravitational simulation using Barnes-Hut algorithm
          </p>
          <p>
            <Link href="https://github.com/minghanminghan/HackNYU/tree/v2.1" target="_blank" className="hover:underline">
              [ Hands-On Data Visualization ]
            </Link>
            &nbsp;- hand gesture-driven time series data visualization interface
          </p>
          <p>
            <Link href="/ascii-art.html" className="hover:underline">
              [ ASCII Art ]
            </Link>
            &nbsp;- webcam stream to ASCII art with customizable ASCII ramp
          </p>
          <p>
            <Link href="https://github.com/minghanminghan/minghanminghan.github.io" target="_blank" className="hover:underline">
              [ andrewminghanjiang.com ]
            </Link>
            &nbsp;- built with Next.js, TypeScript, and Tailwind
          </p>
        </div>
      </div>
    </div>
  )
}