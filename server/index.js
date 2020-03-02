const express = require('express')

const mongoose = require('mongoose')
const Employees = require('./routes/Employees')
const Departaments = require('./routes/Departaments')
const Settings = require('./routes/Settings')

const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/employees', Employees)
app.use('/departaments', Departaments)
app.use('/settings', Settings)

const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  if (config.dev) {
    const builder = new Builder(nuxt)

    const connectBD = mongoose.connect('mongodb+srv://it_rocket:Sinhrofazotron@itrocket-okbcp.mongodb.net/it_rocket', {
        useNewUrlParser: true,
        useFindAndModify: false
    })
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