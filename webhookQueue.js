import { Queue } from "bullmq";
import redis from "./index.redis.js";

const webhookQueue = new Queue("webhookQueue", {
  connection: redis,
});


export default webhookQueue;
