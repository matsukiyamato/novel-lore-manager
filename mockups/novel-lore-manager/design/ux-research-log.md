# UI UX Pro Max 調査ログ

## 2026-11-03 操作モック実装時の追記

`python .agents/skills/ui-ux-pro-max/scripts/search.py 'keyboard focus desktop editor' --domain ux` と `python .agents/skills/ui-ux-pro-max/scripts/search.py 'desktop lore editor knowledge workbench' --design-system` を再試行したが、PowerShellが `python` を認識せず終了した。`py -3 --version` もコマンド未検出。したがって領域別・全体方針の一致結果や順位は取得していない。今回の操作実装では、既に確認済みのスキル本文 Quick Reference の `keyboard-nav`、`focus-states`、`color-not-only`、`undo-support`、`empty-states`、`escape-routes` を一般指針として参照した。デスクトップに合わないモバイルのsafe area、haptics、bottom navigationは引き続き採用しない。Python 3が使用可能になれば、下記の実行待ちコマンドを再実行する必要がある。


2026-11-02。対象はWindowsデスクトップ向け設定資料エディタのHTML/CSS/Vanilla JSモック。検索CLIの結果とスキル本文のQuick Referenceを区別する。検索未実行の候補を「検索結果」として扱わない。

## 実体と実行環境

| 項目 | 確認結果 |
|---|---|
| スキル | `.agents/skills/ui-ux-pro-max/SKILL.md` を実際に読んだ。Python 3・標準ライブラリだけを前提にし、Pythonがない場合はエージェントがインストールしない指示を確認。 |
| スクリプト | `.agents/skills/ui-ux-pro-max/scripts/search.py` を実在確認。ソースの `argparse` に `--design-system`、`-f markdown`、`--domain`、`--stack`、`--help` を確認。 |
| `--help` 実行 | `python .agents/skills/ui-ux-pro-max/scripts/search.py --help` を試行したが、PowerShellが `python` を認識せず終了。**ヘルプ出力は未取得**。 |
| Python探索 | `Get-Command py,python3,python,uv`、`where.exe py`、`where.exe python`、一般的なユーザー・Program Files内のPython配置を確認。実行可能なPython 3は見つからなかった。 |
| 参照補助ファイル | スキル配下の `references/quick-reference.md` と `references/pro-rules.md` は存在しない。スキル本文のQuick Reference §1〜§9を参照。 |
| 永続化 | `--persist`／`--force` は実行していない。既存のMASTER.mdを上書きしていない。 |

### 実行したコマンド

```powershell
Get-Location
rg --files docs mockups .agents/skills/ui-ux-pro-max
Get-Content -LiteralPath .agents/skills/ui-ux-pro-max/SKILL.md -TotalCount 240
python --version
python .agents/skills/ui-ux-pro-max/scripts/search.py --help
Get-Command py,python3,python,uv -ErrorAction SilentlyContinue
where.exe py
where.exe python
Get-ChildItem 'C:\Users\matsukiymato\AppData\Local\Programs\Python','C:\Program Files\Python*','C:\Python*','C:\Users\matsukiymato\AppData\Local\Microsoft\WindowsApps\python*.exe' -ErrorAction SilentlyContinue
```

`python --version` と `--help` はどちらもコマンド未検出。`Get-Command` と `where.exe` でも候補なし。ユーザーにPython 3の実行パス提供、またはCLI検索を未検証として進める選択を依頼中。**以下の検索コマンドは未実行の実行待ちリストであり、結果・一致件数・順位は未記入。**

## 実行待ちの検索計画

Python 3のパスが得られたら、以下を実際に実行し、返された `Domain`／`Source`／`Result 1` と適合性をこの表に追記する。対象が空・的外れなら、各トピックにつき一回だけ狭い語に変更して再検索する。

| 意図 | 実行待ちコマンド | 照合すること |
|---|---|---|
| 全体方針 | `python .agents/skills/ui-ux-pro-max/scripts/search.py "developer tool IDE knowledge editor desktop" --design-system -f markdown` | デスクトップツール向けの結果か。LP／SaaS営業構造は除外 |
| キーボードフォーカス | `python .agents/skills/ui-ux-pro-max/scripts/search.py "keyboard focus desktop editor" --domain ux` | Tab順、フォーカスの可視性・遮蔽 |
| 検索結果移動 | `python .agents/skills/ui-ux-pro-max/scripts/search.py "search result navigation keyboard" --domain ux` | 結果選択→プレビュー→開くの区別 |
| エラー検証 | `python .agents/skills/ui-ux-pro-max/scripts/search.py "error summary validation" --domain ux` | 原因・修正方法、複数エラーの導線 |
| パネル幅 | `python .agents/skills/ui-ux-pro-max/scripts/search.py "resizable panels keyboard" --domain ux` | ドラッグ以外の変更手段、最小幅 |
| コンパクトラベル | `python .agents/skills/ui-ux-pro-max/scripts/search.py "compact label overflow" --domain ux` | タブ・状態タグの全文確認と折り返し |
| 日本語可読性 | `python .agents/skills/ui-ux-pro-max/scripts/search.py "japanese readable editor text" --domain typography` | 日本語本文、行高、フォールバック。英字フォントだけの提案は除外 |
| 低彩度 | `python .agents/skills/ui-ux-pro-max/scripts/search.py "muted editorial desktop" --domain color` | 低彩度でも文字と状態のコントラストが足りるか |
| アイコン意味 | `python .agents/skills/ui-ux-pro-max/scripts/search.py "icon button accessible label" --domain icons` | 操作名と状態を読み上げ可能か。React専用importは使用しない |

