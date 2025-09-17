package it.korea.app_boot.board.service;

import java.io.File;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.korea.app_boot.board.dto.BoardDTO;
import it.korea.app_boot.board.dto.BoardFileDTO;
import it.korea.app_boot.board.dto.BoardSearchDTO;
import it.korea.app_boot.board.entity.BoardEntity;
import it.korea.app_boot.board.entity.BoardFileEntity;
import it.korea.app_boot.board.repository.BoardFileRepository;
import it.korea.app_boot.board.repository.BoardRepository;
import it.korea.app_boot.board.repository.BoardSearchSpecification;
import it.korea.app_boot.common.files.FileUtils;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardJPAService {
    @Value("${server.file.upload.path}")
    private String filePath;

    private final BoardRepository boardRepository;
    private final BoardFileRepository fileRepository;
    private final FileUtils fileUtils;

    public Map<String, Object> getBoardList(BoardSearchDTO searchDTO, Pageable pageable) throws Exception{
        
        Map<String, Object> resultMap = new HashMap<>();
        
        //findAll() -> select * from board;
        Page<BoardEntity> pageObj = null;
        if(!StringUtils.isBlank(searchDTO.getSchType())&&
            !StringUtils.isBlank(searchDTO.getSchText())
            ){
            
                        // if(searchDTO.getSchType().equals("title")){
                        //     pageObj = boardRepository.findByTitleContaining(searchDTO.getSchText(), pageable);
                        // }else if(searchDTO.getSchType().equals("writer")){
                        //     pageObj = boardRepository.findByWriterContaining(searchDTO.getSchText(), pageable);
                
                        // }
                    
                        
                        BoardSearchSpecification searchSpecification = new BoardSearchSpecification(searchDTO);
                        pageObj = boardRepository.findAll(searchSpecification,pageable);
        }else{
            pageObj = boardRepository.findAll(pageable);
        }
        
        

        // List of Entity ==> List of DTO 
        List<BoardDTO.Response> list  =
             //pageObj.ge JDK 16부터 가능tContent().stream().map(BoardDTO.Response::of).toList(); //toList() 는 불변 객체 출력  
            pageObj.getContent()
                 .stream()
                 .map(BoardDTO.Response::of)
                 .collect( Collectors.toList() );  //가변 객체 
        
        
        resultMap.put("total", pageObj.getTotalElements());
        resultMap.put("content", list);

        return resultMap;
    }

    @Transactional
    public Map<String, Object> getBoard(int brdId) throws Exception{
        Map<String, Object> resultMap = new HashMap<>();

        BoardEntity entity = 
            boardRepository.getBoard(brdId)
                .orElseThrow(() -> new RuntimeException("게시글 없음"));

        BoardDTO.Detail  detail = BoardDTO.Detail.of(entity);

        resultMap.put("vo", detail);

        return resultMap;
    }


     @Transactional
     public Map<String, Object> writeBoard(BoardDTO.Request request) throws Exception{
        Map<String, Object> resultMap = new HashMap<>();

        //물리적으로 저장
        Map<String, Object> fileMap = fileUtils.uploadFiles(request.getFile(), filePath);
        BoardEntity entity = new BoardEntity();
        entity.setTitle(request.getTitle());
        entity.setContents(request.getContents());
        entity.setWriter("admin");
        
        if(fileMap != null) {

          BoardFileEntity fileEntity = new BoardFileEntity();
          fileEntity.setFileName(fileMap.get("fileName").toString());
          fileEntity.setStoredName(fileMap.get("storedFileName").toString());
          fileEntity.setFilePath(fileMap.get("filePath").toString());
          fileEntity.setFileSize(request.getFile().getSize());
          entity.addFiles(fileEntity);
        }

        boardRepository.save(entity);

        resultMap.put("resultCode", 200);
        resultMap.put("resultMsg", "OK");   
        
        return resultMap;
    }
    
    //파일 다운로드
    public ResponseEntity<Resource> downLoadFile(int bfId) throws Exception{
        //http 헤더 객체
        HttpHeaders header = new HttpHeaders();
        Resource resource = null;
        
           
        BoardFileDTO fileDTO =
                 BoardFileDTO.of(
                    fileRepository
                    .findById(bfId)
                    .orElseThrow(()->new NotFoundException("파일정보없음"))
                    );

        String fullPath = fileDTO.getFilePath() + fileDTO.getStoredName();
        String fileName = fileDTO.getFileName();

        File f = new File(fullPath);

        if(!f.exists()){
            throw new NotFoundException("파일정보없음");
        }

        //파일타입 > NIO 를 이용한 타입찾기
        String mimeType = Files.probeContentType(Paths.get(f.getAbsolutePath()));

        if(mimeType == null){
            mimeType = "application/octet-stream";//기본 바이너리 파일
        }

        //리소스 객체에 url을 통해서 전송할 파일 저장
        resource = new FileSystemResource(f);
        

        //http 응답에서 브라우저가 콘텐츠를 처리하는 방식
        //inline > 브라우저 바에서 처리 >open
        // attachment > 다운로드
        header.setContentDisposition(
            ContentDisposition
            .builder("attachment")
            .filename(fileName, StandardCharsets.UTF_8)
            .build()
        );

        //mimeType 설정
        header.setContentType(MediaType.parseMediaType(mimeType));
        header.setContentLength(fileDTO.getFileSize());

        //캐쉬설정
        header.setCacheControl("no-cache, no-store, must-revalidate");
        header.set("Pragma", "no-cache"); //old browser호환
        header.set("Expires","0"); //즉시 삭제

        return new ResponseEntity<>(resource, header, HttpStatus.OK);
    }
    //게시글 수정
   @Transactional
    public Map<String, Object> updateBoard(BoardDTO.Request request) throws Exception{
    Map<String, Object> resultMap = new HashMap<>();

    try {
        // 1. 기존 게시글 조회
        BoardEntity entity = boardRepository.findById(request.getBrdId())
            .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));


            BoardDTO.Detail detail = BoardDTO.Detail.of(entity);
        // 2. 기본 정보 수정
        entity.setTitle(request.getTitle());
        entity.setContents(request.getContents());
        // writer는 보통 수정하지 않음

        // 3. 파일 처리 (새 파일이 있다면)
        if (!request.getFile().isEmpty()) {
            // 기존 파일 삭제 (물리적 파일 + DB)
            
            // 새 파일 업로드
            Map<String, Object> fileMap = fileUtils.uploadFiles(request.getFile(), filePath);
            // DB에서 파일 정보 삭제
            entity.getFileList().clear();
            if (fileMap != null) {
                BoardFileEntity fileEntity = new BoardFileEntity();
                fileEntity.setFileName(fileMap.get("fileName").toString());
                fileEntity.setStoredName(fileMap.get("storedFileName").toString());
                fileEntity.setFilePath(fileMap.get("filePath").toString());
                fileEntity.setFileSize(request.getFile().getSize());
                entity.addFiles(fileEntity); // 기존 addFiles 메서드 사용
            }else{
                throw new RuntimeException("파일 업로드 실패");
            }
        }
        
        // 4. 저장
        boardRepository.save(entity);
        
        //데이터베이스 롤백을 대비해서 물리파일을 마지막에 지운다
        if (!request.getFile().isEmpty()){

            if (detail.getFileList() != null && !detail.getFileList().isEmpty()) {
                for (BoardFileDTO fileDTO : detail.getFileList()) {
                    // 물리적 파일 삭제
                    String oldFilePath = fileDTO.getFilePath() + fileDTO.getStoredName();
                    fileUtils.deleteFile((oldFilePath));
                }
            }
        }
            

        resultMap.put("resultCode", 200);
        resultMap.put("resultMsg", "수정 완료");

    } catch (Exception e) {
        resultMap.put("resultCode", 500);
        resultMap.put("resultMsg", "수정 실패: " + e.getMessage());
        throw e;
    }

    return resultMap;
}

