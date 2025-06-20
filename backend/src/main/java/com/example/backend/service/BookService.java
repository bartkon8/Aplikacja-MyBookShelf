package com.example.backend.service;

import com.example.backend.model.Book;
import com.example.backend.model.User;
import com.example.backend.repository.BookRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public Book addBook(String email, Book book) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));

        Optional<Book> existingBook = bookRepository.findByUserAndGoogleBookId(user, book.getGoogleBookId());
        if (existingBook.isPresent()) {
            throw new RuntimeException("Książka już znajduje się na Twojej półce.");
        }

        book.setUser(user);
        return bookRepository.save(book);
    }

    public List<Book> getBooks(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));
        return bookRepository.findAllByUser(user);
    }

    public void deleteBook(String email, Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono książki"));
        if (!book.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Brak dostępu");
        }
        bookRepository.delete(book);
    }

}
