// Load the package
import { Client, middleware, ClientConfig, MiddlewareConfig, WebhookEvent } from '@line/bot-sdk';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Load the module
import { SendMessage } from './Common/Send/ButtonOrErrorMessage';
import { FlexMessage } from './Common/Send/FlexMessage';

// Read the ports from the process.env file
const PORT: string | 3000 = process.env.PORT || 3000;

// Load the access token and channel secret from the .env file
const clientConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};
const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

// Instantiate
const app: express.Express = express();
const client: Client = new Client(clientConfig);

// Do routing
// Testing Routing
app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Hello');
});

// API Routing
app.post(
  '/api/line/message',
  middleware(middlewareConfig),
  async (req: express.Request, res: express.Response): Promise<void> => {
    const events: WebhookEvent[] = req.body.events;

    events.map(
      async (event: WebhookEvent): Promise<void> => {
        try {
          await SendMessage(client, event);
          await FlexMessage(client, event);
        } catch (err) {
          console.error(err);
        }
      }
    );
  }
);

// Start the server
app.listen(PORT, (): void => {
  console.log('http://localhost:3000');
});