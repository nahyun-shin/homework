package it.back.back_app.book.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.Data;

@Data
public class BookRequestDTO {
    private String publisher;
    private LocalDate pubDate;
    private String title;
    private String subTitle;
    private String writer;
    private String content;
    private int bookQty;
    private int price;
    private int salesCount;        // 판매량
    private Boolean showYn; // 'Y'/'N' 대신 boolean으로 받을 수도 있음
    private Boolean stockYn;
    private Boolean bannerYn;
    private List<BookImageRequestDTO> fileList;  // 이미지 업로드용 DTO
}
