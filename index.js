require('dotenv').config()

const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(token);

const postMessage = async () => {
  const result = await web.chat.postMessage({
    text: 'こんにちは',
    channel: `#${process.env.POST_CHANNEL}`,
  });

  console.log(`Successfully send message ${result.ts}`);
}

postMessage()
