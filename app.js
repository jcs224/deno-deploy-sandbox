import { Application, Router } from 'https://deno.land/x/oak@v7.6.2/mod.ts'
import { OakSession, WebdisStore } from 'https://deno.land/x/sessions@v1.5.2/mod.ts'
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
  .get('/dashboard', async (ctx) => {
    if (await ctx.state.session.get('user_id') !== undefined) {
      ctx.response.body = 'found the dashboard!'
    } else {
      ctx.response.redirect('/login')
    }
  }).get('/', (ctx) => {
    ctx.response.body = 'hey there, go to /register'
  })

app.use(router.routes())
app.use(router.allowedMethods())

// Deno Deploy
addEventListener('fetch', app.fetchEventHandler())

// Regular Deno
// await app.listen({ port: 8080 })