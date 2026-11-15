# 3テーマ比較 — 視覚仕様の統制とレビュー

状態：設計提案。製品仕様・テーマ選定・画面実測は未完了。参照した実在資料は `docs/requirements.md` v1.1-draft、`docs/data-management-design.md`、`docs/user-flows.md`、`docs/screen-specifications.md`、`shared-ux.md`、`shared-wireframes.md`、`shared-layout.md`。上位資料の確定・暫定・未決・将来拡張の区別を維持する。

## 計画の比較と修正

| テーマ | 短い初案 | 汎用化する危険 | 改訂後の一つの記憶点 |
|---|---|---|---|
| Forest Workbench | 深緑の作業机、木と鈍い金属 | ネオンや木目でゲーム風の暗色エディタ化 | 選択資料の「見出し札」。線は所在を示す |
| Storybook Atelier | 古書の索引、明朝と羊皮紙 | 全面明朝・汚れた紙の定型的古書UI | 必要な領域境界を「綴じ目」として扱う |
| Quiet Lore Studio | セージ、自然光、少ない影 | 淡色と余白だけの汎用SaaS化 | 「現在位置の細い帯」。選択の追跡に使う |

3案とも本文を飾る方向は撤回。大胆さは選択位置または既存境界に置いた。追加情報・追加DOM・新規操作を作らず、CSSの色・書体・境界の質だけを変える。

## 比較条件として固定するもの

| 項目 | 共通条件 |
|---|---|
| 画面とDOM | SCR-01〜08とMOD-01〜04、意味構造、領域順、フォーカス順を同じにする。テーマ固有の要素をDOMに足さない |
| 寸法 | 上端56px、機能ナビ72px、左264px、関連248px、下端32pxは暫定の同じ初期値。Quick Recall約420×560pxも暫定の同じ条件。各テーマで行高・文字サイズ・余白・パネル開閉規則を変えない |
| 内容 | 同じ架空作品・資料・Markdown本文・検索語・結果順・状態。画面仕様 §15.1 の正本は「灰冠の王国」。`shared-wireframes.md` の「霧の王都」は図示例であり、実装用サンプル文章として採用しない。この差分は共有文書に残るため実装前の整合確認が必要 |
| 行動 | 作品選択→探索→編集／プレビュー／左右分割→Undo／Ctrl+S→検索→取り込み→Quick Recall→アーカイブ／ゴミ箱→テーマ切替を同順にする。選択のみで検索結果を開かない |
| 状態語 | 「未保存」「保存済み」「保存に失敗」「削除済み」「アーカイブ済み」、COPY／DIRECTの影響説明を同じ位置・文言で出す。色だけで意味を変えない |
| 安全境界 | 保存・取り込み・削除はモックデータの変化だけ。実ファイルを編集・削除しない。Quick RecallのOS最前面とグローバルショートカットは保証しない |

## 見た目の差

| 観点 | Forest | Storybook | Quiet |
|---|---|---|---|
| 主な面 | 深緑 `#1D2A24` | 無地の本文紙 `#FAF6EA` | 光の作業面 `#FFFEFA` |
| 本文 | 紙白 `#EDF2E9` | 墨 `#302B25` | 深緑墨 `#23342B` |
| 書体の役割 | ゴシックで所在と記号を明確に | 見出し限定の明朝、操作と本文はゴシック | ゴシックで一貫、字間の装飾なし |
| 境界・質感 | 深緑の面差＋鈍い金属色の意味線 | 紙の面差＋必要な綴じ目 | 面の連続性＋現在位置の帯 |
| SCR-02 | 選択タブの見出し札 | 探索と編集の綴じ目、明朝の資料見出し | 選択タブ・探索行の細い帯 |
| SCR-06 | 選択結果の見出し札 | 結果と概要の綴じ目、概要見出しだけ明朝 | 選択結果の細い帯、明瞭な検索境界 |
| 懸念 | 暗色での長時間可読性 | 見出しのフォールバックと紙色の対比 | 意味のある線の対比余裕が小さい |

共通の形は4px角丸、通常境界1px、選択の領域内線2px、焦点の外側輪郭2px。影はモーダル・独立小窓の外縁だけ。見た目の差を作るためにレイアウトの余白・情報密度を動かさない。本文は全テーマで無地・左揃え・約60〜75字。入力とプレビューの表示方式、2資料の左右分割は別操作として維持する。

