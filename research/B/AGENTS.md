# Scenario B 専用ルール

## 目的
ユーザーの行動・課題から必要な機能を**白紙で考える**。現行機能の評価をしない。

## 必須入力
`research/B/README.md`、`research/B/config.yaml`、`research/B/questions.md`、`research/B/inputs/` 内の承認資料。共通指示・Skillは必要に応じて読む。

## 読まない場所
- `research/A/` と `research/C/`
- `docs/product/feature-inventory.md`、既存の機能採用案、Aの分析結果
- 作品の未公開本文・無関係な個人ファイル

## 書き込み可能な場所
`research/B/outputs/` のみ。定義ファイル・YAML・questions・inputs・READMEは実行中変更しない。Gitコミット/マージ、外部公開を行わない。

## 調査順序
調査→証拠監査→困りごとの整理→既存の代替方法→成功条件→機能候補→専門レビュー→PdM要約→最終報告。

## 守ること
- 製品前提はWindowsデスクトップ、SQLite確定、ローカル設定ファイル、執筆本文は対象外。
- 機能名称に引っ張られないため、現行構想は参照しない。
- 自己観察は開発者1人の経験であり、市場一般の証拠ではない。
- 技術的な評価は「候補」と「検証が必要」を区別する。
- 最終決定権は人間にある。全レポートは日本語、短い見出し、具体例、根拠ID、未確認事項を入れる。

