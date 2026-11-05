import { createRequire } from 'module';
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

const require = createRequire(import.meta.url);

let lastMessage = null;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const msg = req.body?.message?.text;

    if (msg) {
      lastMessage = msg;
    }

    return res.json({ ok: true });
  }

  if (req.method === "GET") {
    const msg = lastMessage;
    lastMessage = null;

    return res.json({ items: msg ? [msg] : [] });
  }
};
