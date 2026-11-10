import {strict as assert} from 'node:assert';
import {readFileSync,existsSync} from 'node:fs';
import {renderMarkdown} from '../js/markdown.js';
import {searchDocuments} from '../js/search.js';
import {rubyNotation,RUBY_SITES} from '../js/ruby.js';

const docs=[
  {id:'a',title:'エレナ',aliases:['灰の記録者','えれな'],tags:['魔導'],folder:'登場人物',category:'人物',content:'王立魔導学院の記録官',status:'active'},
  {id:'b',title:'魔法体系',aliases:[],tags:['魔導'],folder:'世界観',category:'世界観',content:'術式の資料',status:'active'},
  {id:'c',title:'旧資料',aliases:[],tags:[],folder:'世界観',category:'世界観',content:'保管済み',status:'trashed'}
];
const filters={query:'',scope:'all',folder:'',category:'',tag:'',sort:'relevance'};
assert.equal(searchDocuments(docs,filters,'a').length,2);
assert.deepEqual(searchDocuments(docs,{...filters,query:'えれな'},'b').map(doc=>doc.id),['a']);
assert.deepEqual(searchDocuments(docs,{...filters,query:'灰の記録者'},'b').map(doc=>doc.id),['a']);
assert.equal(searchDocuments(docs,{...filters,query:'存在しない'},'a').length,0);
assert.deepEqual(searchDocuments(docs,{...filters,scope:'current',query:'魔導'},'a').map(doc=>doc.id),['a']);
assert.deepEqual(searchDocuments(docs,{...filters,category:'世界観'},'a').map(doc=>doc.id),['b']);
assert.equal(searchDocuments(docs,{...filters,query:'旧資料'},'a').length,0);

const html=renderMarkdown('# 見出し\n<script>alert(1)</script>\n<img src=x onerror=alert(1)>\n[[" onmouseover=alert(1)]]');
assert(html.includes('<h1>見出し</h1>'));
assert(html.includes('&lt;script&gt;'));
assert(!html.includes('<script'));
assert(!html.includes('<img'));
assert(!html.includes('onmouseover="'));
assert(html.includes('data-link="&quot;'));
assert.equal(RUBY_SITES.length,3);
assert.equal(rubyNotation('灰冠','はいかん','カクヨム'),'｜灰冠《はいかん》');
assert.equal(rubyNotation('灰冠','はいかん','小説家になろう'),'|灰冠《はいかん》');

const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');
assert(index.includes('js/theme-manager.js'));
assert(index.includes('css/flows.css'));
for(const theme of ['forest-workbench','storybook-atelier','quiet-lore-studio'])assert(existsSync(new URL(`../css/themes/${theme}.css`,import.meta.url)));
console.log('Search, Markdown safety, and shared-theme asset checks passed.');
