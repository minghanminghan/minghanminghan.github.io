import type { Project } from "./projects"

const PATTERN_CHARS = 4000 // enough 10px mono chars to fill the widest 16:10 slot

// Media slot keeps a 16:10 box with or without media, so the grid stays even.
function MediaSlot({ project }: { project: Project }) {
  const { name, media } = project
  if (media?.kind === "image") {
    // eslint-disable-next-line @next/next/no-img-element -- static file, images are unoptimized site-wide
    return <img src={media.src} alt={name} className="absolute inset-0 w-full h-full object-cover"/>
  }
  if (media?.kind === "video") {
    return <video src={media.src} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"/>
  }
  return ( // no media: repeated name in small mono, like TextBackground
    <div className="absolute inset-0 overflow-hidden">
      <p aria-hidden className="absolute inset-0 m-0 font-mono text-[10px] leading-[20px] opacity-25 break-all select-none">
        {(name + " ").repeat(Math.ceil(PATTERN_CHARS / (name.length + 1)))}
      </p>
    </div>
  )
}

export default function ProjectCard({ project }: { project: Project }) {
  const external = !project.href.startsWith("/")
  return ( // plain <a>: /jev-demo is a rewrite and /ascii-art.html is a static file, not Next routes
    <a
      href={project.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex flex-col border-2 border-white rounded-3xl bg-[var(--bubble-bg)] overflow-hidden"
    >
      <div className="relative aspect-[16/10] border-b-2 border-white">
        <MediaSlot project={project}/>
      </div>
      <div className="p-4 text-left">
        <p className="font-bold truncate group-hover:underline">{project.name}</p>
        {project.desc && <p className="text-base md:text-lg">{project.desc}</p>}
      </div>
    </a>
  )
}
