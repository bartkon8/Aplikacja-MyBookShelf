package com.example.backend.repository;

import com.example.backend.model.Book;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findAllByUser(User user);

    Optional<Book> findByUserAndGoogleBookId(User user, String googleBookId);
}
