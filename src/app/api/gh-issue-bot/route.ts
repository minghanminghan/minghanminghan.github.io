export type RequestBody = {
  api_key: string
  api_endpoint: string
  issue_url: string
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json()

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const send = (message: string) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ message })}\n\n`))

      // TODO: replace with actual call to body.api_endpoint using body.api_key and body.issue_url
      send(`[SERVER] Connecting to ${body.api_endpoint}...`)
      send("[SERVER] Fetching issue details...")
      send("[SERVER] Unimplemented — TODO")

      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
