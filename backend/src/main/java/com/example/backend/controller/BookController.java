package com.example.backend.controller;

import com.example.backend.model.Book;
import com.example.backend.service.BookService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.security.JwtService;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;
    private final JwtService jwtService;

    private String extractUserEmail(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }
        String token = header.substring(7);
        return jwtService.extractEmail(token);
    }

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book, HttpServletRequest request) {
        String email = extractUserEmail(request);
        return ResponseEntity.ok(bookService.addBook(email, book));
    }

    @GetMapping
    public ResponseEntity<List<Book>> getBooks(HttpServletRequest request) {
        String email = extractUserEmail(request);
        return ResponseEntity.ok(bookService.getBooks(email));
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<?> deleteBook(@PathVariable Long bookId, HttpServletRequest request) {
        String email = extractUserEmail(request);
        bookService.deleteBook(email, bookId);
        return ResponseEntity.ok("Usunięto książkę");
    }

}
