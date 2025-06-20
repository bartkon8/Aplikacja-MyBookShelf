package com.example.backend.service;

import com.example.backend.dto.GoogleBookRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.json.JSONObject;

@Service
public class GoogleBooksService {

    private final RestTemplate restTemplate = new RestTemplate();

    public String searchBooks(String query, int maxResults) {
        String url = UriComponentsBuilder
                .fromHttpUrl("https://www.googleapis.com/books/v1/volumes")
                .queryParam("q", query)
                .queryParam("maxResults", maxResults)
                .toUriString();

        return restTemplate.getForObject(url, String.class);
    }

    public GoogleBookRequest getBookDetails(String volumeId) {
        String url = "https://www.googleapis.com/books/v1/volumes/" + volumeId;

        String response = restTemplate.getForObject(url, String.class);
        JSONObject json = new JSONObject(response);
        JSONObject volumeInfo = json.getJSONObject("volumeInfo");

        GoogleBookRequest dto = new GoogleBookRequest();

        dto.setTitle(volumeInfo.optString("title", "Brak tytułu"));

        if (volumeInfo.has("authors")) {
            var authorsArray = volumeInfo.getJSONArray("authors");
            var authors = authorsArray.toList().stream()
                    .map(Object::toString)
                    .toList();
            dto.setAuthors(String.join(", ", authors));
        } else {
            dto.setAuthors("Brak autorów");
        }

        dto.setGoogleBookId(volumeInfo.optString("googleBookId", null));

        if (volumeInfo.has("imageLinks") && volumeInfo.getJSONObject("imageLinks").has("thumbnail")) {
            dto.setThumbnail(volumeInfo.getJSONObject("imageLinks").getString("thumbnail"));
        } else {
            dto.setThumbnail("");
        }

        return dto;
    }
}
