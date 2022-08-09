# gatheragain-app

## Build & Release

```
eas build --profile preview --platform all --no-wait
eas build --profile preview --platform ios --no-wait
eas build --profile preview --platform android --no-wait

🔮 feature(not working submit)
add option >  --auto-submit
```

## 運用メモ

- アプリバージョンはバージョン X.X.X で運用
- releaseChannel はバージョン X.X で管理する（マイナーバージョンは指定しない）
- ビルドが必要なバグ修正などに関してはアプリバージョンのパッチバージョンを上げる
  - → つまりは基本的に機能開発のマイナーバージョン以上でないと releaseChannel は変更しない

```mermaid
graph TD

%% 宣言
Groups(グループ一覧)
GroupCreate(グループ作成)
GroupInfo(グループ情報)
Chat(チャット)
Calendar(カレンダー)
DropAccount(通報/強制退会)
Notice(通知画面)
Settings(設定画面)
Question(スケジュール/投票/集合場所)
MyTask(マイタスク)
Station(駅詳細)
StationSelector(駅選択)
Map(地図)
CollectMoney(集金)

subgraph other[その他]
Station
StationSelector
Map
CollectMoney
end

subgraph home[ホーム]
Groups --> Chat
Groups --> GroupCreate

Chat --> GroupInfo
Chat --> Calendar
Chat -.-> DropAccount
Chat --> Question
Calendar --> Question
Question -.-> Station
end
Question --> StationSelector
Question --> Map

subgraph settings[設定]
Settings --> StationSelector
end

subgraph notice[通知]
Notice --> Question
Notice --> Chat
end

subgraph task[タスク]
MyTask --> Question
MyTask --> Chat
end
```
