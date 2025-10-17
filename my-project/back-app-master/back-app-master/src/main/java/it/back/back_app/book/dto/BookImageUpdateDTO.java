package it.back.back_app.book.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookImageUpdateDTO {
private Integer imgId; 
private Boolean mainYn;
}
