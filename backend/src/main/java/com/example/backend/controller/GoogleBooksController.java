package com.example.backend.controller;

import com.example.backend.dto.GoogleBookRequest;
import com.example.backend.model.Book;
import com.example.backend.security.JwtService;
import com.example.backend.service.BookService;
import com.example.backend.service.GoogleBooksService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/google-books")
public class GoogleBooksController {

    private final GoogleBooksService googleBooksService;
    private final JwtService jwtService;
    private final BookService bookService;

    public GoogleBooksController(GoogleBooksService googleBooksService,
            JwtService jwtService,
            BookService bookService) {
        this.googleBooksService = googleBooksService;
        this.jwtService = jwtService;
        this.bookService = bookService;
    }

    @GetMapping("/search")
    public ResponseEntity<String> searchBooks(
            @RequestParam("q") String query,
            @RequestParam(value = "maxResults", defaultValue = "40") int maxResults) {

        String jsonResult = googleBooksService.searchBooks(query, maxResults);
        return ResponseEntity.ok(jsonResult);
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveBookToShelf(
            @RequestBody GoogleBookRequest bookRequest,
            @RequestHeader("Authorization") String authHeader) {
        try {
            String jwt = authHeader.substring(7);
            String userEmail = jwtService.extractEmail(jwt);

            Book book = new Book();
            book.setTitle(bookRequest.getTitle());
            book.setAuthors(bookRequest.getAuthors());
            book.setThumbnail(bookRequest.getThumbnail());
            book.setGoogleBookId(bookRequest.getGoogleBookId());

            Book savedBook = bookService.addBook(userEmail, book);
            return ResponseEntity.ok(savedBook);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
