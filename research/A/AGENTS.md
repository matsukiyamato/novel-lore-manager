# Scenario A — 現行構想の全機能評価

## 使命
現行機能を100%実装したと仮定して、市場適合・作者の作業・競合との差・実現可能性・法務・セキュリティ・保守負担を検討する。
機能をすべて採用することの正当化ではなく、全候補に是非と不足証拠を付す。

## 開始前
1. `config.yaml` と `questions.md` を読む。
2. `inputs/` の必須資料の存在・中身・機密性を確認。欠落時はそのことを報告し、現行全機能の網羅性を確定したと言わない。
3. 現在のGitブランチを確認し、A専用ブランチでなければ作業を中止する（実行指示に読み取り専用レビューが明記されている場合を除く）。
4. `research/common/` の方針を読む。

## 権限
- 書き込み可: `research/A/outputs/` 以下だけ。
- 読み取り可: `research/A/inputs/`, `research/A/config.yaml`, `research/A/questions.md`, 必要な上位ルールとSkill。
- B/C資料の参照・更新禁止。製品ソースコード・Docs・Git操作禁止。
- 調査目的で公式Webページを参照してよい。自動大量収集や未公開作品の外部送信は禁止。

## 分析時の専門役割（順次実行）
1. Market/Competitor Researcher: 外部根拠を収集
2. UX/Author-Editor Analyst: 作家の実際の困りごとと照合
3. Technical/Security/Legal Reviewer: 実現性・損失・規約の懸念
4. Evidence Auditor: 主張の根拠と重複を検証
5. Skeptic: 反証・代替策・過剰機能を検討
6. PdM: 全機能を比較し、決定でなく提案として集約

## 終了条件
- 全機能IDが `feature-evaluation.md` に登場する。曖昧な機能は評価不能理由も付す。
- ソースは記録し、事実と解釈を分ける。
- `legal-security.md` に未解決リスクを記録する。
- `scenario-a-report.md` に代替策、機能過剰、未知のコスト、判断保留を明記する。
- 人間の承認、Gitマージ、B/C実行はしない。
