import {initFlows} from './flows.js';
import {renderMarkdown} from './markdown.js';
import {initEnhancements} from './enhancements.js';
const $ = selector => document.querySelector(selector);
const docs = [
  {id:'elena',title:'エレナ・ヴァルツ',folder:'登場人物',category:'人物',tags:['魔導','王都','第2章'],aliases:['灰の記録者','えれな'],links:['academy','leon'],summary:'王立魔導学院の記録官。「灰冠」の由来を知る数少ない人物。禁書庫の封印を独自に調べている。',content:`# エレナ・ヴァルツ

> 王立魔導学院の記録官。
> 「灰冠」の由来を知る数少ない人物。

## 基本情報
- 年齢：27歳
- 所属：[[王立魔導学院]]
- 役職：第二書庫 記録官
- 別名：灰の記録者

## 人物像
慎重で寡黙。記録の欠落を何より恐れる一方、禁書庫の封印について独自に調べている。

## レオンとの関係
[[レオン・クロード]]とは幼少期からの知己。北方遠征の記録を共有する。

## 未解決の問い
- 灰冠の継承条件は何か。
- 学院が封じた第三の術式とは。`},
  {id:'leon',title:'レオン・クロード',folder:'登場人物',category:'人物',tags:['北方','第2章'],aliases:['れおん'],links:['elena'],summary:'北方騎士団の騎士。エレナとは幼少期からの知己。',content:'# レオン・クロード\n\n北方騎士団の騎士。エレナとは幼少期からの知己。\n\n## 経歴\n北方遠征の記録をエレナと共有する。'},
  {id:'aria',title:'アリア・ベルフォード',folder:'登場人物',category:'人物',tags:['王都'],aliases:['ありあ'],links:['academy'],summary:'王国の歴史を研究する学院生。',content:'# アリア・ベルフォード\n\n王国の歴史を研究する学院生。'},
  {id:'magic',title:'魔法体系',folder:'世界観',category:'世界観',tags:['魔導'],aliases:[],links:['academy'],summary:'術式は記録と詠唱により成立する。第三の術式の記録は禁書庫に封じられている。',content:'# 魔法体系\n\n術式は記録と詠唱により成立する。\n\n## 第三の術式\n禁書庫に封じられた記録がある。'},
  {id:'history',title:'王国の歴史',folder:'世界観',category:'世界観',tags:['王都'],aliases:[],links:['aria'],summary:'灰冠の継承を巡る記録が残る。',content:'# 王国の歴史\n\n灰冠の継承を巡る記録が残る。'},
  {id:'academy',title:'王立魔導学院',folder:'組織',category:'組織',tags:['魔導','王都'],aliases:['がくいん'],links:['elena','magic'],summary:'王都アストリアにある魔導研究機関。エレナが働く第二書庫には禁書庫の目録が残る。',content:'# 王立魔導学院\n\n王都アストリアにある魔導研究機関。エレナが働く第二書庫には禁書庫の目録が残る。'}
].map(doc => ({...doc,saved:doc.content,history:[],status:'active',mode:'copy'}));
const byId = id => docs.find(doc => doc.id === id);
const state={active:'elena',secondary:null,tabs:['elena','magic','academy'],folders:['登場人物','世界観','組織'],folderOpen:new Set(['登場人物','世界観','組織']),category:null,mode:'split',recall:'elena',memo:'',memoSaved:'',closing:null};
const themePaths={forest:'forest-workbench',storybook:'storybook-atelier',quiet:'quiet-lore-studio'};
function setTheme(theme){if(!themePaths[theme])return;document.documentElement.dataset.theme=theme;$('#theme-css').href='css/themes/'+themePaths[theme]+'.css';$('#theme').value=theme;try{localStorage.setItem('nlm-theme',theme)}catch{}}
try{setTheme(localStorage.getItem('nlm-theme')||'forest')}catch{setTheme('forest')}
$('#theme').addEventListener('change',event=>setTheme(event.target.value));
window.addEventListener('storage',event=>{if(event.key==='nlm-theme'&&event.newValue)setTheme(event.newValue)});
function button(label,className,action){const b=document.createElement('button');b.type='button';b.className=className;b.textContent=label;b.addEventListener('click',action);return b}
const folderMarks={
  '登場人物':'M12 11.2a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z M9.5 15c.2-1.3 1-2 2.5-2s2.3.7 2.5 2',
  '世界観':'M12 8a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z M8.5 11.5h7 M12 8c-1.5 1.7-1.5 5.3 0 7 M12 8c1.5 1.7 1.5 5.3 0 7',
  '組織':'M12 8.5v3 M9 15v-2.5h6V15 M8 15h2v2H8z M11 7h2v2h-2z M14 15h2v2h-2z',
  '地理':'M12 16s3.5-3.5 3.5-5.5a3.5 3.5 0 1 0-7 0C8.5 12.5 12 16 12 16z M12 9.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
  '国':'M9 17V8 M9 8c2-1.5 4 1.5 7 0v5c-3 1.5-5-1.5-7 0',
  'スキル・能力':'M12 7l1.1 3.3L16.5 11l-3.4 1L12 15.5 10.9 12 7.5 11l3.4-.7z',
  '伏線':'M8 8.5c4-2 7 1 5 3s-5 1-5 3 3 3 7 1 M14 8l2.5 1.5L14 11'
};
function icon(name){
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.classList.add('tree-icon');
  const paths=name==='file'?['M6 2h8l4 4v16H6z M14 2v5h4','M9 11h6 M9 14h6 M9 17h4']:['M2.5 6h6.5l2 2h10.5v11.5h-19z',folderMarks[name]].filter(Boolean);
  for(const data of paths){const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',data);svg.append(path)}return svg;
}
function categoryIcon(name){
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.classList.add('tree-icon','category-icon');
  for(const data of ['M5 3h14v18l-7-4-7 4z',folderMarks[name]]){if(!data)continue;const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',data);svg.append(path)}return svg;
}
function createDialog(kind,folder=''){
  const isFolder=kind==='folder',dialog=document.createElement('dialog');dialog.className='create-dialog';dialog.setAttribute('aria-label',isFolder?'フォルダ作成':'資料作成');
  const heading=document.createElement('h2');heading.textContent=isFolder?'新しいフォルダ':'新しい資料';const form=document.createElement('form');form.noValidate=true;const label=document.createElement('label');label.textContent=isFolder?'フォルダ名':'資料名';const input=document.createElement('input');input.id='create-name';input.required=true;label.htmlFor=input.id;label.append(input);form.append(label);
  let category;if(!isFolder){const categoryLabel=document.createElement('label');categoryLabel.textContent='カテゴリ';category=document.createElement('select');category.id='create-category';categoryLabel.htmlFor=category.id;for(const name of ['人物','世界観','組織','地理']){const option=document.createElement('option');option.textContent=name;category.append(option)}category.value=folder==='登場人物'?'人物':['世界観','組織'].includes(folder)?folder:'世界観';categoryLabel.append(category);form.append(categoryLabel)}
  const error=document.createElement('p');error.className='field-error';error.id='create-error';error.setAttribute('role','alert');input.setAttribute('aria-describedby',error.id);form.append(error);const actions=document.createElement('div');actions.className='dialog-actions';const cancel=button('キャンセル','',()=>dialog.close());const submit=document.createElement('button');submit.type='submit';submit.className='primary';submit.textContent=isFolder?'フォルダを作成':'資料を作成';actions.append(cancel,submit);form.append(actions);dialog.append(heading,form);document.body.append(dialog);
  const cleanup=()=>dialog.remove();dialog.addEventListener('close',cleanup,{once:true});form.addEventListener('submit',event=>{event.preventDefault();const name=input.value.trim();if(!name){error.textContent='名前を入力してください。';input.focus();return}if(/[\\/\x00-\x1f]/.test(name)||name==='.'||name==='..'){error.textContent='名前に /、\\、制御文字、単独の . は使えません。';input.focus();return}if(isFolder){if(state.folders.some(item=>normalized(item)===normalized(name))){error.textContent='同じ名前のフォルダがあります。';input.focus();return}state.folders.push(name);state.folderOpen.add(name);renderWorkspace();dialog.close();return}if(docs.some(doc=>normalized(doc.title)===normalized(name))){error.textContent='同じ名前の資料があります。';input.focus();return}const content=`# ${name}\n\n## 概要\n`;const doc={id:`setting-${crypto.randomUUID()}`,title:name,folder,category:category.value,tags:[],aliases:[],links:[],summary:'',content,saved:content,history:[],status:'active',mode:'copy'};docs.push(doc);state.folderOpen.add(folder);openDoc(doc.id);dialog.close();document.querySelector('.rail-item')?.click()});dialog.showModal();input.focus();
}
$('#new-folder').prepend(icon('folder'));$('#new-folder').addEventListener('click',()=>createDialog('folder'));
const categoryNames=['人物','世界観','組織','地理'];
let nameEdit=null;
function availableTitle(base='新しい資料'){
  let title=base,index=2;
  while(docs.some(doc=>normalized(doc.title)===normalized(title)))title=`${base} ${index++}`;
  return title;
}
function makeDocRow(d,selected,location){
  if(nameEdit?.id!==d.id||nameEdit.location!==location){const row=button(d.title,'doc-row'+(selected?' selected':''),()=>openDoc(d.id));row.prepend(icon('file'));row.dataset.docId=d.id;row.title=`${d.title}（F2で名前を変更）`;return row}
  const form=document.createElement('form');form.className='tree-name-edit';form.dataset.docId=d.id;
  const input=document.createElement('input');input.type='text';input.value=d.title;input.setAttribute('aria-label',`${d.title}の資料名`);input.setAttribute('aria-describedby',`name-error-${d.id}`);
  const error=document.createElement('span');error.id=`name-error-${d.id}`;error.className='tree-name-error';error.setAttribute('role','alert');
  form.append(icon('file'),input,error);
  function finish(commit){if(nameEdit?.id!==d.id)return;if(commit){const title=input.value.trim();if(!title){error.textContent='資料名を入力してください。';input.focus();return}if(/[\\/\x00-\x1f]/.test(title)||title==='.'||title==='..'){error.textContent='使用できない文字が含まれています。';input.focus();return}if(docs.some(item=>item.id!==d.id&&normalized(item.title)===normalized(title))){error.textContent='同じ名前の資料があります。';input.focus();return}d.title=title}else if(nameEdit.created){docs.splice(docs.indexOf(d),1);state.tabs=state.tabs.filter(id=>id!==d.id);state.active=nameEdit.previousActive}else d.title=nameEdit.original;
    nameEdit=null;renderWorkspace();const row=document.querySelector(`.doc-row[data-doc-id="${d.id}"]`);if(row)row.focus();else document.querySelector('.folder-add')?.focus();
  }
  form.addEventListener('submit',event=>{event.preventDefault();finish(true)});
  input.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();finish(false)}});
  return form;
}
function focusNameEdit(){const input=document.querySelector(`.tree-name-edit[data-doc-id="${nameEdit?.id}"] input`);input?.focus();input?.select()}
function renameDoc(id,location='folder'){const doc=byId(id);if(!doc||doc.status!=='active'||nameEdit)return;if(location==='folder')state.folderOpen.add(doc.folder);nameEdit={id,original:doc.title,created:false,location};renderWorkspace();focusNameEdit()}
function createBlankDoc({folder,category,location}){
  if(nameEdit)return;
  const previousActive=state.active,title=availableTitle();
  const doc={id:`setting-${crypto.randomUUID()}`,title,folder,category,tags:[],aliases:[],links:[],summary:'',content:'',saved:'',history:[],status:'active',mode:'copy'};
  docs.push(doc);state.folderOpen.add(folder);state.category=category;state.tabs.push(doc.id);state.active=doc.id;nameEdit={id:doc.id,original:title,created:true,previousActive,location};
  document.querySelector('.rail-item')?.click();renderWorkspace();focusNameEdit();
}
document.addEventListener('keydown',event=>{if(event.key!=='F2'||event.ctrlKey||event.altKey||event.metaKey||nameEdit||document.querySelector('dialog[open]')||$('#workspace').hidden||$('#workspace').classList.contains('dedicated-view'))return;const target=event.target;if(target.closest('input,textarea,select,[contenteditable="true"]'))return;const id=target.closest('[data-doc-id]')?.dataset.docId||state.active;if(byId(id)?.status==='active'){event.preventDefault();renameDoc(id,target.closest('#category-list')?'category':'folder')}});
function openDoc(id){if(!byId(id)||byId(id).status!=='active')return;if(!state.tabs.includes(id))state.tabs.push(id);state.active=id;renderWorkspace()}
function renderWorkspace(){
  const doc=byId(state.active);
  const folders=$('#folder-list');folders.replaceChildren();$('#document-count').textContent=docs.filter(d=>d.status==='active').length+'件';for(const item of docs){if(item.folder&&!state.folders.includes(item.folder))state.folders.push(item.folder)}
  for(const folder of state.folders){
    const group=document.createElement('div');group.className='folder-group';const heading=document.createElement('div');heading.className='folder-heading';const items=docs.filter(d=>d.folder===folder&&d.status==='active');const toggle=button(`${folder}　${items.length}`,'folder-toggle',()=>{state.folderOpen.has(folder)?state.folderOpen.delete(folder):state.folderOpen.add(folder);renderWorkspace()});toggle.prepend(icon(folder));toggle.setAttribute('aria-expanded',String(state.folderOpen.has(folder)));toggle.setAttribute('aria-label',`${folder}フォルダ、${items.length}件`);const add=button('','folder-add',()=>createBlankDoc({folder,category:folder==='登場人物'?'人物':categoryNames.includes(folder)?folder:'世界観',location:'folder'}));add.append(icon('file'));add.setAttribute('aria-label',`${folder}に空の資料を作成`);add.title=`${folder}に空の資料を作成`;heading.append(toggle,add);const box=document.createElement('div');box.className='doc-list';box.hidden=!state.folderOpen.has(folder);if(items.length)box.append(...items.map(d=>makeDocRow(d,d.id===doc?.id,'folder')));else{const empty=document.createElement('p');empty.className='folder-empty';empty.textContent='資料はありません';box.append(empty)}group.append(heading,box);folders.append(group);
  }
  const cats=$('#category-list');cats.replaceChildren(...categoryNames.map(category=>{const group=document.createElement('div');group.className='folder-group';const heading=document.createElement('div');heading.className='category-heading';const items=docs.filter(d=>d.category===category&&d.status==='active');const toggle=button(`${category}　${items.length}`,'category-button'+(state.category===category?' selected':''),()=>{state.category=state.category===category?null:category;renderWorkspace()});toggle.prepend(categoryIcon(category));toggle.setAttribute('aria-expanded',String(state.category===category));toggle.setAttribute('aria-label',`${category}カテゴリ、${items.length}件`);const add=button('','category-add',()=>createBlankDoc({category,folder:category==='人物'?'登場人物':category,location:'category'}));add.append(icon('file'));add.setAttribute('aria-label',`${category}カテゴリに空の資料を作成`);add.title=`${category}カテゴリに空の資料を作成`;heading.append(toggle,add);group.append(heading);if(state.category===category){const box=document.createElement('div');box.className='category-doc-list';box.append(...items.map(d=>makeDocRow(d,d.id===doc?.id,'category')));if(!items.length){const empty=document.createElement('p');empty.className='folder-empty';empty.textContent='資料はありません';box.append(empty)}group.append(box)}return group}));
  const tabs=$('#tabs');tabs.replaceChildren(...state.tabs.filter(id=>byId(id)?.status==='active').map(id=>{const d=byId(id),wrap=document.createElement('div');wrap.className='tab-item';const main=button(d.title+(d.content!==d.saved?' ・未保存':''),'tab-button'+(id===doc?.id?' active':''),()=>openDoc(id));main.title=d.title;main.setAttribute('aria-current',id===doc?.id?'page':'false');const close=button('×','tab-close',()=>closeTab(id));close.setAttribute('aria-label',d.title+'のタブを閉じる');wrap.append(main,close);return wrap}));
  const dedicatedView=document.querySelector('.flow-view')?.hidden===false;
  let empty=$('#workspace-empty');if(!empty){empty=document.createElement('p');empty.id='workspace-empty';empty.className='workspace-empty';$('#main').append(empty);}empty.hidden=!!doc||dedicatedView;empty.textContent='開いている資料はありません。左の資料を選ぶか、取り込みを始めてください。';
  for(const selector of ['.document-head','.toolbar','#editor-grid'])$(selector).hidden=!doc||dedicatedView;
  if(!doc){$('#related-list').replaceChildren();$('#facts').replaceChildren();return;}
  $('#breadcrumb').textContent=doc.folder+' / '+doc.title+'.md';$('#doc-title').textContent=doc.title;$('#doc-meta').textContent=doc.category+'　|　タグ：'+doc.tags.join('、');$('#markdown').value=doc.content;$('#related-context').textContent=doc.title;$('#related-list').replaceChildren(...doc.links.map(byId).filter(d=>d?.status==='active').map(d=>button(d.title+'　›','related-button',()=>openDoc(d.id))));
  $('#facts').replaceChildren();for(const [key,value] of [['カテゴリ',doc.category],['フォルダ',doc.folder],['管理方式',doc.mode==='copy'?'アプリ内コピー':'直接編集の想定']]){const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=key;dd.textContent=value;row.append(dt,dd);$('#facts').append(row);}
  const secondary=$('#secondary-document');if(secondary){secondary.replaceChildren();for(const [id,title] of [['','現在の資料'],...state.tabs.filter(id=>id!==doc.id&&byId(id)?.status==='active').map(id=>[id,byId(id).title])]){const option=document.createElement('option');option.value=id;option.textContent=title;secondary.append(option);}if(state.secondary===doc.id||!byId(state.secondary)||byId(state.secondary).status!=='active')state.secondary=null;secondary.value=state.secondary||'';secondary.hidden=state.mode!=='split';}
  $('#preview').innerHTML=renderMarkdown((byId(state.secondary)||doc).content);
  const label=doc.content===doc.saved?'保存済み':'● 未保存';$('#save-state').textContent=label;if(!$('#workspace').classList.contains('dedicated-view'))$('#footer-state').textContent=`${doc.title}：${label}`;$('#undo').disabled=doc.history.length===0;$('#editor-grid').dataset.mode=state.mode;document.querySelectorAll('[data-mode]').forEach(b=>{if(b.tagName==='BUTTON'){const active=b.dataset.mode===state.mode;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))}});
}
function save(){if($('#workspace').hidden||$('#workspace').classList.contains('dedicated-view'))return;const doc=byId(state.active);if(!doc)return;doc.saved=doc.content;$('#save-state').textContent='保存済み';$('#footer-state').textContent=`${doc.title}：保存済み`;const tab=document.querySelector('.tab-button.active');if(tab)tab.textContent=doc.title}
function closeTab(id){const doc=byId(id);if(doc.content!==doc.saved){state.closing=id;$('#leave-dialog').showModal();$('#leave-cancel').focus();return}finishClose(id)}
function finishClose(id){state.tabs=state.tabs.filter(item=>item!==id);if(state.active===id)state.active=state.tabs.at(-1)||null;if(state.secondary===id)state.secondary=null;renderWorkspace()}
$('#leave-cancel').addEventListener('click',()=>$('#leave-dialog').close());$('#leave-discard').addEventListener('click',()=>{const doc=byId(state.closing);doc.content=doc.saved;doc.history=[];$('#leave-dialog').close();finishClose(state.closing)});$('#leave-save').addEventListener('click',()=>{const doc=byId(state.closing);doc.saved=doc.content;$('#leave-dialog').close();finishClose(state.closing)});
$('#markdown').addEventListener('beforeinput',()=>{const doc=byId(state.active);doc.history.push(doc.content);if(doc.history.length>100)doc.history.shift()});
$('#markdown').addEventListener('input',event=>{const doc=byId(state.active);doc.content=event.target.value;$('#preview').innerHTML=renderMarkdown((byId(state.secondary)||doc).content);const label=doc.content===doc.saved?'保存済み':'● 未保存';$('#save-state').textContent=label;$('#footer-state').textContent=`${doc.title}：${label}`;$('#undo').disabled=doc.history.length===0;document.querySelector('.tab-button.active').textContent=doc.title+(label!=='保存済み'?' ・未保存':'')});
function undo(){const doc=byId(state.active);if(!doc?.history.length)return;doc.content=doc.history.pop();const area=$('#markdown'),position=Math.min(area.selectionStart,doc.content.length);area.value=doc.content;area.focus();area.setSelectionRange(position,position);$('#preview').innerHTML=renderMarkdown((byId(state.secondary)||doc).content);const label=doc.content===doc.saved?'保存済み':'● 未保存';$('#save-state').textContent=label;$('#footer-state').textContent=`${doc.title}：${label}`;$('#undo').disabled=!doc.history.length;document.querySelector('.tab-button.active').textContent=doc.title+(label==='保存済み'?'':' ・未保存')}
$('#undo').addEventListener('click',undo);
$('#save').addEventListener('click',save);document.addEventListener('keydown',event=>{if(event.ctrlKey&&event.key.toLowerCase()==='s'){event.preventDefault();if(!$('#recall-wrap').hidden){if($('#memo')===document.activeElement||featureTabs.querySelector('[data-feature="memo"].active'))saveMemo();else if(!$('#recall-edit').hidden)$('#recall-save').click()}else save()}if(event.ctrlKey&&event.key.toLowerCase()==='z'&&document.activeElement===$('#markdown')){event.preventDefault();undo()}});
document.querySelectorAll('[data-mode]').forEach(b=>{if(b.tagName==='BUTTON')b.addEventListener('click',()=>{state.mode=b.dataset.mode;renderWorkspace()})});
$('#preview').addEventListener('click',event=>{const a=event.target.closest('[data-link]');if(!a)return;event.preventDefault();const d=docs.find(item=>item.title===a.dataset.link);if(d)openDoc(d.id)});
function normalized(value){return value.normalize('NFKC').toLocaleLowerCase('ja-JP')}
function renderRecall(){const q=normalized($('#recall-query').value.trim());const found=docs.filter(d=>d.status==='active'&&normalized([d.title,...d.aliases,...d.tags,d.content].join(' ')).includes(q));$('#recall-count').textContent=found.length+'件';const list=$('#recall-results');list.replaceChildren();if(!found.length){const p=document.createElement('p');p.textContent='一致する資料は0件です。名前や別名を変えて検索してください。';list.append(p);$('.recall-detail').hidden=true;return}if(!found.some(d=>d.id===state.recall))state.recall=found[0].id;for(const doc of found){const b=button(doc.title+'　'+doc.category,'recall-result'+(doc.id===state.recall?' selected':''),()=>{state.recall=doc.id;renderRecall()});b.setAttribute('aria-pressed',String(doc.id===state.recall));list.append(b)}const doc=byId(state.recall);$('.recall-detail').hidden=false;$('#recall-category').textContent=doc.category;$('#recall-title').textContent=doc.title;$('#recall-summary').textContent=doc.summary;$('#recall-extra').innerHTML=renderMarkdown(doc.content);$('#recall-extra').className='preview-body';$('#recall-markdown').value=doc.content;$('#recall-save-state').textContent=doc.content===doc.saved?'保存済み':'未保存';$('#recall-edit').hidden=true;$('#recall-edit-button').setAttribute('aria-expanded','false');$('#recall-memo').hidden=true;$('#recall-memo-button').setAttribute('aria-expanded','false');$('#recall-detail-button').setAttribute('aria-expanded',String(!$('#recall-extra').hidden));showRecallFeature('overview')}
$('#recall-query').addEventListener('input',renderRecall);$('#recall-detail-button').addEventListener('click',()=>{const extra=$('#recall-extra');extra.hidden=!extra.hidden;$('#recall-detail-button').textContent=extra.hidden?'詳細を見る':'概要に戻る';$('#recall-detail-button').setAttribute('aria-expanded',String(!extra.hidden))});$('#recall-memo-button').addEventListener('click',()=>{const memo=$('#recall-memo');memo.hidden=!memo.hidden;$('#recall-memo-button').setAttribute('aria-expanded',String(!memo.hidden));if(!memo.hidden)$('#memo').focus()});
$('#recall-edit-button').addEventListener('click',()=>{const box=$('#recall-edit');box.hidden=!box.hidden;$('#recall-edit-button').setAttribute('aria-expanded',String(!box.hidden));if(!box.hidden)$('#recall-markdown').focus()});
$('#recall-markdown').addEventListener('input',event=>{const doc=byId(state.recall);doc.content=event.target.value;$('#recall-save-state').textContent=doc.content===doc.saved?'保存済み':'未保存';if(state.active===doc.id)renderWorkspace()});
$('#recall-save').addEventListener('click',()=>{const doc=byId(state.recall);doc.saved=doc.content;$('#recall-save-state').textContent='保存済み';if(state.active===doc.id)renderWorkspace()});
$('#memo').addEventListener('input',()=>{$('#memo-state').textContent=$('#memo').value===state.memoSaved?'メモ保存済み':'メモ未保存'});function saveMemo(){state.memoSaved=$('#memo').value;$('#memo-state').textContent='メモ保存済み'}$('#memo-save').addEventListener('click',saveMemo);
const featureTabs=document.createElement('div');featureTabs.className='recall-feature-tabs';featureTabs.setAttribute('aria-label','Quick Recall の表示');const featureContent=document.createElement('section');featureContent.className='recall-feature-content';featureContent.hidden=true;$('#recall-edit-button').after(featureTabs,featureContent);const featureNames=[['overview','概要'],['search','設定検索'],['memo','簡易メモ'],['ruby','ルビ検索・表示・登録'],['import','取り込み'],['storage','保管庫']];for(const [key,name] of featureNames){const b=button(name,'',()=>{});b.addEventListener('click',()=>showRecallFeature(key));b.dataset.feature=key;featureTabs.append(b)}
function showRecallFeature(key){featureTabs.querySelectorAll('button').forEach(b=>{const active=b.dataset.feature===key;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});const overview=key==='overview';$('#recall-summary').hidden=!overview;$('#recall-extra').hidden=overview;$('.recall-actions').hidden=!overview;featureContent.hidden=overview;featureContent.replaceChildren();const doc=byId(state.recall);if(!doc||overview)return;if(key==='search'){featureContent.append(document.createTextNode('上の検索欄でこの作品の設定資料を探せます。検索結果は表示したままです。'));$('#recall-query').focus()}if(key==='memo'){const label=document.createElement('label');label.textContent='選択資料についての簡易メモ';const area=document.createElement('textarea');area.rows=4;area.value=$('#memo').value;area.addEventListener('input',()=>{$('#memo').value=area.value;$('#memo').dispatchEvent(new Event('input'))});label.append(area);featureContent.append(label,button('メモを保存','',()=>saveMemo()),$('#memo-state').cloneNode(true));area.focus()}if(key==='ruby'){const label=document.createElement('label');label.textContent='選択資料のルビを探す';const input=document.createElement('input');input.type='search';input.placeholder='漢字・読み';label.append(input);const format=document.createElement('label');format.textContent='表示形式（検討中）';const select=document.createElement('select');for(const name of ['プレビュー','小説家になろう','カクヨム','アルファポリス']){const o=document.createElement('option');o.textContent=name;select.append(o)}format.append(select);const result=document.createElement('p');const update=()=>{const ruby=[...doc.content.matchAll(/｜([^｜《》\n]+)《([^《》\n]+)》/g)].filter(m=>!input.value||normalized(m[1]+m[2]).includes(normalized(input.value)));result.textContent=ruby.length?ruby.map(m=>`${m[1]}（${m[2]}）`).join('、'):'この資料に一致するルビはありません。';if(select.selectedIndex>0)result.textContent+=' 投稿サイト別の変換規則は未決です。'};input.addEventListener('input',update);select.addEventListener('change',update);featureContent.append(label,format,result);update()}if(key==='import'||key==='storage'){const target=key==='import'?'.rail-item:nth-of-type(3)':'.rail-item:nth-of-type(4)';featureContent.append(document.createTextNode(key==='import'?'サンプル資料の取り込み画面へ移動します。':'保管庫で資料の状態を確認します。'),button(key==='import'?'取り込みを開く':'保管庫を開く','',()=>{hideRecall();if(!$('#recall-wrap').hidden) return;document.querySelector(target)?.click()}))}}
$('#markdown-help').addEventListener('click',()=>{
  const dialog=document.createElement('dialog');dialog.className='help-dialog';dialog.setAttribute('aria-label','記号使用例');
  const heading=document.createElement('h2');heading.textContent='記号使用例';const intro=document.createElement('p');intro.textContent='左をMarkdownに入力すると、右のように表示されます。';const table=document.createElement('div');table.className='syntax-examples';
  const examples=[['見出し','# 登場人物','登場人物'],['強調','**重要な設定**','重要な設定'],['箇条書き','- 魔導学院','・魔導学院'],['引用','> 古い記録','古い記録'],['資料リンク','[[王立魔導学院]]','王立魔導学院（資料リンク）'],['ルビ','｜灰冠《はいかん》','灰冠（はいかん）']];
  for(const [label,source,result] of examples){const row=document.createElement('div');row.className='syntax-row';const name=document.createElement('strong');name.textContent=label;const code=document.createElement('code');code.textContent=source;const output=document.createElement('span');output.textContent=result;row.append(name,code,output);table.append(row)}
  const note=document.createElement('p');note.className='ruby-note';note.textContent='ルビと資料リンクはこのモックアップのプレビュー例です。投稿先別の変換規則は未決です。';const close=button('閉じる','',()=>dialog.close());dialog.append(heading,intro,table,note,close);dialog.addEventListener('close',()=>dialog.remove(),{once:true});document.body.append(dialog);dialog.showModal();close.focus();
});
function showRecall(){if($('#recall-wrap').hidden){$('#recall-wrap').hidden=false;$('#workspace').inert=true;renderRecall();$('#recall-query').focus()}}function hideRecall(){if($('#memo').value!==state.memoSaved&&!confirm('メモ未保存です。閉じると入力内容は失われます。破棄しますか？'))return;if(new URLSearchParams(location.search).has('recall')&&docs.some(doc=>doc.content!==doc.saved)&&!confirm('資料に未保存の変更があります。閉じると入力内容は失われます。破棄しますか？'))return;$('#recall-wrap').hidden=true;$('#workspace').inert=false;if(new URLSearchParams(location.search).has('recall')){window.close();if(!window.closed)location.href='index.html'}else $('#open-recall').focus()}
$('#open-recall').addEventListener('click',()=>{const url=new URL(location.href);url.searchParams.set('recall','1');let popup=null;try{popup=window.open(url.href,'novelLoreQuickRecall','width=420,height=560,resizable=yes')}catch{}if(!popup)showRecall()});$('#recall-min').addEventListener('click',hideRecall);$('#recall-close').addEventListener('click',hideRecall);
const secondarySelect=document.createElement('select');secondarySelect.id='secondary-document';secondarySelect.setAttribute('aria-label','右側に表示する資料');secondarySelect.addEventListener('change',()=>{state.secondary=secondarySelect.value||null;renderWorkspace()});$('.mode-group').after(secondarySelect);
renderWorkspace();if(new URLSearchParams(location.search).has('recall')){document.body.classList.add('recall-only');$('#workspace').hidden=true;showRecall()}else initFlows({docs,byId,state,renderWorkspace,openDoc,save,renderMarkdown,setTheme});
initEnhancements({docs,byId,state,renderWorkspace,renderRecall,featureTabs,featureContent,button});
