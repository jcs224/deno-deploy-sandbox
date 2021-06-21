export default class {
  constructor(url) {
    this.url = url
  }

  async call(endpoint, meta = {
    method: 'GET'
  }, payload = {}) {
    const newMeta = {
      method: meta.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...meta.headers,
      },
      body: meta.method !== 'GET' ? JSON.stringify(payload) : null
    }

    let response = null

    try {
      response = await fetch(`${this.url}/${endpoint}`, newMeta)
    } catch(err) {
      throw new Error(err)
    }

    const responseJSON = await response.json()

    if (response.status >= 200 && response.status <= 299) {
      return responseJSON
    } else {
      throw new Error(JSON.stringify(responseJSON))
    }
  }
}