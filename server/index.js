const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/Todo.js')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
// app.post('/api/her', function (req, res) {
//   res.send('Hello World!');
// });
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    const connectBD = mongoose.connect('mongodb+srv://it_rocket:Sinhrofazotron@cluster0-sz7yi.mongodb.net/todos', {
      useNewUrlParser: true,
      useFindAndModify: false
    })
    // const todo = new Todo ({
    //   title: 'тестим тодошки 2'
    // });
    // await todo.save();
    const todos = await Todo.find({});
    app.get('/api/', function (req, res) {
      res.send('Hello World!');
      console.log(todos);
    });
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
