import { Application, Router } from 'https://deno.land/x/oak@v7.5.0/mod.ts'
import { OakSession, WebdisStore } from '../session-2/mod.ts'
import CouchService from './Services/CouchService.js'
import { 
  registerView, 
  register,
  loginView,
  login
} from './Controllers/AuthController.js'
import State from './State.js'

const app = new Application()
const store = new WebdisStore({
  url: Deno.env.get('WEBDIS_URL')
})
new OakSession(app, store)
State.couch = new CouchService(Deno.env.get('COUCH_URL'))

const router = new Router()

router.get('/register', registerView)
  .post('/register', register)
  .get('/login', loginView)
  .post('/login', login)
  .get('/dashboard', (ctx) => {

  }).get('/', (ctx) => {
    ctx.response.body = 'hey there, go to /register'
  })

app.use(router.routes())
app.use(router.allowedMethods())

// Deno Deploy
addEventListener('fetch', app.fetchEventHandler())

// Regular Deno
// await app.listen({ port: 8080 })