package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoogleBookRequest {
    private String title;
    private String authors;
    private String googleBookId;
    private String thumbnail;
}
