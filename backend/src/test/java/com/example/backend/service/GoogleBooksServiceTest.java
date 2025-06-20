package com.example.backend.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class GoogleBooksServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private GoogleBooksService googleBooksService;

    @Test
    void searchBooks_shouldReturnJsonFromApi() {
        // Arrange
        RestTemplate mockRestTemplate = mock(RestTemplate.class);
        GoogleBooksService googleBooksService = new GoogleBooksService() {
            private final RestTemplate restTemplate = mockRestTemplate;

            @Override
            public String searchBooks(String query, int maxResults) {
                String url = UriComponentsBuilder
                        .fromHttpUrl("https://www.googleapis.com/books/v1/volumes")
                        .queryParam("q", query)
                        .queryParam("maxResults", maxResults)
                        .toUriString();

                return restTemplate.getForObject(url, String.class);
            }
        };

        String sampleJson = "{\"items\": [{\"id\": \"123\", \"volumeInfo\": {\"title\": \"Book Title\"}}]}";
        when(mockRestTemplate.getForObject(anyString(), eq(String.class))).thenReturn(sampleJson);

        String result = googleBooksService.searchBooks("harry potter", 40);

        assertNotNull(result);
        assertTrue(result.contains("Book Title"));
    }

}
