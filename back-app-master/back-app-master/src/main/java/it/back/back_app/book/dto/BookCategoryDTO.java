package it.back.back_app.book.dto;

import java.time.LocalDate;
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
    private int categoryId;       // int로 변경
    private String categoryName;  // 카테고리 이름 추가
    private String content;
    private int price;
    private Boolean stockYn;
    private List<BookImageDTO> fileList;

    // Entity → DTO 변환
    public static BookCategoryDTO of(BookEntity entity) {
    List<BookImageDTO> fileList =
            entity.getFileList().stream()
                    .map(BookImageDTO::of)
                    .toList();

    return BookCategoryDTO.builder()
            .bookId(entity.getBookId())
            .title(entity.getTitle())
            .writer(entity.getWriter())
            .publisher(entity.getPublisher())
            .pubDate(entity.getPubDate())
            .categoryId(entity.getCategory() != null ? entity.getCategory().getCategoryId() : 0)
            .categoryName(entity.getCategory() != null ? entity.getCategory().getCategoryName() : null)
            .content(entity.getContent())
            .price(entity.getPrice())
            .stockYn("Y".equalsIgnoreCase(entity.getStockYn()))
            .fileList(fileList)
            .build();
}

}

