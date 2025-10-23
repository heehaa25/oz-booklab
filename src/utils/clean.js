export function cleanTitle(raw) {
  if (!raw) return '';
  return raw.split(/[::]/)[0].trim();
}

export function cleanAuthor(raw) {
  if (!raw) return '';

  let s = raw
    .replace(/\(.*?\)/g, '')
    .replace(/[“”"『』【】\[\]]/g, '')
    .trim();

  const patterns = [
    /지은이\s*[::]\s*([^\s,·/|]+(?:\s+[^\s,·/|]+)?)/,
    /글\s*[::]\s*([^\s,·/|]+(?:\s+[^\s,·/|]+)?)/,
    /^([^\s,·/|]+(?:\s+[^\s,·/|]+)?)\s*(?:지음|글|저|엮음|편|옮김)\s*$/,
  ];

  for (const re of patterns) {
    const m = s.match(re);
    if (m) return m[1].trim();
  }

  let first = s.split(/[,·/|]/)[0].trim();

  first = first.replace(/\s*(?:지음|글|저|엮음|편|옮김)\s*$/, '').trim();

  return first;
}
