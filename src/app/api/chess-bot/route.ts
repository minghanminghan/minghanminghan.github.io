import { NextRequest, NextResponse } from 'next/server'

export type RequestBody = {
	fen: string
	move: string
	depth: number
	knodes: number
	time_ms: number
	check_legal_move: boolean
}

export async function POST(req: NextRequest) {
	const body: RequestBody = await req.json()

	const serviceUrl = process.env.CHESS_BOT_SERVICE_URL
	if (!serviceUrl) {
		return NextResponse.json({ error: 'CHESS_BOT_SERVICE_URL not configured' }, { status: 500 })
	}

	const response = await fetch(`${serviceUrl}/api/v1/predict`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	})

	const data = await response.json()
	return NextResponse.json(data, { status: response.status })
}
