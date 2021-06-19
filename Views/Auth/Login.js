export default /*html*/`
<div class="container vh-100 d-flex justify-content-center align-items-center">
  <form action="/login" method="post">
    <h1 class="text-center mb-4">Login</h1>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" name="email">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" name="password">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
`