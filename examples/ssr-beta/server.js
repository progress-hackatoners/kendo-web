import express from "express";
const PORT = process.env.PORT || 3000;
const server = express();
import { ssr } from "./ssr.js";
server.use(express.static('public'));
server.get("/render", async (req, res, next) => {
  const origin = `${req.protocol}://${req.get("host")}`;
  const pageUrl = `${origin}/index.html`;
  try {
    const serverRenderedPage = await ssr(pageUrl);
    return res.status(200).send(serverRenderedPage);
  } catch (error) {
    return res.status(500).send(error);
  }
});
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});