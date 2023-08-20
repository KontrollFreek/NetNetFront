const crypto = require('crypto')

module.exports = async (req, res, app, clients, browser) => {
    let client = clients[req.params.auth]
    if (client == undefined) return res.send('')
    let page = await client.page.screenshot({ encoding: 'base64', optimizeForSpeed: true, quality: 'jpeg', quality: 0 })
    res.send(page)
}