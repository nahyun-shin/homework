package it.korea.app_boot.gallery.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.korea.app_boot.common.dto.PageVO;
import it.korea.app_boot.common.files.FileUtils;
import it.korea.app_boot.gallery.dto.GalleryDTO;
import it.korea.app_boot.gallery.dto.GalleryRequest;
import it.korea.app_boot.gallery.entity.GalleryEntity;
import it.korea.app_boot.gallery.repository.GalleryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GalleryService {
    
    @Value("${server.file.gallery.path}")
    private String filePath;
    
    private final GalleryRepository galleryRepository;
    private final FileUtils fileUtils;
    private List<String> extentions =
            Arrays.asList("jpg","jpeg","gif","png","webp","bmp");

    public Map<String, Object> getGalleryList(Pageable pageable) throws Exception{
        
        Map<String, Object> resultMap = new HashMap<>();
        
        Page<GalleryEntity> list = galleryRepository.findAll(pageable);
        List<GalleryDTO> gallerys =
                list.getContent().stream().map(GalleryDTO::of).toList();
        
        PageVO pageVO = new PageVO();
        pageVO.setData(list.getNumber(), (int)list.getTotalElements());
        
        resultMap.put("total", list.getTotalElements());
        resultMap.put("page", list.getNumber());
        resultMap.put("content", gallerys);
        resultMap.put("pageHTML", pageVO.pageHTML());
        
        return resultMap;
    }

    public void addGallery(GalleryRequest request) throws Exception{
        
        String fileName = request.getFile().getOriginalFilename();
        String ext = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
        if(!extentions.contains(ext)){
            throw new RuntimeException("파일형식이 맞지 않습니다. 이미지만 가능합니다.");
        }
        
        Map<String,Object> fileMap = fileUtils.uploadFiles(request.getFile(), filePath);
        
        if(fileMap==null){
            throw new RuntimeException("파일업로드에 실패하였습니다.");
        }
        
        String thumbFilePath = filePath +"thumb"+File.separator;
        String storedFilePath = filePath + fileMap.get("storedFileName").toString();
        
        File file = new File(storedFilePath);
        if(!file.exists()){
            throw new RuntimeException("업로드 파일이 존재하지 않습니다.");
        }
        
        String thumbName = fileUtils.thumbNailFile(150,150,file, thumbFilePath);
        
        String newNums = UUID.randomUUID().toString().replaceAll("-", "").substring(0,10);
        
        GalleryEntity entity = new GalleryEntity();
        entity.setNums(newNums);
        entity.setTitle(request.getTitle());
        entity.setWriter("admin");
        entity.setFileName(fileMap.get("fileName").toString());
        entity.setStoredName(fileMap.get("storedFileName").toString());
        entity.setFilePath(filePath);
        entity.setFileThumbName(thumbName);
        
        galleryRepository.save(entity);
    }
    
    /**
     * nums로 단일 갤러리 조회
     */
    public GalleryDTO getGalleryByNums(String nums) throws Exception {
        GalleryEntity entity = galleryRepository.findById(nums).orElse(null);
        
        if (entity == null) {
            return null;
        }
        
        return GalleryDTO.of(entity);
    }
    
    /**
     * 갤러리 수정
     */
    @Transactional
    public void updateGallery(GalleryRequest request) throws Exception {
        
        // 기존 엔티티 조회
        GalleryEntity existingEntity = galleryRepository.findById(request.getNums())
            .orElseThrow(() -> new IllegalArgumentException("수정할 이미지를 찾을 수 없습니다."));
        
        // 기본 정보 업데이트
        existingEntity.setTitle(request.getTitle());
        existingEntity.setWriter(request.getWriter());
        
        // 새 파일이 업로드된 경우
        if (request.getFile() != null && !request.getFile().isEmpty()) {
            
            String fileName = request.getFile().getOriginalFilename();
            String ext = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
            if (!extentions.contains(ext)) {
                throw new RuntimeException("파일형식이 맞지 않습니다. 이미지만 가능합니다.");
            }
            
            // 기존 파일들 삭제
            deleteOldFiles(existingEntity);
            
            // 새 파일 업로드
            Map<String, Object> fileMap = fileUtils.uploadFiles(request.getFile(), filePath);
            
            if (fileMap == null) {
                throw new RuntimeException("파일업로드에 실패하였습니다.");
            }
            
            String thumbFilePath = filePath + "thumb" + File.separator;
            String storedFilePath = filePath + fileMap.get("storedFileName").toString();
            
            File file = new File(storedFilePath);
            if (!file.exists()) {
                throw new RuntimeException("업로드 파일이 존재하지 않습니다.");
            }
            
            String thumbName = fileUtils.thumbNailFile(150, 150, file, thumbFilePath);
            
            // 파일 정보 업데이트
            existingEntity.setFileName(fileMap.get("fileName").toString());
            existingEntity.setStoredName(fileMap.get("storedFileName").toString());
            existingEntity.setFilePath(filePath);
            existingEntity.setFileThumbName(thumbName);
        }
        
        galleryRepository.save(existingEntity);
    }
    
    /**
     * 기존 파일들 삭제 (수정 시 사용)
     */
    private void deleteOldFiles(GalleryEntity entity) {
        try {
            // 원본 파일 삭제
            if (entity.getStoredName() != null && entity.getFilePath() != null) {
                String originalFilePath = entity.getFilePath() + entity.getStoredName();
                File originalFile = new File(originalFilePath);
                if (originalFile.exists()) {
                    originalFile.delete();
                }
            }
            
            // 썸네일 파일 삭제
            if (entity.getFileThumbName() != null && entity.getFilePath() != null) {
                String thumbFilePath = entity.getFilePath() + "thumb" + File.separator + entity.getFileThumbName();
                File thumbFile = new File(thumbFilePath);
                if (thumbFile.exists()) {
                    thumbFile.delete();
                }
            }
            
        } catch (Exception e) {
            System.out.println("기존 파일 삭제 중 오류 발생: " + e.getMessage());
        }
    }
    
    /**
     * 갤러리 이미지들을 삭제합니다.
     * @param numsList 삭제할 이미지 nums 값들 (String 형태)
     * @return 실제 삭제된 이미지 개수
     */
    @Transactional
    public int deleteGalleryImages(List<String> numsList) throws Exception {
        log.info("갤러리 이미지 삭제 요청 - nums: {}", numsList);
        
        if (numsList == null || numsList.isEmpty()) {
            throw new IllegalArgumentException("삭제할 이미지를 선택하세요.");
        }
        
        // nums로 삭제할 이미지 정보 조회 (findAllById도 사용 가능)
        List<GalleryEntity> imagesToDelete = galleryRepository.findAllById(numsList);
        
        if (imagesToDelete.isEmpty()) {
            throw new IllegalArgumentException("삭제할 이미지를 찾을 수 없습니다.");
        }
        
        log.info("삭제 대상 이미지 개수: {}", imagesToDelete.size());
        
        // 실제 파일 삭제
        int fileDeleteCount = deletePhysicalFiles(imagesToDelete);
        log.info("파일 삭제 완료: {}개", fileDeleteCount);
        
        // DB에서 삭제 (deleteAllById도 사용 가능)
        galleryRepository.deleteAllById(numsList);
        
        int deletedDbCount = imagesToDelete.size();
        log.info("DB 삭제 완료: {}개", deletedDbCount);
        
        return deletedDbCount;
    }
    
    /**
     * 실제 파일들을 서버에서 삭제합니다.
     * 원본 이미지(filePath)와 썸네일(thumb 폴더)을 모두 삭제합니다.
     */
    private int deletePhysicalFiles(List<GalleryEntity> images) {
        int deletedFileCount = 0;
        
        for (GalleryEntity image : images) {
            try {
                // 1. 원본 이미지 삭제 (filePath + storedName)
                if (image.getStoredName() != null && image.getFilePath() != null) {
                    String originalFilePath = image.getFilePath() + image.getStoredName();
                    File originalFile = new File(originalFilePath);
                    
                    if (originalFile.exists()) {
                        if (originalFile.delete()) {
                            deletedFileCount++;
                            log.debug("원본 파일 삭제 완료: {}", originalFilePath);
                        } else {
                            log.warn("원본 파일 삭제 실패: {}", originalFilePath);
                        }
                    } else {
                        log.debug("원본 파일이 존재하지 않음: {}", originalFilePath);
                    }
                }
                
                // 2. 썸네일 이미지 삭제 (filePath + thumb/ + fileThumbName)
                if (image.getFileThumbName() != null && image.getFilePath() != null) {
                    String thumbFilePath = image.getFilePath() + "thumb" + File.separator + image.getFileThumbName();
                    File thumbFile = new File(thumbFilePath);
                    
                    if (thumbFile.exists()) {
                        if (thumbFile.delete()) {
                            deletedFileCount++;
                            log.debug("썸네일 파일 삭제 완료: {}", thumbFilePath);
                        } else {
                            log.warn("썸네일 파일 삭제 실패: {}", thumbFilePath);
                        }
                    } else {
                        log.debug("썸네일 파일이 존재하지 않음: {}", thumbFilePath);
                    }
                }
                
            } catch (Exception e) {
                log.error("파일 삭제 중 오류 발생 - nums: {}, storedName: {}, thumbName: {}", 
                    image.getNums(), image.getStoredName(), image.getFileThumbName(), e);
                // 파일 삭제 실패해도 DB 삭제는 계속 진행
            }
        }
        
        return deletedFileCount;
    }
}