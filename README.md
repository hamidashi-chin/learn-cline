# Clineで始めるAI駆動開発

## セットアップ

### ClineのAPIキーセット

- vscodeにClineの拡張機能をインストール

- Clineのアイコン(ロボットの顔)
  - API Provider
    - Google Geminiを選択する
    - ※１日の回数制限はあるが無料で利用できる

- Google AI StudioにてAPIキー発行する
  - [Google AI Studio](https://ai.google.dev/aistudio?hl=ja)にアクセス
    - Gemini API キーを取得する、の「APIキーを取得する」ボタンクリック
      - 「+APIキーを作成」ボタンクリック
        - GoogleCloudのコンソールで作成したプロジェクトを選択
          - 「既存のプロジェクトでAPIキー作成（だったかな？）」ボタンクリックしてAPIキー発行
  - ※無料だとGoogleGeminiの学習データに使用されるので、機密情報等のデータは入れないよう注意
  - Gemini API Keyのテキストボックスに、発行したAPIキーを貼り付け
    - 「Let's go!」ボタンクリック

- 日本語で応答してくれるよう設定
  - Clineの拡張機能の歯車アイコンクリック
    - Custom Instructions
      ```
      # システムコマンド

      ・日本語で必ず応答してください。
      ```

## ClineでHTML/JS/CSS開発

