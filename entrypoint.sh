#!/bin/sh
set -e

tailscaled --tun=userspace-networking --statedir=/tmp/tailscale --outbound-http-proxy-listen=localhost:3128 &

sleep 2

export TAILSCALE_PROXY_URL=http://localhost:3128

tailscale up \
  --authkey="${TS_AUTHKEY}" \
  --hostname="${TS_HOSTNAME:-minghan-app}" \
  --accept-routes

exec npm start
