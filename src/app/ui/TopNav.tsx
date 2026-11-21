'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { name: "readme", href: "/" },
  { name: "projects", href: "/projects" },
]

export default function TopNav() {
  const pathname = usePathname()

  return (
    <nav className="w-fit h-fit flex flex-row flex-wrap gap-x-6 gap-y-2 border-2 border-white rounded-2xl bg-[var(--bubble-bg)] px-6 py-3">
      {tabs.map(tab => {
        const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href)
        return (
          <Link key={tab.href} href={tab.href} className="flex [&:hover_p]:underline">
            [&nbsp;<p className={`text-nowrap flex${active ? " underline" : ""}`}>{tab.name}</p>&nbsp;]
          </Link>
        )
      })}
    </nav>
  )
}
