export default function Home() {
  return ( // readme box, centered in the content column
  <div className="px-8 md:px-16 pt-4 w-full h-100 md:flex-1 flex flex-col items-center text-center justify-center">
    <div className="w-fit max-w-full border-2 border-white rounded-3xl bg-[var(--bubble-bg)] px-8 py-6 md:px-12 md:py-10">
      <div className="flex flex-col gap-4 md:gap-10">
        <p>Hi! I&apos;m Andrew</p>
        <p>NYU &apos;26 BA in Computer Science, Math, Psychology</p>
        <p>Currently: Software Engineer @ Disney</p>
        <p>Feel free to reach out!</p>
      </div>
    </div>
  </div>
  )
}
