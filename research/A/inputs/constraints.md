# 製品制約 — 調査用入力資料

status: user-confirmed / items explicitly identified below

## 確定した制約
- Windows専用のデスクトップアプリ。スマートフォンアプリは対象外。
- 本文執筆エディタではなく、小説の設定資料を管理・参照し、設定情報の作成・編集・削除・保存を行う。
- 主に `.md` / `.txt` を対象とし、ローカルファイルを扱う。
- **SQLiteを使用する（2026-10-25にユーザーが確定）。**
- GitHubで開発管理し、Windows版Codexを用いて開発。
- AI使用者とAI非使用者の双方を想定。AI非使用での設定管理・検索の経路を作る。
- AI機能は軽量ローカルLLMを想定。AIが動かないPCではAI機能を提供しない。
- 開発PC: Intel i7-13650HX / RAM 16 GB / RTX 3050 Laptop 6GB / Windows x64。
- 開発PCより低性能の環境でもアプリの対応範囲を持つ。最低・推奨スペックは後日実測して明示する。

## 検証前・未決定
- UIフレームワーク、Stitch / Pencil等の利用、デザイン、正式なサポートCPU・RAM・GPU条件。
- 既存ファイルをコピーして取り込むか、元ファイルをそのまま参照するか。変更競合・復旧方式。
- RAGの必要性、LLMモデル、音声認識の必要性。MCPは必須ではない。
- リリース時期、価格、販売サイト、MVPの範囲。

## 参照すべき公式AI規約
- https://syosetu.com/site/ai/
- https://kakuyomu.jp/legal/guideline
- 規約は時点により変更される。製品のモード名だけで作品のAI利用区分を保証しない。
