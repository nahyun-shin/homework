package it.back.back_app.book.dto;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookRequestDTO {

    private String publisher;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate pubDate;
    private int categoryId;
    private String title;
    private String subTitle;
    private String writer;
    private String content;
    private Integer bookQty;
    private int price;

    private Boolean showYn;      // 표시여부
    private Boolean stockYn;     // 품절여부
    private Boolean bannerYn;    // 배너 여부

    // --------------------------
    // 이미지 관련
    // --------------------------
    private List<MultipartFile> files;       // 실제 업로드 파일
    private List<Boolean> mainImageFlags;    // 각 파일별 대표 이미지 여부
}
