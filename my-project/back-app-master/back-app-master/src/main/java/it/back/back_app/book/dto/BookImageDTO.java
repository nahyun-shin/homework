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
    private Boolean mainYn;        // 대표 이미지 여부
    private String imageUrl;       // 이미지 URL
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    // Entity → DTO 변환
    public static BookImageDTO of(BookImageEntity entity, String baseImageUrl) {
        if (entity == null) return null;

        return BookImageDTO.builder()
                .imgId(entity.getImgId())
                .fileName(entity.getFileName())
                .storedName(entity.getStoredName())
                .filePath(entity.getFilePath())
                .mainYn(entity.getMainYn())
                .imageUrl(baseImageUrl + entity.getStoredName()) // baseUrl + 저장된 이름
                .createDate(entity.getCreateDate())
                .updateDate(entity.getUpdateDate())
                .build();
    }
}
