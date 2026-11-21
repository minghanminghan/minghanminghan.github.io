// Add a project: one entry here, plus an optional media file in public/projects/.
export type Media = { kind: "image" | "video"; src: string }
export type Project = { name: string; desc?: string; href: string; media?: Media }

export const projects: Project[] = [
  { name: "jev-demo", href: "/jev-demo" },
  { name: "ascii-art", href: "/ascii-art.html" },
]
