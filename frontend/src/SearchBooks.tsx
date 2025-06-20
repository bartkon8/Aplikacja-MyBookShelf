import { useState } from 'react';

interface Book {
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  thumbnail?: string;
}

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/google-books/search?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error(`Błąd sieci: ${response.statusText}`);
      }

      const data = await response.json();
      const parsedBooks = data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail,
      }));

      setBooks(parsedBooks);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Szukaj książek"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Szukam...' : 'Szukaj'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong>
            {book.authors && <em> — {book.authors.join(', ')}</em>}
            {book.thumbnail && <div><img src={book.thumbnail} alt={book.title} /></div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBooks;
