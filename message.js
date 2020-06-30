require("dotenv").config();

const { App } = require("@slack/bolt");

const token = process.env.SLACK_BOT_TOKEN;
const app = new App({
  token,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message("hello", async ({ payload, context }) => {
  try {
    const result = await app.client.chat.postMessage({
      token,
      channel: process.env.POST_CHANNEL_ID,
      text: "はろー",
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
});
