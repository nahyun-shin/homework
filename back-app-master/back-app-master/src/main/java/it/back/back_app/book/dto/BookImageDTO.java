package it.back.back_app.book.dto;

import java.time.LocalDateTime;

import it.back.back_app.book.entity.BookImageEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookImageDTO {
    private int imgId;             // 이미지 ID
    private String fileName;       // 원본 파일명
    private String storedName;     // 저장 파일명
    private String filePath;       // 파일 경로
    private Boolean mainYn;         // 대표 이미지 여부
    private LocalDateTime createDate;

    public static BookImageDTO of(BookImageEntity entity){
        return BookImageDTO.builder()
                .imgId(entity.getImgId())
                .fileName(entity.getFileName())
                .storedName(entity.getStoredName())
                .filePath(entity.getFilePath())
                .mainYn(entity.getMainYn())
                .createDate(entity.getCreateDate())
                .build();
    }
    
}
