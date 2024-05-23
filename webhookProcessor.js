import { Worker } from "bullmq";
import redis from "./index.redis.js";

const sendWebhook = async (job) => {
  const { customerUrl, payload, headers } = job.data;

  try {
    const response = await fetch(customerUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });
    console.log(`Webhook sent successfully to ${customerUrl}`);
  } catch (error) {
    console.error(`Failed to send webhook to ${customerUrl}:`, error);
  }
};

// Create a new worker to process jobs in the queue
const worker = new Worker(
  "webhookQueue",
  async (job) => {
    await sendWebhook(job);
  },
  {
    connection: redis,
  }
);

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

export default worker;
