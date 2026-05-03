export async function register() {
  const proxyUrl = process.env.TAILSCALE_PROXY_URL
  if (proxyUrl) {
    const { ProxyAgent, setGlobalDispatcher } = await import("undici")
    setGlobalDispatcher(new ProxyAgent(proxyUrl))
    console.log(`[instrumentation] Tailscale proxy active: ${proxyUrl}`)
  } else {
    console.warn("[instrumentation] TAILSCALE_PROXY_URL not set — outbound requests use direct routing")
  }
}
