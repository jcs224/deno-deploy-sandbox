export async function parseFormParams(ctx) {
  const value = await ctx.request.body().value
  const params = new Map

  value.forEach((value, key) => {
    params.set(key, value)
  })

  return params
}

export async function parseManifest() {
  const mediaPath = Deno.env.get('PUBLIC_ASSET_PATH')
  manifest = JSON.parse(await (await fetch(mediaPath + '/manifest.json')).text())

  const manifestEntries = []

  for (const [key, value] of Object.entries(manifest)) {
    manifestEntries.push(value.file)
  }

  manifestEntries.push(manifest['frontend/app.js']['css'][0])

  return [manifest, manifestEntries]
}