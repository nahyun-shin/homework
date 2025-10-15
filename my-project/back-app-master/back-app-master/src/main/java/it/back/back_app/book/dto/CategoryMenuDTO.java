package it.back.back_app.book.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryMenuDTO {
    private Integer categoryId;
    private String categoryName;
}
