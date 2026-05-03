export async function register() {
  const proxyUrl = process.env.TAILSCALE_PROXY_URL
  if (proxyUrl) {
    const { ProxyAgent, setGlobalDispatcher } = await import("undici")
    setGlobalDispatcher(new ProxyAgent(proxyUrl))
  }
}
