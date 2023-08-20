const crypto = require('crypto')

module.exports = async (req, res, app, clients, browser) => {
    if (!req.query.width || !req.query.height) return res.send('')
    let key = crypto.randomBytes(8).toString('hex')
    let page = await browser.newPage()

    page.setViewport({ width: parseInt(req.query.width), height: parseInt(req.query.height) })
    await page.goto('https://discord.com/login')

    clients[key] = {
        page
    }

    res.send(key)

    console.log({
        key,
        width: parseInt(req.query.width),
        height: parseInt(req.query.height)
    })
}