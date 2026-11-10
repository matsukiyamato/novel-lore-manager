const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function inline(text){
  const pieces=[];let cursor=0;
  const pattern=/\[\[([^\]]+)\]\]|｜([^｜《》\n]+)《([^《》\n]+)》|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  for(const match of text.matchAll(pattern)){
    pieces.push(escapeHtml(text.slice(cursor,match.index)));
    if(match[1])pieces.push(`<a href="#" data-link="${escapeHtml(match[1])}">${escapeHtml(match[1])}</a>`);
    else if(match[2])pieces.push(`<ruby>${escapeHtml(match[2])}<rt>${escapeHtml(match[3])}</rt></ruby>`);
    else if(match[4])pieces.push(`<a href="${escapeHtml(match[5])}" target="_blank" rel="noopener noreferrer">${escapeHtml(match[4])}</a>`);
    else if(match[6])pieces.push(`<code>${escapeHtml(match[6])}</code>`);
    else if(match[7])pieces.push(`<strong>${escapeHtml(match[7])}</strong>`);
    else pieces.push(`<em>${escapeHtml(match[8])}</em>`);
    cursor=match.index+match[0].length;
  }
  pieces.push(escapeHtml(text.slice(cursor)));
  return pieces.join('');
}

// Fixed safe tags only. Ruby notation is a preview-only mock convention, not a decided storage format.
export function renderMarkdown(source){
  let html='',list='',quote=false;
  const close=()=>{if(list){html+=`</${list}>`;list=''}if(quote){html+='</blockquote>';quote=false}};
  for(const raw of String(source).split('\n')){
    const line=raw.trim();if(!line){close();continue}
    const heading=line.match(/^(#{1,6})\s+(.+)$/);
    if(heading){close();html+=`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`}
    else if(/^(-{3,}|\*{3,})$/.test(line)){close();html+='<hr>'}
    else if(line.startsWith('> ')){if(!quote){close();html+='<blockquote>';quote=true}html+='<p>'+inline(line.slice(2))+'</p>'}
    else if(/^[-*+]\s+/.test(line)){if(list!=='ul'){close();html+='<ul>';list='ul'}html+='<li>'+inline(line.slice(2))+'</li>'}
    else if(/^\d+\.\s+/.test(line)){if(list!=='ol'){close();html+='<ol>';list='ol'}html+='<li>'+inline(line.replace(/^\d+\.\s+/,''))+'</li>'}
    else{close();html+='<p>'+inline(line)+'</p>'}
  }
  close();return html;
}
