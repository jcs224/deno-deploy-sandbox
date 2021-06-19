export function parseFormParams(value) {
  const params = new Map

  value.forEach((value, key) => {
    params.set(key, value)
  })

  return params
}