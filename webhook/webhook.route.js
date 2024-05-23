import express from 'express';
import * as WebhookCtrl from './webhook.controller.js';

const router = express.Router();

router.get('/', WebhookCtrl.getWebhookEvents);

router.post('/', WebhookCtrl.postWebhookEvent);

export default router;
