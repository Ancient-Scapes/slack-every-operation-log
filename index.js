require('dotenv').config()

const timestamp = require('unix-timestamp')
const dayjs = require('dayjs')
const { App } = require('@slack/bolt')

const token = process.env.SLACK_BOT_TOKEN
const app = new App({
  token,
  signingSecret: process.env.SLACK_SIGNING_SECRET
})

let conversationHistory = []
let myPosts = []

const saveMyPosts = () => {
  conversationHistory.forEach((itemWithCursor) => {
    itemWithCursor.forEach((message, index) => {
      // only me
      if (message.user !== process.env.SLACK_MY_USER_ID) return

      // slack timestamp(UNIX epoch milliseconds) to date
      message.date = timestamp.toDate(Number(message.ts));
      myPosts.push(message)
    })
  })

  // 昇順
  myPosts = myPosts.sort((a, b) => a.date - b.date)
  myPosts.forEach((message) => {
    console.log(dayjs(message.date).format("YYYY/MM/DD HH:mm:ss"));
    console.log(message.text);
  })
}

async function fetchHistory(id) {
  try {
    let cursor

    // 開始時刻から現在までのすべての投稿を取得する
    while (true) {
      const result = await app.client.conversations.history({
        token,
        channel: id,
        oldest: timestamp.fromDate("2020-06-01 00:00:00"),
        cursor
      })

      conversationHistory.push(result.messages)
      if (!result.response_metadata || !result.response_metadata.next_cursor) break
      else cursor = result.response_metadata.next_cursor
    }
  }
  catch (error) {
    console.error(error)
  }
}

(async () => {
  try {
    await app.start(process.env.PORT || 3000)
    console.log("⚡️ Bolt app is running!")
    await fetchHistory(process.env.FETCH_CHANNEL)
    saveMyPosts()
    // TODO: 稼働時間を計算しArrayに入れていく処理
  } catch (e) {
    console.error(e)
  } finally {
    app.stop()
  }
})()
