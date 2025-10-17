package it.back.back_app.book.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import it.back.back_app.book.entity.BookEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookDetailDTO {
    private int bookId;
    private String title;
    private String subTitle;
    private String writer;
    private String publisher;
    private LocalDate pubDate;
    private LocalDateTime createDate;
    private int categoryId;
    private String categoryName;
    private String content;
    private int price;
    private Boolean stockYn;
    private List<BookImageDTO> fileList;

    // Entity → DTO 변환
    public static BookDetailDTO of(BookEntity entity, String baseImageUrl) {
        // 이미지 리스트 변환
        List<BookImageDTO> images = entity.getFileList() != null && !entity.getFileList().isEmpty()
                ? entity.getFileList().stream()
                    .map(img -> BookImageDTO.of(img, baseImageUrl))
                    .toList()
                : List.of(BookImageDTO.builder()
                    .imgId(0)
                    .fileName("default_book.jpg")
                    .storedName("default_book.jpg")
                    .filePath("")
                    .mainYn(true)
                    .imageUrl(baseImageUrl + "default_book.jpg")
                    .createDate(null)
                    .build()
                  );

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
                .fileList(images)
                .build();
    }
}
