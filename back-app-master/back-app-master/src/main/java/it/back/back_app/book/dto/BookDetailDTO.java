// package it.back.back_app.book.dto;

// import java.time.LocalDate;
// import java.time.LocalDateTime;
// import java.util.List;

// import it.back.back_app.book.entity.BookEntity;

// public class BookDetailDTO {
// private int bookId;
//     private String title;
//     private String writer;
//     private String publisher;
//     private LocalDate pubDate;
//     private LocalDateTime createDate;
//     private int categoryId;       // int로 변경
//     private String categoryName;  // 카테고리 이름 추가
//     private String content;
//     private int price;
//     private Boolean stockYn;
//     private List<BookImageDTO> fileList;

//     // Entity → DTO 변환
//     public static BookCategoryDTO of(BookEntity entity, String baseImageUrl) {
//     List<BookImageDTO> fileList =
//             entity.getFileList().stream()
//                     .map(file -> BookImageDTO.of(file, baseImageUrl))
//                     .toList();

//     return BookCategoryDTO.builder()
//             .bookId(entity.getBookId())
//             .title(entity.getTitle())
//             .writer(entity.getWriter())
//             .publisher(entity.getPublisher())
//             .pubDate(entity.getPubDate())
//             .createDate(entity.getCreateDate())
//             .categoryId(entity.getCategory() != null ? entity.getCategory().getCategoryId() : 0)
//             .categoryName(entity.getCategory() != null ? entity.getCategory().getCategoryName() : null)
//             .content(entity.getContent())
//             .price(entity.getPrice())
//             .stockYn("Y".equalsIgnoreCase(entity.getStockYn()))
//             .fileList(fileList)
//             .build();
// }
// }
