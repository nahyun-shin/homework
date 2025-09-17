package it.korea.app_boot.gallery.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GalleryRequest {
    // 수정 시 사용할 식별자 (등록 시에는 null)
    private String nums;
    @NotBlank(message = "타이틀은 존재해야 합니다.")
    private String title;
    
    private MultipartFile file;
    // writer는 현재 "admin"으로 고정되어 있지만, 나중에 확장 가능
    private String writer;
}
