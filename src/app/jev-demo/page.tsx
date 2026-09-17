import Link from "next/link"

import Redirect from "./Redirect"

// Stable production alias for the jev demo on Vercel. Public URL, not a secret,
// so it lives here rather than in an env var the gh-pages build cannot read.
const JEV_DEMO_URL = "https://jev-demo-mu.vercel.app"

export const metadata = {
  title: "jev demo",
  description: "A customer-service chatbot routed by jev.",
}

export default function JevDemo() {
  return (
  <div className="px-8 md:px-16 pt-6 w-full md:flex-1 flex flex-col items-center text-center justify-center text-lg md:text-2xl">
    <Redirect url={JEV_DEMO_URL}/>
    {/* shown only until the redirect lands, or if scripting is off */}
    <div className="w-fit max-w-full flex flex-col gap-4 md:gap-8 border-2 border-white rounded-3xl bg-[var(--bubble-bg)] px-8 py-6 md:px-12 md:py-10">
      <p className="font-bold">jev demo</p>
      <p>Taking you to the demo&hellip;</p>
      <Link href={JEV_DEMO_URL} className="w-fit self-center hover:underline">
        [&nbsp;open the demo&nbsp;]
      </Link>
      <Link href="/" className="w-fit self-center text-base md:text-xl hover:underline">
        [&nbsp;back&nbsp;]
      </Link>
    </div>
  </div>
  )
}
