export interface GoogleBook {
  id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
}
interface SaveBookRequest {
  title: string;
  authors: string[];
  thumbnail: string;
  googleBookId: string;
}
export async function searchBooks(query: string): Promise<GoogleBook[]> {
  const maxResults = 40;
  const response = await fetch(`/api/google-books/search?q=${encodeURIComponent(query)}&maxResults=${maxResults}`);
  if (!response.ok) {
    throw new Error('Błąd podczas wyszukiwania książek');
  }
  const data = await response.json();

  const items = data.items || [];
  return items.map((item: any) => ({
    id: item.id,
    title: item.volumeInfo.title || 'Brak tytułu',
    authors: item.volumeInfo.authors || ['Nieznany autor'],
    description: item.volumeInfo.description || '',
    thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
  }));
}

export async function saveBookToShelf(book: SaveBookRequest): Promise<void> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Brak tokenu uwierzytelniającego');
  }

  const body = {
    title: book.title,
    authors: book.authors.join(', '),
    thumbnail: book.thumbnail,
    googleBookId: book.googleBookId,
  };

  const response = await fetch('/api/google-books/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Błąd podczas zapisywania książki');
  }
}
