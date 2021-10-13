// Load the package
import { Client, WebhookEvent } from '@line/bot-sdk';

// Load the module
import { ButtonMessageTemplate } from '../Template/ButtonMessageTemplate';
import { ErrorMessageTemplate } from '../Template/ErrorMessageTemplate';

export const SendMessage = async (client: Client, event: WebhookEvent): Promise<void> => {
  try {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return;
    }

    const { replyToken } = event;
    const { text } = event.message;

    if (text === '今日の洋服は？') {
      await client.replyMessage(replyToken, ButtonMessageTemplate());
    } else {
      await client.replyMessage(replyToken, ErrorMessageTemplate());
    }
  } catch (err) {
    console.log(err);
  }
};
