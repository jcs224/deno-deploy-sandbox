import { Application, Router } from 'https://deno.land/x/oak@v7.6.2/mod.ts'
import { Session, WebdisStore } from 'https://deno.land/x/oak_sessions@v1.5.6/mod.ts'
// import { OakSession, WebdisStore } from '../../session-2/mod.ts'
import CouchService from './Services/CouchService.js'
import { 
  registerView, 
  register,
  loginView,
  login
} from './Controllers/AuthController.js'
import State from './State.js'
import { Inertia } from 'https://deno.land/x/oak_inertia@v0.1.0/mod.ts'
import mime from 'https://cdn.skypack.dev/mime-types';

const app = new Application()

// Production manifest
let manifest = null

if (Deno.env.get('ENVIRONMENT') == 'production') {
  const mediaPath = Deno.env.get('PUBLIC_ASSET_PATH')
  manifest = JSON.parse(await (await fetch(mediaPath + '/manifest.json')).text())

  const manifestEntries = []

  for (const [key, value] of Object.entries(manifest)) {
    manifestEntries.push(value.file)
  }

  app.use(async (ctx, next) => {

    if (manifestEntries.includes(ctx.request.url.pathname.substr(1))) {
      ctx.response.body = await (await fetch(mediaPath + ctx.request.url.pathname)).text()
      ctx.response.headers.set('Content-Type', mime.lookup(ctx.request.url.pathname))
    }

    await next()
  })
}

// End production manifest

const store = new WebdisStore({
  url: Deno.env.get('WEBDIS_URL')
})
new Session(app, store)
new Inertia(app, /*html*/`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deno Deploy | CouchDB | Webdis | InertiaJS</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
  ${Deno.env.get('ENVIRONMENT') == 'production' ? /*html*/`
  <script type="module" src="/${ manifest['frontend/app.js']['file'] }"></script>
  ` : /*html*/`
  <script type="module" src="http://localhost:3000/@vite/client"></script>
  <script type="module" src="http://localhost:3000/frontend/app.js"></script>
  `}
</head>
<body>
  @inertia
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
</body>
</html>`)
State.couch = new CouchService(Deno.env.get('COUCH_URL'))

const router = new Router()

router.get('/register', registerView)
  .post('/register', register)
  .get('/login', loginView)
  .post('/login', login)
  .get('/dashboard', async (ctx) => {
    if (await ctx.state.session.has('user_id')) {
      ctx.response.body = 'found the dashboard!'
    } else {
      ctx.response.redirect('/login')
    }
  }).get('/', (ctx) => {
    ctx.response.body = 'hey there, go to /register'
  }).get('/inertia/1', (ctx) => {
    ctx.state.inertia.render('PageOne', {
      hello: 'world'
    })
  }).get('/inertia/2', (ctx) => {
    ctx.state.inertia.render('PageTwo', {
      hey: 'there'
    })
  })

app.use(router.routes())
app.use(router.allowedMethods())

// Deno Deploy
addEventListener('fetch', app.fetchEventHandler())

// Regular Deno
// await app.listen({ port: 8080 })