import React from 'react';

interface BookItemProps {
  id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
  onSave: (bookId: string) => void;
}

const BookItem: React.FC<BookItemProps> = ({ id, title, authors, description, thumbnail, onSave }) => {
  return (
    <div className="border p-4 flex h-[260px] overflow-hidden">
      <img src={thumbnail} alt={title} className="w-24 h-32 object-cover mr-4" />
      <div>
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="italic text-sm">{authors.join(', ')}</p>
        <p className="text-sm mt-2 line-clamp-3">{description}</p>
        <button
          onClick={() => onSave(id)}
          className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Zapisz do półki
        </button>
      </div>
    </div>
  );
};

export default BookItem;
