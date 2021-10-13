// Load the package
import { Client, WebhookEvent } from '@line/bot-sdk';

// Load the module
import { FlexMessageTemplate } from '../Template/WeatherForecast/FlexMessageTemplate';

export const FlexMessage = async (client: Client, event: WebhookEvent): Promise<void> => {
  try {
    if (event.type !== 'message' || event.message.type !== 'location') {
      return;
    }

    const { replyToken } = event;
    const message = await FlexMessageTemplate(event);

    await client.replyMessage(replyToken, message);
  } catch (err) {
    console.log(err);
  }
};