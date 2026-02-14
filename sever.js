const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
const GATEWAY_TOKEN = "YOUR_OPENCLAW_GATEWAY_TOKEN";

app.post(`/webhook/${BOT_TOKEN}`, async (req, res) => {
  try {
    const message = req.body.message?.text;
    if (!message) return res.sendStatus(200);

    console.log("Telegram:", message);

    // Send to OpenClaw gateway
    await axios.post(
      "http://127.0.0.1:18789/api/chat",
      {
        text: message,
        agent: "main",
      },
      {
        headers: {
          Authorization: `Bearer ${GATEWAY_TOKEN}`,
        },
      }
    );

    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(200);
  }
});

app.listen(3001, () =>
  console.log("Telegram webhook server running on port 3001")
);
