#!/bin/sh
set -e

tailscaled --tun=userspace-networking --statedir=/tmp/tailscale --outbound-http-proxy-listen=localhost:3128 &

sleep 2

export TAILSCALE_PROXY_URL=http://localhost:3128

tailscale up \
  --authkey="${TS_AUTHKEY}" \
  --hostname="${TS_HOSTNAME:-minghan-app}" \
  --accept-routes

# Force WireGuard handshake with the peer before serving requests.
# Without this, the first fetch hangs while the tunnel is being established.
if [ -n "$SLM_SERVICE_URL" ]; then
  peer_ip=$(echo "$SLM_SERVICE_URL" | sed 's|https\?://||' | cut -d: -f1 | cut -d/ -f1)
  echo "Warming up Tailscale tunnel to $peer_ip..."
  tailscale ping --timeout=30s "$peer_ip" || echo "Warning: warmup ping to $peer_ip failed"
fi

exec npm start
