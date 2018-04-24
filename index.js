const Slimbot = require("slimbot")
const slimbot = new Slimbot(process.env["BOT_KEY"])
const restify = require("restify")


let server = restify.createServer()
//console.log(restify);
server.use(restify.plugins.bodyParser())

slimbot.setWebhook({
  url: `${process.env["ORIGIN"]}/${process.env["BOT_KEY"]}`
})

slimbot.getWebhookInfo()

// Register listeners
server.post(`/${process.env["BOT_KEY"]}`, function handle(req, res, next) {
  let query = req.body.inline_query
  if (!query || !query.query) {
    res.send(200)
    return next()
  }
  slimbot.editInlineMessageText(req.body.update_id, 'edited message');

  //slimbot.sendMessage(query.from.id,query.query)
  res.send(200)
  return next()
})

server.listen(process.env["PORT"])
