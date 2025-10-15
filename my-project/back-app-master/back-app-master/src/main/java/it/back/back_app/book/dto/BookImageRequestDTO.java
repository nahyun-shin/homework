package it.back.back_app.book.dto;

import lombok.Data;

@Data
public class BookImageRequestDTO {
    private String fileName;
    private String storedName;
    private String filePath;
    private Boolean mainYn;
}
