require('dotenv').config()

const { App } = require('@slack/bolt')
const token = process.env.SLACK_BOT_TOKEN
const app = new App({
  token,
  signingSecret: process.env.SLACK_SIGNING_SECRET
})


async function joinChannel(id) {
  try {
    await app.client.conversations.join({
      token,
      channel: id,
    })
  } catch (e) {
    console.error(e)
  }
}

let conversationHistory

async function fetchHistory(id) {
  try {
    const result = await app.client.conversations.history({
      token,
      channel: id
    })

    conversationHistory = result.messages
    console.log(result)
  }
  catch (error) {
    console.error(error)
  }
}

(async () => {
  await app.start(process.env.PORT || 3000)
  console.log("⚡️ Bolt app is running!")
  fetchHistory(process.env.FETCH_CHANNEL)
})()
