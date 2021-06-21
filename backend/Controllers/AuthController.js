import Layout from '../Views/Layout.js'
import LoginView from '../Views/Auth/Login.js'
import RegisterView from '../Views/Auth/Register.js'

import State from '../State.js'
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'
import { parseFormParams } from '../Helpers.js'
import { v4 } from 'https://deno.land/std@0.98.0/uuid/mod.ts'

export function registerView(ctx) {
  ctx.response.body = Layout(RegisterView)
}

export async function register(ctx) {
  const params = await parseFormParams(ctx)
  
  const passHash = bcrypt.hashSync(params.get('password'))

  await State.couch.call('deno/user_'+v4.generate(), {
    method: 'PUT'
  }, {
    type: 'user',
    email: params.get('email'),
    password: passHash
  })

  ctx.response.redirect('/login')
}

export async function loginView(ctx) {

  if (await ctx.state.session.get('user_id') !== undefined) {
    const userID = await ctx.state.session.get('user_id')
    const userLookup = await State.couch.call(`deno/${userID}`)

    ctx.response.redirect('/dashboard')
  } else {
    ctx.response.body = Layout(LoginView)
  }

  
}

export async function login(ctx) {
  const params = await parseFormParams(ctx)

  const response = await State.couch.call('deno/_find', {
    method: 'POST'
  }, {
    "selector": {
       "email": {
          "$eq": params.get('email')
       }
    }
 })

 if (response.docs.length > 0) {
  const userID = response.docs[0]._id

  const result = bcrypt.compareSync(params.get('password'), response.docs[0].password)

  if (result) {
    ctx.state.session.set('user_id', userID)
    ctx.response.redirect('/dashboard')
  } else {
    ctx.response.redirect('/login')
  }

 } else {
  ctx.response.redirect('/login')
 }
}