let queue = [];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const msg = req.body?.message?.text;

    if (msg) {
      queue.push(msg);
    }

    return res.json({ ok: true });
  }

  // PC fetch endpoint
  if (req.method === "GET") {
    const items = [...queue];
    queue = [];
    return res.json({ items });
  }
}
