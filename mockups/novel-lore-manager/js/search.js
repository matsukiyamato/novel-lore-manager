export const normalize=value=>String(value).normalize('NFKC').toLocaleLowerCase('ja-JP');

// Aliases are explicit mock data; no reading or ruby inference is attempted.
export function searchDocuments(documents,filters,currentId){
  const query=normalize(filters.query.trim());
  const results=documents.filter(doc=>
    doc.status==='active'&&
    (filters.scope!=='current'||doc.id===currentId)&&
    (!filters.folder||doc.folder===filters.folder)&&
    (!filters.category||doc.category===filters.category)&&
    (!filters.tag||doc.tags.includes(filters.tag))&&
    (!query||normalize([doc.title,...doc.aliases,...doc.tags,doc.content].join(' ')).includes(query))
  );
  if(filters.sort==='name')results.sort((a,b)=>a.title.localeCompare(b.title,'ja'));
  return results;
}
