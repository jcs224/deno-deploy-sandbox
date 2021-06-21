export async function parseFormParams(ctx) {
  const value = await ctx.request.body().value
  const params = new Map

  value.forEach((value, key) => {
    params.set(key, value)
  })

  return params
}