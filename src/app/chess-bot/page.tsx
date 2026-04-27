"use client"

import { useState, useCallback } from "react"
import { Chess, Square } from "chess.js"
import { Chessboard } from "react-chessboard"

const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

function forceMove(fen: string, from: string, to: string): string {
	const chess = new Chess(fen)
	const piece = chess.get(from as Square)
	if (!piece) return fen
	chess.remove(from as Square)
	chess.remove(to as Square)
	chess.put(piece, to as Square)
	return chess.fen()
}

type SquareStyles = Record<string, React.CSSProperties>

export default function Chess_Bot() {
	const [fen, setFen] = useState(STARTING_FEN)
	const [thinking, setThinking] = useState(false)
	const [depth, setDepth] = useState(10)
	const [knodes, setKnodes] = useState(1000)
	const [timeMs, setTimeMs] = useState(3000)
	const [legalMovesOn, setLegalMovesOn] = useState(true)
	const [playerColor, setPlayerColor] = useState<"white" | "black">("white")
	const [moveHistory, setMoveHistory] = useState<string[]>([])
	const [settingsOpen, setSettingsOpen] = useState(true)
	const [historyOpen, setHistoryOpen] = useState(false)
	const [optionSquares, setOptionSquares] = useState<SquareStyles>({})
	const [error, setError] = useState<string | null>(null)

	function onPieceDrop({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null; piece: unknown }) {
		if (thinking || !targetSquare) return false

		const move = sourceSquare + targetSquare
		const prevFen = fen
		const newFen = forceMove(fen, sourceSquare, targetSquare)

		setFen(newFen)
		setThinking(true)
		setError(null)
		setOptionSquares({})

		fetch("/api/chess-bot", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				fen: prevFen,
				move,
				depth,
				knodes,
				time_ms: timeMs,
				check_legal_move: legalMovesOn,
			}),
		})
			.then(res => res.json())
			.then(data => {
				if (data.error || !data.move) {
					setFen(prevFen)
					setError(data.error ?? "Invalid move or no response from engine.")
				} else {
					setMoveHistory(prev => [...prev, move, data.move])
					if (data.fen) {
						setFen(data.fen)
					} else {
						const botFrom = data.move.slice(0, 2)
						const botTo = data.move.slice(2, 4)
						setFen(forceMove(newFen, botFrom, botTo))
					}
				}
			})
			.catch(() => {
				setFen(prevFen)
				setError("Network error reaching chess engine.")
			})
			.finally(() => setThinking(false))

		return true
	}

	const onMouseOverSquare = useCallback(({ square }: { square: string }) => {
		if (!legalMovesOn) return
		const chess = new Chess(fen)
		const moves = chess.moves({ square: square as Square, verbose: true })
		if (moves.length === 0) return

		const highlights: SquareStyles = {
			[square]: { backgroundColor: "rgba(255,255,0,0.4)" },
		}
		for (const m of moves) {
			highlights[m.to] = {
				background: "radial-gradient(circle, rgba(0,0,0,0.18) 28%, transparent 28%)",
				borderRadius: "50%",
			}
		}
		setOptionSquares(highlights)
	}, [fen, legalMovesOn])

	function reset() {
		setFen(STARTING_FEN)
		setMoveHistory([])
		setError(null)
		setOptionSquares({})
	}

	const pairedMoves = moveHistory.reduce<[string, string?][]>((acc, m, i) => {
		if (i % 2 === 0) acc.push([m])
		else acc[acc.length - 1].push(m)
		return acc
	}, [])

	return (
		<div className="mx-[5vw] mt-[5vh] flex flex-col gap-4">
			{/* title */}
			<h1 className="text-2xl font-bold text-center">Chess Bot</h1>

			{/* main layout: board left, panel right */}
			<div className="flex gap-6 items-start">
				{/* board */}
				<div className="flex-1 min-w-0 max-w-1/2">
					<Chessboard options={{
						position: fen,
						onPieceDrop,
						onMouseOverSquare,
						onMouseOutSquare: () => setOptionSquares({}),
						squareStyles: optionSquares,
						boardOrientation: playerColor,
						allowDragging: !thinking,
					}} />
				</div>

				{/* right panel */}
				<div className="w-72 flex flex-col gap-4 shrink-0">
					{/* loading/error message */}
					<div className="h-6 mb-1 text-center text-sm text-gray-500">
						{thinking ? "Bot thinking..." : error ? <span className="text-red-500">{error}</span> : null}
					</div>

					{/* settings */}
					<div className="border rounded">
						<button
							className="w-full flex justify-between items-center px-4 py-2 font-semibold cursor-pointer"
							onClick={() => setSettingsOpen(o => !o)}
						>
							<span>Settings</span>
							<span>{settingsOpen ? "▲" : "▼"}</span>
						</button>
						{settingsOpen && (
							<div className="px-4 pb-4 flex flex-col gap-3">
								<div className="flex flex-col gap-2">
									<label className="flex flex-col text-sm gap-1">
										Depth
										<input
											type="number" min={1} max={30} value={depth}
											onChange={e => setDepth(+e.target.value)}
											className="border rounded px-2 py-1 w-full"
										/>
									</label>
									<label className="flex flex-col text-sm gap-1">
										Knodes
										<input
											type="number" min={1} value={knodes}
											onChange={e => setKnodes(+e.target.value)}
											className="border rounded px-2 py-1 w-full"
										/>
									</label>
									<label className="flex flex-col text-sm gap-1">
										Time (ms)
										<input
											type="number" min={100} step={100} value={timeMs}
											onChange={e => setTimeMs(+e.target.value)}
											className="border rounded px-2 py-1 w-full"
										/>
									</label>
								</div>
								<div className="flex gap-2 flex-wrap">
									<button
										onClick={() => setLegalMovesOn(v => !v)}
										className={`px-3 py-1 rounded text-sm border cursor-pointer ${legalMovesOn
											? "bg-blue-500 text-white border-blue-500"
											: "bg-white text-gray-700 border-gray-300"
											}`}
									>
										Legal moves {legalMovesOn ? "ON" : "OFF"}
									</button>
									<button
										onClick={() => setPlayerColor(c => c === "white" ? "black" : "white")}
										className="px-3 py-1 rounded text-sm border bg-white text-gray-700 border-gray-300 cursor-pointer"
									>
										Flip board
									</button>
									<button
										onClick={reset}
										className="px-3 py-1 rounded text-sm border bg-white text-gray-700 border-gray-300 cursor-pointer"
									>
										Reset
									</button>
								</div>
							</div>
						)}
					</div>

					{/* move history */}
					<div className="border rounded">
						<button
							className="w-full flex justify-between items-center px-4 py-2 font-semibold cursor-pointer"
							onClick={() => setHistoryOpen(o => !o)}
						>
							<span>Move History</span>
							<span>{historyOpen ? "▲" : "▼"}</span>
						</button>
						{historyOpen && (
							<div className="px-4 pb-4 font-mono text-sm">
								{pairedMoves.length === 0
									? <p className="text-gray-400">No moves yet.</p>
									: (
										<ol className="list-decimal list-inside">
											{pairedMoves.map(([white, black], i) => (
												<li key={i}>{white}{black ? ` ${black}` : ""}</li>
											))}
										</ol>
									)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
