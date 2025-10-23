export default function BookCard({ book, onClick }) {
  const { doc } = book;
  const { bookname, authors, isbn13, bookImageURL } = doc;

  const title = cleanTitle(bookname);
  const author = cleanAuthor(authors);

  return (
    <li onClick={() => onClick({ bookname, authors, isbn13, bookImageURL })}>
      <img
        className='w-full h-80 object-cover'
        src={bookImageURL}
        alt={bookname}
      />
      <h1 className='font-semibold line-clamp-1 '>{title}</h1>
      <p className='text-sm opacity-80'>{author}</p>
    </li>
  );
}

function cleanTitle(raw) {
  if (!raw) return '';
  return raw.split(/[::]/)[0].trim();
}

function cleanAuthor(raw) {
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
