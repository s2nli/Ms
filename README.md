# MissionJeet mini-app
Run: `node server.js` -> http://localhost:3000/study/missionjeet

- data/serverInfo.json -> /api/auth/serverInfo (filled from the page's own embedded data)
- data/api/<path>.json -> any other /api/<path> (put scraper JSON here)
- Missing from the snapshot: webpack-*.js, polyfills-*.js, fonts (/_next/static/media/*.woff2).
  Add them to public/_next/static/chunks/ and public/_next/static/media/ for full interactivity.
