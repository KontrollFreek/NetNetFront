(async function () {
    const compression = require('compression')
    const puppeteer = require('puppeteer')
    const express = require('express')
    const app = express()

    app.use(compression())

    const browser = await puppeteer.launch()
    console.log('browser')

    const clients = {}

    app.get('/', (req, res) => res.sendFile(__dirname + '/html/index.html'))

    app.get('/session', (req, res) => require('./session.js')(req, res, app, clients, browser))
    app.get('/page/:auth', (req, res) => require('./page.js')(req, res, app, clients, browser))

    // async function main() {
        // const url = new URL('https://google.com')

        // const browser = await puppeteer.launch()
        // const page = await browser.newPage()
        // page.setViewport({ width: 1920, height: 1080 })
        // await page.goto(url.href)
        // console.log(url.href, 'accessed')
        // async function update() {
        //     let update = await page.screenshot({ encoding: "base64" })
        //     console.log(update.length)
        // }
        // setInterval(update, 100)
    // }
    // main()

    setInterval(() => console.log(clients), 5000)

    app.all('*', (req, res) => res.sendStatus(404))

    app.listen(8120, () => console.log('online'))
})()