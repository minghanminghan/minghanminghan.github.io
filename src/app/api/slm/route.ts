import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const serviceUrl = process.env.SLM_SERVICE_URL
  if (!serviceUrl) {
    return new Response("SLM_SERVICE_URL not configured", { status: 500 })
  }

  const body = await req.json()

  const upstream = await fetch(`${serviceUrl}/api/v1/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "text/event-stream",
      "Cache-Control": "no-cache",
    },
  })
}
