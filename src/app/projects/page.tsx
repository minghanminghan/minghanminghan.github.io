import type { Metadata } from "next"
import ProjectCard from "./ProjectCard"
import { projects } from "./projects"

export const metadata: Metadata = { title: "projects" }

export default function Projects() {
  return (
    <div className="w-full px-8 md:px-16 pb-6 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
      {projects.map(p => <ProjectCard key={p.name} project={p}/>)}
    </div>
  )
}
