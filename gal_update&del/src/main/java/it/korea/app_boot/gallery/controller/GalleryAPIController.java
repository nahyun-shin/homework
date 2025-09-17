package it.korea.app_boot.gallery.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import it.korea.app_boot.gallery.dto.GalleryDTO;
import it.korea.app_boot.gallery.dto.GalleryRequest;
import it.korea.app_boot.gallery.service.GalleryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class GalleryAPIController {

    private final GalleryService galleryService;

    @GetMapping("/gal")
    public ResponseEntity<Map<String,Object>> getGalleryList(
                 @PageableDefault(page = 0, size = 10, sort = "createDate", direction = Sort.Direction.DESC) 
                 Pageable pageable) throws Exception {
         Map<String, Object> resultMap = galleryService.getGalleryList(pageable);
         return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/gal/{nums}")
    public ResponseEntity<Map<String, Object>> getGalleryById(@PathVariable("nums") String nums) {
        
        Map<String, Object> resultMap = new HashMap<>();
        
        try {
            GalleryDTO gallery = galleryService.getGalleryByNums(nums);
            
            if (gallery != null) {
                resultMap.put("resultCode", 200);
                resultMap.put("message", "조회 성공");
                resultMap.put("data", gallery);
                return ResponseEntity.ok(resultMap);
            } else {
                resultMap.put("resultCode", 404);
                resultMap.put("message", "해당 이미지를 찾을 수 없습니다.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
            }
            
        } catch (Exception e) {
            resultMap.put("resultCode", 500);
            resultMap.put("message", "이미지 조회 중 오류가 발생했습니다.");
            return ResponseEntity.internalServerError().body(resultMap);
        }
    }

    @PostMapping("/gal")
    public ResponseEntity<Map<String, Object>> writeBoard(@Valid @ModelAttribute GalleryRequest request) throws Exception {
        
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            galleryService.addGallery(request);
            resultMap.put("resultCode", 200);
            resultMap.put("resultMessage", "OK");
        } catch (Exception e) {
            //예외 발생 시 공통 모듈을 실행하기 위해 예외를 던진다
            throw new Exception(e.getMessage() == null ? "이미지 등록 실패" : e.getMessage());
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("/gal/{nums}")
public ResponseEntity<Map<String, Object>> updateGallery(
        @PathVariable("nums") String nums,
        @RequestParam("title") String title,
        @RequestParam(value = "file", required = false) MultipartFile file) {

    GalleryRequest request = new GalleryRequest();
    request.setNums(nums);
    request.setTitle(title);
    request.setFile(file);
    request.setWriter("admin"); // 고정값

    Map<String, Object> resultMap = new HashMap<>();

    try {
        galleryService.updateGallery(request);
        resultMap.put("resultCode", 200);
        resultMap.put("message", "이미지가 성공적으로 수정되었습니다.");
        return ResponseEntity.ok(resultMap);
    } catch (Exception e) {
        resultMap.put("resultCode", 500);
        resultMap.put("message", "이미지 수정 중 오류 발생");
        return ResponseEntity.internalServerError().body(resultMap);
    }
}


    @DeleteMapping("/gal")
    public ResponseEntity<Map<String, Object>> deleteGalleryImages(@RequestBody List<String> numsList) {
        
        Map<String, Object> resultMap = new HashMap<>();
        
        try {
            // 빈 배열 체크
            if (numsList == null || numsList.isEmpty()) {
                resultMap.put("resultCode", 400);
                resultMap.put("message", "삭제할 이미지를 선택하세요.");
                return ResponseEntity.badRequest().body(resultMap);
            }
            
            // 서비스에서 삭제 처리
            int deletedCount = galleryService.deleteGalleryImages(numsList);
            
            resultMap.put("resultCode", 200);
            resultMap.put("message", deletedCount + "개의 이미지가 삭제되었습니다.");
            resultMap.put("data", deletedCount);
            
            return ResponseEntity.ok(resultMap);
            
        } catch (IllegalArgumentException e) {
            resultMap.put("resultCode", 400);
            resultMap.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(resultMap);
                    
        } catch (Exception e) {
            resultMap.put("resultCode", 500);
            resultMap.put("message", "이미지 삭제 중 오류가 발생했습니다.");
            return ResponseEntity.internalServerError().body(resultMap);
        }
    }

}