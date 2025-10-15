package it.back.back_app.book.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import it.back.back_app.book.entity.BookEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDetailDTO {
private int bookId;
    private String title;
    private String subTitle;
    private String writer;
    private String publisher;
    private LocalDate pubDate;
    private LocalDateTime createDate;
    private int categoryId;       // int로 변경
    private String categoryName;  // 카테고리 이름 추가
    private String content;
    private int price;
    private Boolean stockYn;
    private List<BookImageDTO> fileList;

    // Entity → DTO 변환
    public static BookDetailDTO of(BookEntity entity, String baseImageUrl) {
    List<BookImageDTO> fileList =
            entity.getFileList().stream()
                    .map(file -> BookImageDTO.of(file, baseImageUrl))
                    .toList();

                    // 이미지가 없으면 기본 이미지 추가
    if (fileList.isEmpty()) {
    fileList = List.of(new BookImageDTO(
        0,                        // imgId (아무 값 넣어도 됨)
        "default_book.jpg",       // fileName (선택)
        "default_book.jpg",       // storedName (선택)
        "",                       // filePath (선택)
        true,                     // mainYn
        baseImageUrl + "default_book.jpg", // imageUrl <- 꼭 필요
        null                      // createDate (선택)
    ));
};

    return BookDetailDTO.builder()
            .bookId(entity.getBookId())
            .title(entity.getTitle())
            .subTitle(entity.getSubTitle())
            .writer(entity.getWriter())
            .publisher(entity.getPublisher())
            .pubDate(entity.getPubDate())
            .createDate(entity.getCreateDate())
            .categoryId(entity.getCategory() != null ? entity.getCategory().getCategoryId() : 0)
            .categoryName(entity.getCategory() != null ? entity.getCategory().getCategoryName() : null)
            .content(entity.getContent())
            .price(entity.getPrice())
            .stockYn("Y".equalsIgnoreCase(entity.getStockYn()))
            .fileList(fileList)
            .build();
}
}
