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
  let message = req.body.message
  console.log(req)
  if (!message || !message.text) {
    res.send(200)
    return next()
  }

  slimbot.sendMessage(message.chat.id,message.text)
  res.send(200)
  return next()
})

server.listen(process.env["PORT"])