public Map<String, Object>deleteFile(int bfId) throws Exception{
    BoardFileEntity fileEntity = fileRepository.findById(bfId).orElseThrow(()->new NotFoundException("파일정보없음"));
    fileRepository.delete(fileEntity);

    String oldFilePath = fileEntity.getFilePath()+fileEntity.getStoredName();
    fileUtils.deleteFile(oldFilePath);

    Map<String, Object> resultMap = new HashMap<>();

    resultMap.put("resultCode", 200);
    resultMap.put("resultMsg", "OK");   
        
    return resultMap;
}

@Transactional
public Map<String, Object> deleteBoard(int brdId) throws Exception {
    BoardEntity entity = boardRepository.getBoard(brdId)
            .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

    // 1. 물리 파일 삭제 (파일이 있을 때만)
    if (entity.getFileList() != null && !entity.getFileList().isEmpty()) {
        for (BoardFileEntity fileEntity : entity.getFileList()) {
            String oldFilePath = fileEntity.getFilePath() + fileEntity.getStoredName();
            try {
                fileUtils.deleteFile(oldFilePath);
            } catch (Exception e) {
                // 파일 삭제 실패는 무시하고 계속 진행
                System.err.println("파일 삭제 실패 (무시됨): " + oldFilePath);
            }
        }
    }

    // 2. 게시글 + 파일 DB 삭제 (Cascade 설정돼 있어야 함)
    boardRepository.delete(entity);

    Map<String, Object> resultMap = new HashMap<>();
    resultMap.put("resultCode", 200);
    resultMap.put("resultMsg", "OK");

    return resultMap;
}






}