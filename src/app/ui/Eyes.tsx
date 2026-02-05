'use client'

import { useRef, useEffect } from "react"
import { useTheme } from "../context/ThemeContext"

export default function Eyes() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { theme } = useTheme()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const size = 200
        canvas.width = size
        canvas.height = size

        const eyeRadius = 30
        const pupilRadius = 12
        const leftEye = { x: size * 0.33, y: size * 0.5 }
        const rightEye = { x: size * 0.67, y: size * 0.5 }

        const draw = (mouseX: number, mouseY: number) => {
        ctx.fillStyle = theme === 'light' ? 'black' : 'white'
        ctx.fillRect(0, 0, size, size)

        const rect = canvas.getBoundingClientRect()
        // const canvasCenterX = rect.left + size / 2
        // const canvasCenterY = rect.top + size / 2

        const drawEye = (eyeX: number, eyeY: number) => {
            ctx.beginPath()
            ctx.arc(eyeX, eyeY, eyeRadius, 0, Math.PI * 2)
            ctx.fillStyle = theme === 'light' ? 'white' : 'black'
            ctx.fill()

            const dx = mouseX - (rect.left + eyeX)
            const dy = mouseY - (rect.top + eyeY)
            const angle = Math.atan2(dy, dx)
            const dist = Math.min(eyeRadius - pupilRadius, Math.hypot(dx, dy) / 10)
            const pupilX = eyeX + Math.cos(angle) * dist
            const pupilY = eyeY + Math.sin(angle) * dist

            ctx.beginPath()
            ctx.arc(pupilX, pupilY, pupilRadius, 0, Math.PI * 2)
            ctx.fillStyle = theme === 'light' ? 'black' : 'white'
            ctx.fill()
        }

        drawEye(leftEye.x, leftEye.y)
        drawEye(rightEye.x, rightEye.y)
        }

        draw(window.innerWidth / 2, window.innerHeight / 2)

        const handleMouseMove = (e: MouseEvent) => {
        draw(e.clientX, e.clientY)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [theme])

    return <canvas ref={canvasRef} className="h-25 w-25" />
}