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

- 下記依頼出してコーディングさせてみた

```
# 役割
あなたはプロの経験豊富なフロントエンドコーダーでHTML/CSS/Javascriptが得意です。
次の仕様書に従い、ソースコードを書いてください。

# 要求
・フロントエンドのみで動作する出納帳（しゅうんひゅうと支出を管理）を開発してください。
・ソースはHTML/Javascript/CSSで記載し、一つのファイルにまとめてください。
・収入・支出は円貨で入力するようにしてください。
・収入・支出の合計は積み上げ棒グラフで日単位・月単位・年単位で可視化してください。
・サンプルとして擬似データを作成しにゅうrヒョクした状態としてください。
```

- Javascriptエラーになってたので、下記修正依頼
  ```
  Javascriptエラー「Uncaught ReferenceError: addEntry is not defined」が発生しているので修正してください
  ```

- Javascriptエラーが解消されて出納帳が表示されることを確認

- ダークモードとライトモード切り替えるtoggleボタン追加実装依頼
  - 下記、3回依頼しても直らなかったので、claudeで質問して手動で修正笑。
    ```
    // ❌ 間違い
    getComputedStyle(document.body).classList.contains('dark-mode')

    // ✅ 正解
    document.body.classList.contains('dark-mode')
    ```
  - AIにちゃんとフィードバックした方がいいらしいので、手動で修正した箇所を元に戻し、下記フィードバックを投げてAIに修正させた
    ```
    先ほど生成されたコードで、以下のエラーが発生しました：

    `getComputedStyle(document.body).classList.contains('dark-mode')`

    エラー内容：
    Cannot read properties of undefined (reading 'contains')

    修正内容：
    `document.body.classList.contains('dark-mode')`

    理由：getComputedStyle()はCSSStyleDeclarationを返すため、classListプロパティは存在しません。classListはHTMLElementのプロパティです。

    今後同様の箇所があれば、同じパターンで修正してください。
    ```

- 次の修正依頼
```
棒グラフは折れ線グラフに変更し、日単位・月単位・年単位をプルダウンで切り替えられるよう修正してください
```