require("dotenv").config();

const { App } = require("@slack/bolt");

const token = process.env.SLACK_BOT_TOKEN;
const app = new App({
  token,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const join = async () => {
  try {
    const result = await app.client.conversations.join({
      token,
      channel: process.env.POST_CHANNEL_ID
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

join()
