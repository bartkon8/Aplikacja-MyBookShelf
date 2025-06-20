import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
    id: number;
    title: string;
    authors: string;
    thumbnail: string;
    googleBookId: string;
}

const MyShelfPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = async () => {
        const token = localStorage.getItem('token');
        if (!token) return setError('Nie jesteś zalogowany');

        try {
            const response = await axios.get<Book[]>('/api/books', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBooks(response.data);
        } catch (e: any) {
            setError('Błąd podczas pobierania książek');
        }
    };

    const handleDelete = async (bookId: number) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.delete(`/api/books/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBooks(prev => prev.filter(book => book.id !== bookId));
        } catch (e) {
            alert('Błąd podczas usuwania książki');
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Moja półka</h1>
            {error && <p className="text-red-500">{error}</p>}
            {books.length === 0 && !error && <p>Brak zapisanych książek.</p>}
            <div className="space-y-4">
                {books.map(book => (
                    <div key={book.id} className="flex border p-4 items-center">
                        <img src={book.thumbnail} alt={book.title} className="w-20 h-28 mr-4 object-cover" />
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{book.title}</h2>
                            <p className="text-sm italic">{book.authors}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(book.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Usuń
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyShelfPage;
