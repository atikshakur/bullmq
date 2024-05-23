import webhookQueue from "../webhookQueue.js";

const getWebhookEvents = async (req, res) => {
  try {
    const jobs = await webhookQueue.getJobs(["waiting", "active", "delayed"]);

    return res.status(201).json({ jobs });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postWebhookEvent = async (req, res) => {
  try {
    const events = req.body;
    console.log(events);

    const jobs = [];

    for (const event of events) {
      const job = await webhookQueue.add("webhooks", {
        customerUrl: event.customerUrl,
        payload: event.payload,
        headers: event.headers,
      });
      jobs.push(job);
    }

    console.log(jobs);
    return res.status(201).json({ jobs });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { postWebhookEvent, getWebhookEvents };
