import express from "express";
import webhookRoutes from "./webhook/webhook.route.js"

import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Webhook queue processor is running.");
});

app.use('/webhooks', webhookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
