const express = require('express')
const session = require("express-session")
const bodyParser = require("body-parser")
const app =  express()

app.use(bodyParser.urlencoded({extended: true}))

const { 
  PORT = 8000,
} = process.env

const dummyusers = [
  { id: 1, name: "ashish", email: "ashish@gmail.com", password: "ashish"},
  { id: 2, name: "mohit", email: "mohit@gmail.com", password: "mohit"},
  { id: 3, name: "paras", email: "paras@gmail.com", password: "paras"},
]

app.use(session({
  name: "mysession",
  secret: "ashishsecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*60*60
  }
}))

const redirectLogin = (req, res, next) => {
  if(!req.session.userId){
      res.redirect("/login")
  }
  else {
    next()
  }
}

const redirectDashboard = (req, res, next) =>{
  if(req.session.userId){
      res.redirect("/dashboard")
  }
  else{
    next()
  }
} 

app.get("/",(req, res)=>{
  const { userId } = req.session
  res.send(` 
          <h1>WELCOME</h1>
          ${!userId ? `<a href="/login">Login</a>
          <a href="/register">Register</a>`:`<form method="post" action="/logout"> 
          <button>Logout</button>
          </form>`}
          
          `)
})
app.get("/dashboard",redirectLogin, (req, res)=>{
  const myuser = dummyusers.find(user => user.id === req.session.userId)
    res.send(`
          <h1>Dashboard</h1>
          <ul>
          <li>Name: ${myuser.name}</li>
          <li>Email : ${myuser.email}</li>
          </ul>
          <form method="post" action="/logout"> 
          <button>Logout</button>
          </form>
    `)
})

app.get("/login",redirectDashboard,(req, res)=>{
  res.send(`
        <h1>Login</h1>
        <form method = "post" action = "/login">
        <input type="email" name="email" placeholder = "Enter email" required/>
        <input type="password" name="password" placeholder = "Enter password" required/>
        <input type="submit"/>
        </form>
        <p> Want to signup? </p>
        <a href="/register">Register</a>
  `)
})

app.get("/register", redirectDashboard,(req, res)=>{
    res.send(`
      <h1>Registration</h1>
      <form method = "post" action = "/register">
      <input type="text" name="name"/>
      <input type="email" name="email" placeholder = "Enter email" required/>
      <input type="password" name="password" placeholder = "Enter password" required/>
      <input type="submit"/>
      </form>
      <p> Want to login? </p>
      <a href="/login">Login</a>
    `)
})
app.post("/login", redirectDashboard,(req, res)=>{
    const { email, password} = req.body
    if(email && password){
      const user = dummyusers.find(user => user.email === email && user.password === password)
      if(user){
        req.session.userId = user.id
        return res.redirect("/dashboard")
      }
    }
    res.redirect("/login")
})

app.post("/register", redirectDashboard,(req, res)=>{
      const { name, email, password} = req.body;
      if(name && email && password){
        const ifexits = dummyusers.some( user=> user.email === email)
        if(!ifexits){
            const user = {
              id: dummyusers.length + 1,
              name,
              email,
              password
            }
            dummyusers.push(user)
            req.session.userId = user.id;
            return res.redirect("/dashboard")
        }
      }
      return res.redirect("/register")
})

app.get("/logout",redirectLogin,(req, res)=>{
      res.redirect("/login")
})

app.post("/logout", redirectLogin,(req, res)=>{
    req.session.destroy(err => {
      if(err){
        return res.redirect("/dashboard")
      }
        res.clearCookie("mysession");
        res.redirect("/login")
    })
})

app.get("/*",(req, res)=>{
  res.send("<h1>Not a valid URL</h1>")
})

app.listen(PORT,()=>{
  console.log("server is running to this port" + PORT)
})