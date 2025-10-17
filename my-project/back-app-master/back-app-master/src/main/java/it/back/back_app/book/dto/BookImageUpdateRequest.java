package it.back.back_app.book.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookImageUpdateRequest {
private Integer bookId;
    private List<BookImageUpdateDTO> images;
}
