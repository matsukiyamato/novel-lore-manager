# B成果物の保存記録

run_id: B-20261025-01
status: completed_limited_research
quality: CONDITIONAL
date_jst: 2026-10-25
branch: research/lore-b_ver1.0
commit_id_observed: 8835c32cc4ec8c8c42413adfc83da4beda8bb800
commit_method: HEADと当該refの読取のみ。新規コミット未作成、Gitコマンド未使用。
input_manifest: ../00-execution/input-manifest.md
scope_exception: 公式規約未確認を明記した限定調査をユーザーが承認。
required_output_count: 31
additional_output_count: 4

## 保存した指定成果物
- 00-execution/run-log.md
- 00-execution/input-manifest.md
- 01-research/market.md
- 01-research/author-behavior.md
- 01-research/author-editor.md
- 01-research/competitors.md
- 01-research/regulations.md
- 02-evidence/evidence-register.yaml
- 02-evidence/audit-report.md
- 02-evidence/missing-evidence.md
- 03-analysis/user-problems.md
- 03-analysis/causes-and-workarounds.md
- 03-analysis/unmet-needs.md
- 03-analysis/solution-options.md
- 03-analysis/technical-feasibility.md
- 04-reviews/author-editor-review.md
- 04-reviews/ui-ux-review.md
- 04-reviews/security-review.md
- 04-reviews/legal-review.md
- 04-reviews/skeptic-review.md
- 04-reviews/dissent-register.yaml
- 05-pdm/recommendation.md
- 06-final-report/README.md
- 06-final-report/01-overview.md
- 06-final-report/02-user-problems.md
- 06-final-report/03-existing-solutions.md
- 06-final-report/04-feature-proposals.md
- 06-final-report/05-risks-and-unknowns.md
- 06-final-report/06-decisions-needed.md
- 07-handover/findings-summary.md
- 07-handover/freeze-manifest.md

## 追跡用の追加成果物
- 00-execution/search-log.md
- 02-evidence/evidence-register.md
- 02-evidence/question-status.md
- 06-final-report/scenario-b-integrated-report.md（調査完了後、ユーザー依頼による統合報告）

## 入力と未検証
3必須入力、質問票・設定のSHA256はinput-manifest.mdに記録。役割定義00〜13は工程に応じて読了。規則・入力・定義の編集なし。既存outputs/README.md、REPORT-WRITING-GUIDE.md、.gitkeepは変更していない。

証拠台帳はJSONで記録したYAML 1.2互換文書で、出典40・主張43。異論台帳11件はすべてopen。質問41件の回答状態はquestion-status.md。未検証の市場・規約・性能・費用、重大リスクはmissing-evidence.mdと最終報告に保持。Git追跡状態はGit禁止のため調べていない。

## 最終検査

指定31ファイル欠落0、出典40・主張43・異論11、未定義ID0、表の列ずれ0、ローカルリンク不達0、41小問の欠落/追加0、異論本文の最終報告転記不一致0。入力3資料・設定・質問のSHA256は開始時と一致。実装試験や規約適合確認とは区別する。

## 境界
この実行でA/C・既存機能台帳・not_use・製品コードを読まず、出力以外を書いていない。安全遮断の迂回・公開・依存導入・連絡送信・採用確定はしない。前段の停止記録は履歴としてrun-log.mdに残し、現在状態と区別した。
