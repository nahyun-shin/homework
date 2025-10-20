package it.back.back_app.book.dto;

import it.back.back_app.book.entity.BookEntity;
import it.back.back_app.book.entity.BookImageEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class BookMainDTO {

    @EqualsAndHashCode.Include
    private int bookId;
    private String publisher;
    private String title;
    private String subTitle;
    private String content;
    private int price;
    private String mainImageUrl;
    private int categoryId;

     public static BookMainDTO of(BookEntity entity, String baseImageUrl) {
        String mainImage = entity.getFileList().stream()
                .filter(BookImageEntity::getMainYn)
                .findFirst()
                .map(img -> baseImageUrl + img.getStoredName())
                .orElse(baseImageUrl + "default_book.jpg");

        return BookMainDTO.builder()
                .bookId(entity.getBookId())
                .publisher(entity.getPublisher())
                .title(entity.getTitle())
                .subTitle(entity.getSubTitle())
                .content(entity.getContent())
                .price(entity.getPrice())
                .categoryId(entity.getCategory().getCategoryId())
                .mainImageUrl(mainImage)
                .build();
    }
}
