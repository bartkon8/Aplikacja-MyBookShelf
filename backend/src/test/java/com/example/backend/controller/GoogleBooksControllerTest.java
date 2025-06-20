package com.example.backend.controller;

import com.example.backend.service.GoogleBooksService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class GoogleBooksControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GoogleBooksService googleBooksService;

    @Test
    void searchBooks_returnsBooksJson() throws Exception {
        String mockResponse = "{ \"items\": [ { \"id\": \"1\", \"volumeInfo\": { \"title\": \"Test Book\" } } ] }";

        when(googleBooksService.searchBooks("test", 40)).thenReturn(mockResponse);

        mockMvc.perform(get("/api/google-books/search")
                .param("q", "test")
                .param("maxResults", "40"))
                .andExpect(status().isOk())
                .andExpect(content().json(mockResponse));
    }
}
