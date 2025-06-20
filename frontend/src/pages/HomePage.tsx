import React from 'react';
import { useAuth } from '../AuthContext';

const HomePage: React.FC = () => {
   const { isAuthenticated } = useAuth();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Witaj w My Bookshelf App!</h1>
      <p className="text-gray-600">
        {isAuthenticated
          ? 'Przejdź do wyszukiwarki lub zarządzaj swoją kolekcją książek.'
          : 'Zaloguj się lub zarejestruj, aby zarządzać swoją kolekcją książek.'}
      </p>
    </div>
  );
};

export default HomePage;
