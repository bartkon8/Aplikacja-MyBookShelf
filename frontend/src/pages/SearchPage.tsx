import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import BookItem from '../BookItem';
import { GoogleBook, searchBooks, saveBookToShelf } from '../BookService';


const MainPage = () => {
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [listHeight, setListHeight] = useState(window.innerHeight - 150);

  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight - 150);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleSearch = async () => {
    try {
      const results = await searchBooks(query);
      setBooks(results);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleSave = async (id: string) => {
    const bookToSave = books.find(b => b.id === id);
    if (!bookToSave) return alert('Nie znaleziono książki');

    try {
      await saveBookToShelf({
        title: bookToSave.title,
        authors: bookToSave.authors,
        thumbnail: bookToSave.thumbnail,
        googleBookId: bookToSave.id,
      });
      alert('Książka zapisana do Twojej półki!');
    } catch (e: any) {
      if (e.message.includes('już znajduje się na Twojej półce')) {
        alert('Ta książka została już dodana wcześniej.');
      } else {
        alert(e.message);
      }
    }
  };

  return (
    <div className="p-4 flex flex-col h-screen">
      <h1 className="text-2xl font-bold mb-4">My Bookshelf App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Wpisz tytuł książki..."
          className="border p-2 mr-2 flex-grow"
        />
        <button onClick={handleSearch} className="bg-green-500 text-white px-4 py-2 rounded">
          Szukaj
        </button>
      </div>


      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="flex-grow">
        <List
          height={listHeight}
          itemCount={books.length}
          itemSize={260}
          width={'100%'}
        >
          {({ index, style }) => {
            const book = books[index];
            return (
              <div style={style}>
                <BookItem {...book} onSave={handleSave} />
              </div>
            );
          }}
        </List>
      </div>

    </div>
  );
};

export default MainPage;
