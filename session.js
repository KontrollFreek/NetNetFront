const crypto = require('crypto')
const puppeteer = require('puppeteer')

module.exports = async (req, res, app, clients) => {
    if (!req.query.width || !req.query.height) return res.send('')
    let key = crypto.randomBytes(8).toString('hex')
    let browser = await puppeteer.launch({ headless: 'new' })
    let page = await browser.newPage()

    page.setViewport({ width: parseInt(req.query.width), height: parseInt(req.query.height) })
    await page.goto('https://discord.com/login')

    clients[key] = {
        browser,
        page,
        expire: Date.now() + 30000
    }

    res.send(key)

    console.log(`[${new Date().toISOString()}] User "${key}" created session`)
}