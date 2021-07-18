import { Application, Router } from 'https://deno.land/x/oak@v7.6.2/mod.ts'
import { Session, WebdisStore } from 'https://deno.land/x/oak_sessions@v1.5.12/mod.ts'
// import { Session, WebdisStore } from '../../session-2/mod.ts'
import CouchService from './Services/CouchService.js'
import AuthController from './Controllers/AuthController.js'
import State from './State.js'
// import { Inertia } from '../../oak-inertia/mod.ts'
import { Inertia } from 'https://deno.land/x/oak_inertia@v0.1.5/mod.ts'
import mime from 'https://cdn.skypack.dev/mime-types'

const app = new Application()

if (Deno.env.get('DEBUG') == 'true') {
  console.log('debugging mode on')
  app.addEventListener('error', (evt) => {
    console.log(evt.error)
  })
}

let frontendAssetString = null

// Production manifest
if (Deno.env.get('ENVIRONMENT') == 'production') {
  const [manifestFile, manifestEntries] = await parseManifest()
  manifest = manifestFile

  frontendAssetString = `
  <script type="module" src="/${ manifest['frontend/app.js']['file'] }"></script>
  <link href="/${ manifest['frontend/app.js']['css'][0] }" rel="stylesheet">
  `

  app.use(async (ctx, next) => {
    if (manifestEntries.includes(ctx.request.url.pathname.substr(1))) {
      ctx.response.body = await (await fetch(mediaPath + ctx.request.url.pathname)).text()
      ctx.response.headers.set('Content-Type', mime.lookup(ctx.request.url.pathname))
    }

    await next()
  })
} else {
  frontendAssetString = `
  <script type="module" src="http://localhost:3000/@vite/client"></script>
  <script type="module" src="http://localhost:3000/frontend/app.js"></script>
  `
}

// End production manifest

const store = new WebdisStore({
  url: Deno.env.get('WEBDIS_URL')
})
new Session(app, store, Deno.env.get('APP_KEY'))
new Inertia(app, /*html*/`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deno Deploy | CouchDB | Webdis | InertiaJS</title>
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  ${ frontendAssetString }
</head>
<body>
  @inertia
</body>
</html>`, () => {
  return Deno.env.get('INERTIA_VERSION')
})

State.couch = new CouchService(Deno.env.get('COUCH_URL'))

const router = new Router()

router.get('/register', AuthController.registerView)
  .post('/register', AuthController.register)
  .get('/login', AuthController.loginView)
  .post('/login', AuthController.login)
  .get('/dashboard', async (ctx) => {
    if (await ctx.state.session.has('user_id')) {
      ctx.state.inertia.render('Dashboard')
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