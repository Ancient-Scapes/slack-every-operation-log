# slack-every-operation-log

## Usage

```shell
node index.js
```

## Getting Started

- setting your apps and permissions [Create New App]
  - [Slack API: Applications | Slack](https://api.slack.com/apps)
- clone this repository
- yarn install
- touch .env
- define your environment variables(sample)

```env
// copy from slack api site
SLACK_BOT_TOKEN='xoxb-xxxxx'
SLACK_SIGNING_SECRET='xxxxxx'

// copy url from my slack workspace
FETCH_KINTAI_CHANNEL_ID='xxxxxx'
SLACK_MY_USER_ID='xxxxxx'
```

- `node index.js`
  - output dailywork log.

### example

```shell
2020/06/25
[12:38:19] かいし
[15:37:27] おそとでちゃうよぉ〜〜〜〜
[23:11:52] 終わり

2020/06/26
[11:31:11] 風呂入って開始
[18:29:01] 終わり

2020/06/29
[11:44:25] かいし
[16:49:00] 休憩
[18:10:36] 終わり

2020/06/30
[11:46:24] かいし
[18:27:49] 終了

```

## 目的

毎日の作業開始時刻と終了時刻を取得し、月単位で取得する

- 誰
  - 自分
- どこ
  - 環境変数に隠蔽した勤怠記録チャンネルIDから
- どうやって
  - 勤怠チャンネルの一日の始め(8:00以降)から終わり(22:00)の範囲内で検索し、そこから最初と最後の投稿を取得する
  - その後、最初の投稿と最後の投稿の時間差を計算する
  - 休憩時間があるので1時間引く
  - 毎日のだいたいの稼働時間が出る
  - あとは煮るなり焼くなり…


## Link

- [API Methods | Slack](https://api.slack.com/methods)
  - channel系操作はconversations
  - 履歴はconversations.history
  - historyは先にjoin APIを叩いておく必要あり
