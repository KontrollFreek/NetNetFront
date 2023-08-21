module.exports = async (req, res, app, clients) => {
    let client = clients[req.params.auth]
    if (client == undefined) return res.send('')
    let page = await client.page.screenshot({ encoding: 'base64', optimizeForSpeed: true, quality: 'jpeg', quality: 0 })
    res.send(page)
    clients[req.params.auth].expire = Date.now() + 30000
}