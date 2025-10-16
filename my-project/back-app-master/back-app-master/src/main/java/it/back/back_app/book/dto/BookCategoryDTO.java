package it.back.back_app.book.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


import it.back.back_app.book.entity.BookEntity;
import it.back.back_app.book.entity.BookImageEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookCategoryDTO {

    private int bookId;
    private String title;
    private String writer;
    private String publisher;
    private LocalDate pubDate;
    private LocalDateTime createDate;
    private int categoryId;       // int로 변경
    private String categoryName;  // 카테고리 이름 추가
    private String content;
    private int salesCount;
    private int price;
    private Boolean stockYn;
    private String mainImageUrl;

    // Entity → DTO 변환
    public static BookCategoryDTO of(BookEntity entity, String baseImageUrl) {
        
        //대표 이미지DTO를 찾아서 URL 생성
     String mainImage = entity.getFileList().stream()
        .filter(BookImageEntity::getMainYn)
        .findFirst()
        .map(img -> baseImageUrl + img.getStoredName())
        .orElse(baseImageUrl + "default_book.jpg");   

    return BookCategoryDTO.builder()
            .bookId(entity.getBookId())
            .title(entity.getTitle())
            .writer(entity.getWriter())
            .publisher(entity.getPublisher())
            .pubDate(entity.getPubDate())
            .createDate(entity.getCreateDate())
            .categoryId(entity.getCategory() != null ? entity.getCategory().getCategoryId() : 0)
            .categoryName(entity.getCategory() != null ? entity.getCategory().getCategoryName() : null)
            .content(entity.getContent())
            .salesCount(entity.getSalesCount())
            .price(entity.getPrice())
            .stockYn("Y".equalsIgnoreCase(entity.getStockYn()))
            .mainImageUrl(mainImage)
            .build();
}

}

