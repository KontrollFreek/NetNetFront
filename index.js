(async function () {
    const compression = require('compression')
    const express = require('express')
    const app = express()

    app.use(compression())

    const clients = {}

    app.get('/', (req, res) => res.sendFile(__dirname + '/html/index.html'))

    app.get('/session', (req, res) => require('./session.js')(req, res, app, clients))
    app.get('/page/:auth', (req, res) => require('./page.js')(req, res, app, clients))

    setInterval(() => {
        let c = Object.keys(clients)
        c.forEach(c => {
            if (clients[c].expire < Date.now()) {
                clients[c].browser.close()
                delete clients[c]
            }
        })

        console.log(`[${new Date().toISOString()}] Removed stale clients`)

        console.log(`[${new Date().toISOString()}] ${Object.keys(clients).length} clients currently connected`)
    }, 30000)

    app.all('*', (req, res) => res.sendStatus(404))

    app.listen(8120, () => console.log(`[${new Date().toISOString()}] Server online`))
})()