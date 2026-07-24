'use client'

import { useEffect, useRef } from "react"
import { useAnimationFrame } from "motion/react"

const CELL_W = 11
const CELL_H = 20
const TICK_SPEED = 10 // ticks/sec — how often clusters get a chance to re-randomize
const TICK_INTERVAL = 1000 / TICK_SPEED
const CURSOR_RADIUS = 120 // px — only clusters within this distance of the cursor re-randomize
const REVERT_MIN = 2000 // ms — shortest time a triggered cluster stays randomized
const REVERT_MAX = 6000 // ms — longest time a triggered cluster stays randomized
const ROAM_FREQ_X = 0.45 // rad/s — x frequency of the autonomous roaming point used on devices with no real cursor
const ROAM_FREQ_Y = 0.33 // rad/s — y frequency; ratio to ROAM_FREQ_X isn't a small fraction, so the path avoids repeating quickly
const INITIAL_TEXT = "Hi, nice to meet you. I'm Andrew, and I hope you enjoy my website! " // seed text wrapped through clusters before any hovering happens
const WORDS = [
  // { text: "hi!", weight: 1 },
  { text: ".", weight: 12 },
]
const WORDS_TOTAL_WEIGHT = WORDS.reduce((sum, w) => sum + w.weight, 0)
const CLUSTER_COLS = Math.max(...WORDS.map(w => w.text.length)) + 1 // cells per cluster, +1 gap between clusters

function pickWord(): string {
  let r = Math.random() * WORDS_TOTAL_WEIGHT
  for (const w of WORDS) {
    r -= w.weight
    if (r < 0) return w.text
  }
  return WORDS[WORDS.length - 1].text
}

// Grid is divided into clusters (one per row-segment, CLUSTER_COLS wide).
// Each cluster holds its base text: a slice of INITIAL_TEXT wrapped
// cyclically through cluster order, so the page reads as that string at
// rest. A cluster that's idle (revertTimer 0) and enters CURSOR_RADIUS
// gets triggered: it switches to a random word from WORDS and starts a
// random 1-5s countdown. While counting down it ignores the cursor
// entirely; when the countdown hits 0 it reverts to its base text and
// goes idle again, ready to be triggered next time the cursor passes over.
function initialClusterText(clusterIndex: number): string {
  let s = ''
  for (let k = 0; k < CLUSTER_COLS; k++) {
    s += INITIAL_TEXT[(clusterIndex * CLUSTER_COLS + k) % INITIAL_TEXT.length]
  }
  return s
}
// text-[10px] monospace glyphs aren't reliably 11px wide across browsers/OS
// font stacks, so measure the real advance width instead of assuming CELL_W.
function measureCellWidth(el: HTMLElement): number {
  const probe = document.createElement('span')
  const cs = getComputedStyle(el)
  probe.style.font = cs.font
  probe.style.position = 'absolute'
  probe.style.visibility = 'hidden'
  probe.style.whiteSpace = 'pre'
  probe.textContent = '0'.repeat(100)
  document.body.appendChild(probe)
  const width = probe.getBoundingClientRect().width / 100
  document.body.removeChild(probe)
  return width || CELL_W
}

export default function TextBackground() {
  const preRef = useRef<HTMLPreElement>(null)
  const dims = useRef({ cols: 0, rows: 0, cellW: CELL_W, clusterCols: 0 })
  const base = useRef<string[]>([]) // each cluster's resting text, restored when its timer expires
  const grid = useRef<string[]>([]) // each cluster's currently displayed text
  const revertTimer = useRef<number[]>([]) // ms remaining before a triggered cluster reverts; 0 = idle
  const wasHover = useRef<boolean[]>([]) // was the cursor in radius last tick — trigger only on the entering edge
  const sinceTick = useRef(0)
  const mouse = useRef<{ x: number; y: number } | null>(null)
  const hasHoverCursor = useRef(true) // false on touch devices — drives a roaming virtual point instead of the real cursor

  useEffect(() => {
    function resize() {
      const cellW = preRef.current ? measureCellWidth(preRef.current) : CELL_W
      const cols = Math.ceil(window.innerWidth / cellW) + 2
      const rows = Math.ceil(window.innerHeight / CELL_H) + 2
      const clusterCols = Math.ceil(cols / CLUSTER_COLS)
      dims.current = { cols, rows, cellW, clusterCols }
      base.current = Array.from({ length: clusterCols * rows }, (_, idx) => initialClusterText(idx))
      grid.current = [...base.current]
      revertTimer.current = new Array(clusterCols * rows).fill(0)
      wasHover.current = new Array(clusterCols * rows).fill(false)
    }
    function onMouseMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    function onMouseLeave() {
      mouse.current = null
    }
    hasHoverCursor.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  useAnimationFrame((t, delta) => {
    const el = preRef.current
    const { cols, rows, cellW, clusterCols } = dims.current
    if (!el || !cols || !rows) return

    sinceTick.current += delta
    if (sinceTick.current < TICK_INTERVAL) return
    const elapsed = sinceTick.current
    sinceTick.current = 0

    const cursor = hasHoverCursor.current
      ? mouse.current
      : {
          x: window.innerWidth / 2 + window.innerWidth * 0.4 * Math.sin((t / 1000) * ROAM_FREQ_X),
          y: window.innerHeight / 2 + window.innerHeight * 0.4 * Math.sin((t / 1000) * ROAM_FREQ_Y + 1.3),
        }
    const radiusSq = CURSOR_RADIUS * CURSOR_RADIUS
    const clusterPxW = CLUSTER_COLS * cellW

    let out = ''
    for (let j = 0; j < rows; j++) {
      let row = ''
      for (let c = 0; c < clusterCols; c++) {
        const idx = j * clusterCols + c

        let inRadius = false
        if (cursor) {
          const clusterX = c * clusterPxW + clusterPxW / 2
          const clusterY = j * CELL_H + CELL_H / 2
          const dx = clusterX - cursor.x
          const dy = clusterY - cursor.y
          inRadius = dx * dx + dy * dy <= radiusSq
        }

        if (revertTimer.current[idx] > 0) {
          revertTimer.current[idx] -= elapsed
          if (revertTimer.current[idx] <= 0) {
            revertTimer.current[idx] = 0
            grid.current[idx] = base.current[idx]
          }
        } else if (inRadius && !wasHover.current[idx]) {
          // only trigger on the entering edge — otherwise a cluster that
          // just reverted while the cursor is still overhead would
          // immediately retrigger next tick and flicker
          const word = pickWord()
          grid.current[idx] = word.padEnd(CLUSTER_COLS, ' ')
          revertTimer.current[idx] = REVERT_MIN + Math.random() * (REVERT_MAX - REVERT_MIN)
        }
        wasHover.current[idx] = inRadius

        row += grid.current[idx]
      }
      out += row.slice(0, cols) + '\n'
    }
    el.textContent = out
  })

  return (
    <pre
      ref={preRef}
      aria-hidden
      className="fixed inset-0 -z-10 m-0 overflow-hidden select-none pointer-events-none whitespace-pre font-mono text-[10px] leading-[20px] opacity-25"
      style={{ color: 'var(--foreground)' }}
    />
  )
}
