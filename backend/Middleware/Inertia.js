export function inertiaRender(ctx, next, component, payload) {
  const inertiaObject = {
    component,
    props: payload,
    url: ctx.request.url.pathname,
    version: 'EwKHZIw0jAJtZu4ErKGp'
  }

  if (ctx.request.headers.has('X-Inertia')) {
    ctx.response.headers.set('Content-Type', 'application/json')
    ctx.response.headers.set('Vary', 'Accept')
    ctx.response.headers.set('X-Inertia', true)
    ctx.response.body = JSON.stringify(inertiaObject)
  } else {
    ctx.response.headers.set('Content-Type', 'text/html; charset=utf-8')
    ctx.response.body = /*html*/`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Deno Deploy | CouchDB | Webdis | InertiaJS</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
      <script type="module" src="http://localhost:3000/@vite/client"></script>
      <script type="module" src="http://localhost:3000/frontend/app.js"></script>  
    </head>
    <body>
      <div id="app" data-page='${JSON.stringify(inertiaObject)}'></div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
    </body>
    </html>`
  }
}