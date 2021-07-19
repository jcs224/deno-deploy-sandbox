export async function parseFormParams(ctx) {
  const params = new Map

  if (ctx.request.hasBody) {

    const requestBody = ctx.request.body()

    switch(requestBody.type) {
      case 'json':
        const jsonPayload = await requestBody.value

        for (const prop in jsonPayload) {
          params.set(prop, jsonPayload[prop])
        }
        break;
      case 'form':
        const formPayload = await requestBody.value
        formPayload.forEach((value, key) => {
          params.set(key, value)
        })
        break;
      case 'form-data':
        const formDataPayload = requestBody.value
        const formData = await formDataPayload.read()
        const fields = formData.fields

        for (const prop in fields) {
          params.set(prop, fields[prop])
        }
    }
  }

  return params
}

export async function parseManifest() {
  const mediaPath = Deno.env.get('PUBLIC_ASSET_PATH')
  const manifest = JSON.parse(await (await fetch(mediaPath + '/manifest.json')).text())

  const manifestEntries = []

  for (const [key, value] of Object.entries(manifest)) {
    manifestEntries.push(value.file)
  }

  manifestEntries.push(manifest['frontend/app.js']['css'][0])

  return [manifest, manifestEntries]
}