package it.back.back_app.book.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import it.back.back_app.book.entity.BookEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookResponseDTO {
    private int bookId;
    private String publisher;
    private LocalDate pubDate;
    private int categoryId;
    private String categoryName;
    private String title;
    private String subTitle;
    private String writer;
    private String content;
    private int bookQty;
    private int price;
    private int salesCount;
    private Boolean showYn;
    private Boolean stockYn;
    private Boolean bannerYn;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateDate;
    private List<BookImageDTO> fileList;

    public static BookResponseDTO of(BookEntity entity, String baseImageUrl) {
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

        return BookResponseDTO.builder()
                .bookId(entity.getBookId())
                .publisher(entity.getPublisher())
                .pubDate(entity.getPubDate())
                .categoryId(entity.getCategory() != null ? entity.getCategory().getCategoryId() : 0)
                .categoryName(entity.getCategory() != null ? entity.getCategory().getCategoryName() : null)
                .title(entity.getTitle())
                .subTitle(entity.getSubTitle())
                .writer(entity.getWriter())
                .content(entity.getContent())
                .bookQty(entity.getBookQty())
                .price(entity.getPrice())
                .salesCount(entity.getSalesCount())
                .showYn("Y".equalsIgnoreCase(entity.getShowYn()))
                .stockYn("Y".equalsIgnoreCase(entity.getStockYn()))
                .bannerYn("Y".equalsIgnoreCase(entity.getBannerYn()))
                .createDate(entity.getCreateDate())
                .updateDate(entity.getUpdateDate())
                .fileList(images)
                .build();
    }
}
