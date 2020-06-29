# slack-every-operation-log

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


## 参考になるもの

- [API Methods | Slack](https://api.slack.com/methods)
  - channel系操作はconversations
  - 履歴はconversations.history

## Getting Started

- setting your apps and permissions [Create New App]
  - [Slack API: Applications | Slack](https://api.slack.com/apps)
- clone this repository
- yarn install
- touch .env
- define your environment variables(sample)

```env
SLACK_TOKEN='xoxp-xxxxxxxxx'
SLACK_BOT_TOKEN='xoxb-xxxxxxx'
SLACK_SIGNING_SECRET='xxxxxxxxx'
FETCH_CHANNEL='xxxxxxxx'
```