技術別検索が必要になれば `--stack html-tailwind` を**参照知識だけ**に使い、Tailwindの導入やクラス設計のコピーはしない。`wpf`／`winui` で調べる場合もHTMLで再現可能な操作規則だけ採る。現段階ではどの検索も未実行であり、結果が見つからないと判断したわけではない。

## 実際に読んだスキル本文から採用した知識

これは**CLI検索の採用結果ではない**。`SKILL.md` Quick Referenceを読んで、製品資料との整合を確認した設計判断である。

| 根拠 | 採用した内容 | 適用先 |
|---|---|---|
| §1 `keyboard-nav`, `focus-states`, `focus-not-obscured` | 見た目に沿うフォーカス順、明瞭な輪郭、固定領域による遮蔽防止 | ツリー・タブ・検索・モーダル |
| §1 `icon-context`, `color-not-only` | アイコンの意味を文脈で決め、操作名・未保存・削除状態を文字でも表す | 全画面 |
| §5 `compact-label-overflow`, `chip-collection-reflow` | 省略しても全文への導線を残し、条件タグは先に折り返す | タブ、検索フィルタ、Quick Recall |
| §6 `line-height`, `line-length`, `long-token-wrapping` | 日本語本文の行高と行長を制御し、URL等の連続文字に耐える | Markdown・検索抜粋 |
| §8 `error-placement`, `error-summary`, `focus-management` | 欄の近くのエラーと、複数エラー時のリンク付き要約 | 作品名入力、取り込み |
| §8 `error-recovery`, `undo-support` | エラーに復帰方法を添え、破壊操作は復元経路を残す | 保存失敗、ゴミ箱 |
| §9 `state-preservation`, `nav-state-active` | 検索から戻った条件・スクロールを保ち、現在位置を明示 | SCR-02／04 |

## 適用を見送った知識と理由

| スキル本文の知識 | 判断 |
|---|---|
| `bottom-nav-limit`、モバイルのsafe area・haptics・Dynamic Type | Windows向けデスクトップの画面構造には適用しない。文字拡大はWindows 125%／150%相当で別途検証する。 |
| `mobile-first`、375px電話幅の検証 | この製品の基準画面は1366×768以上。小型モバイル用ナビへ再構成しない。狭いQuick Recallは別ウィンドウとして検討する。 |
| 44pt／48dpのネイティブタッチターゲット | ポインタ・キーボード主体のデスクトップに単位ごと転用しない。HTMLモックで操作可能な領域・フォーカスを確認する。 |
| `deep-linking` のURL共有 | 作品内資料とモックのメモリ状態に安定した共有URLを前提にしない。将来のデータ方式が未決。 |
| デザインシステムのLP構造、ヒーロー、営業CTA | 設定資料エディタの探索・編集を阻害するため採用しない。CLI結果からの除外は検索後に別途記録する。 |
| ReactアイコンパッケージやTailwindクラス | 技術制約はHTML/CSS/Vanilla JSのみ。アイコン意味の原則だけ利用する。 |

## 資料間の差分・未検証

- `docs/requirements.md` は現在存在する。既存 `mockups/novel-lore-manager/design/shared-layout.md` と `README.md` にある「存在しない」は古い記述。本タスクでは既存文書・コードを編集しない。
- `docs/screen-specifications.md` SCR-06の横二列ワイヤーは暫定。幅約420pxでの日本語可読性を優先し、今回の共通ワイヤーは縦積みを提案。実画面での比較は未実施。
- `shared-layout.md` の左264px・右248px、本文約72字は暫定値。1366×768、1440×900、1920×1080および125%／150%相当の実描画は未検証。
- 検索の日本語表記ゆれ、同名判定、Quick Recallの同時編集とOSウィンドウ動作は製品資料でも未決。一般的なUX規則で確定扱いしない。
- スキルのQuick Referenceを手動で検討したが、**必須の検索スクリプト調査はPython 3不在のため未完了**。Pythonの提供後に検索を実行し、採否と理由を追記する必要がある。
