import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainPage from '../pages/SearchPage';
import * as BookService from '../BookService';
import '@testing-library/jest-dom';

jest.mock('../BookService');

describe('MainPage', () => {
  it('wyszukuje i wyświetla książki po kliknięciu przycisku', async () => {
    const mockedSearchBooks = BookService.searchBooks as jest.Mock;

    mockedSearchBooks.mockResolvedValue([
      {
        id: '1',
        title: 'Testowa książka',
        authors: ['Autor Testowy'],
        description: 'Opis testowej książki',
        thumbnail: 'http://example.com/image.jpg',
      },
    ]);

    render(<MainPage />);

    const input = screen.getByPlaceholderText('Wpisz tytuł książki...');
    fireEvent.change(input, { target: { value: 'harry potter' } });

    const button = screen.getByText('Szukaj');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Testowa książka')).toBeInTheDocument();
      expect(screen.getByText('Autor Testowy')).toBeInTheDocument();
      expect(screen.getByText('Opis testowej książki')).toBeInTheDocument();
    });
  });
});
