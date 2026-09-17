import Link from "next/link"

// Stable production alias for the jev demo on Vercel. Public URL, not a secret,
// so it lives here rather than in an env var the gh-pages build cannot read.
const JEV_DEMO_URL = "https://jev-demo.vercel.app"

export const metadata = {
  title: "jev demo",
  description: "A customer-service chatbot routed by jev.",
}

export default function JevDemo() {
  return (
  <div className="px-8 md:px-16 pt-6 w-full md:flex-1 flex flex-col items-center text-center justify-center text-lg md:text-2xl">
    <div className="w-fit max-w-full flex flex-col gap-4 md:gap-8 border-2 border-white rounded-3xl bg-[var(--bubble-bg)] px-8 py-6 md:px-12 md:py-10">
      <p className="font-bold">jev demo</p>
      <p>A customer-service chatbot routed by jev.</p>
      <p>One API call per turn: every level of the tree is asked up front,</p>
      <p>and the answers it did not need get thrown away.</p>
      <Link href={JEV_DEMO_URL} target="_blank" className="w-fit self-center hover:underline">
        [&nbsp;open the demo&nbsp;]
      </Link>
      <Link href="/" className="w-fit self-center text-base md:text-xl hover:underline">
        [&nbsp;back&nbsp;]
      </Link>
    </div>
  </div>
  )
}
