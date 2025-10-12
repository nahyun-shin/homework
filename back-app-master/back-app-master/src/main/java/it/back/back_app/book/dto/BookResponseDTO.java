package it.back.back_app.book.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookResponseDTO {
    private int bookId;
    private String publisher;
    private LocalDate pubDate;
    private String title;
    private String subTitle;
    private String writer;
    private String content;
    private int bookQty;
    private int price;
    private int salesCount;        // 판매량
    private Boolean showYn;
    private Boolean stockYn;
    private Boolean bannerYn;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private List<BookImageDTO> fileList;  // 이미지 조회용 DTO
}