## コントラストと状態の確認

計算は各HEXのsRGB相対輝度による単色同士の値。通常文字4.5:1、意味を持つアイコン・境界・焦点3:1を基準とする。

| 組合せ | Forest | Storybook | Quiet |
|---|---:|---:|---:|
| 本文／本文面 | 13.12:1 | 12.97:1 | 13.03:1 |
| 補助文字／本文面 | 8.24:1 | 6.20:1 | 6.48:1 |
| 本文／選択面 | 11.38:1 | 10.48:1 | 11.11:1 |
| 焦点／本文面 | 10.08:1 | 7.36:1 | 6.39:1 |
| 意味境界／本文面 | 3.65:1 | 3.81:1 | 3.06:1 |

Forestの旧境界 `#52675A` は本文面に対し2.45:1だったため `#6D8373` に修正した。StorybookとQuietの選択面上の境界、半透明の重なり、hover・disabledの合成色は未測定。実装時は状態ごとの実際の背景で測る。未保存・削除・警告を色だけで伝えず、ラベルとアイコンを併用。フォーカスは選択と同時に可視、固定ヘッダーで遮られないことを確認する。

## UI UX Pro Max の調査と採否

`frontend-design/SKILL.md` と `ui-ux-pro-max/SKILL.md` を実読。後者のローカル `search.py` を各新方向に対し次の通り実行したが、この環境には `python` コマンドがなく、検索結果・一致件数は取得できなかった。実行不能を検索結果の採用と呼ばない。Pythonのインストールやネットワーク依存は追加していない。

```powershell
python .agents/skills/ui-ux-pro-max/scripts/search.py "desktop knowledge editor forest workbench" --design-system -f markdown
python .agents/skills/ui-ux-pro-max/scripts/search.py "desktop document editor storybook archive" --design-system -f markdown
python .agents/skills/ui-ux-pro-max/scripts/search.py "desktop knowledge editor calm sage" --design-system -f markdown
python .agents/skills/ui-ux-pro-max/scripts/search.py "keyboard focus desktop editor" --domain ux
python .agents/skills/ui-ux-pro-max/scripts/search.py "japanese readable editor text" --domain typography
python .agents/skills/ui-ux-pro-max/scripts/search.py "muted editorial desktop" --domain color
```

`Get-Command python,python3,py,uv` でも実行可能な候補なし。検索の出力は未検証。スキル本文のQuick Referenceから採用したのは、可視の焦点、色以外の状態表示、読みやすい行長、エラー原因と回復、装飾アイコンの読み上げ除外。見送ったのはLPのヒーロー、SaaSカード、モバイルの下部ナビとタッチ寸法、Reactアイコンパッケージ、Tailwindの導入。Windows向け設定資料管理とHTML/CSS/Vanilla JSの制約に合わないため。スキルが示す `references/quick-reference.md` と `references/pro-rules.md` は当該インストール内で見つからず、本文のQuick Referenceを参照した。生成されたデザインシステムの永続化やMASTER.mdの上書きはしていない。

## 同一シナリオと次工程

1. 「灰冠の王国」を開き、フォルダとカテゴリから同じ資料へ到達する。
2. Markdownを編集→プレビュー→左右分割→Undo→Ctrl+S。タブと下端の未保存・保存済み表示を確認する。
3. 作品全体の検索、範囲・タグ変更、結果プレビュー、0件と失敗の区別を確認する。
4. COPY／DIRECTと配置方式、同名衝突、取り込み結果の模擬を確認する。
5. Quick Recallで検索→結果→概要→詳細／編集／別メモ→最小化相当。小窓の文言と焦点を確認する。
6. アーカイブ→解除、ゴミ箱→復元、テーマ切替後のタブ・入力・スクロール・焦点保持を確認する。

各工程の現状：設計と3テーマ比較仕様は本書で更新。HTML/CSS、JavaScript操作、スクリーンショットによる自己批評、1366×768・1440×900・1920×1080／125%・150%相当の同一シナリオ試験は**未実装・未実測**。後続では装飾のためのDOM変更を避け、同じサンプル本文と操作順でスクリーンショットを比較し、読みにくい箇所を修正する。自由配置、同名判定、Quick RecallのOS動作・編集競合、DIRECTの実ファイル処理は既存資料で未決であり、この視覚仕様では確定しない。
