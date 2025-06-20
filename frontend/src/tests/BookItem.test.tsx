import { render, screen, fireEvent } from '@testing-library/react';
import BookItem from '../BookItem';


const mockBook = {
  id: '123',
  title: 'Testowa książka',
  authors: ['Autor Jeden'],
  description: 'Opis książki testowej',
  thumbnail: 'https://placehold.co/100x150',
};

describe('BookItem', () => {
  test('renders book information', () => {
    render(<BookItem {...mockBook} onSave={() => {}} />);
    expect(screen.getByText('Testowa książka')).toBeInTheDocument();
    expect(screen.getByText('Autor Jeden')).toBeInTheDocument();
    expect(screen.getByText('Opis książki testowej')).toBeInTheDocument();
  });

  test('calls onSave when button is clicked', () => {
    const mockSave = jest.fn();
    render(<BookItem {...mockBook} onSave={mockSave} />);
    fireEvent.click(screen.getByText(/zapisz/i));
    expect(mockSave).toHaveBeenCalledWith('123');
  });
});
