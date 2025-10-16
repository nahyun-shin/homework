package it.back.back_app.book.controller;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.back.back_app.book.dto.BookCategoryDTO;
import it.back.back_app.book.dto.BookDetailDTO;
import it.back.back_app.book.dto.BookMainDTO;
import it.back.back_app.book.dto.CategoryMenuDTO;
import it.back.back_app.book.entity.BookCategoryEntity;
import it.back.back_app.book.repository.BookCategoryRepository;
import it.back.back_app.book.service.BookService;
import it.back.back_app.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class BookRestController {

    private final BookCategoryRepository bookCategoryRepository;
    
    private final BookService bookService;


    //이미지경로
    @Value("${server.file.upload.path}")
    private String uploadPath;

    //이미지불러오기
    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getBookImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadPath).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            String contentType = "image/jpeg";
            if (filename.endsWith(".png")) {
                contentType = "image/png";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);

        } catch (Exception e) {
            log.error("Error while serving image file: " + filename, e);
            return ResponseEntity.internalServerError().build();
        }
        
    }

    //메인페이지
    @GetMapping("/main")
    public ResponseEntity<ApiResponse<List<BookMainDTO>>> getMainBookList(
        @RequestParam String type,
        @PageableDefault(size = 6, page = 0)Pageable pageable)throws Exception {

        log.info("----- 메인페이지 최근 6권 도서 목록 가져오기 -------");

        List<BookMainDTO> books;
        

        switch (type.toLowerCase()) {
            case "best":
                books = bookService.getBestBooks(); // 구매순
                break;
            case "new":
                books = bookService.getNewBooks();  // 생성일 기준
                break;
            case "banner":
                books = bookService.getBannerBooks(); // 관리자 지정
                break;
            default:
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(ApiResponse.error("Invalid type parameter."));
        }
        log.info("응답 데이터: {}", books);


        return ResponseEntity.ok(ApiResponse.ok(books));
    }

    //카테고리페이지
    @GetMapping("/books")
    public ResponseEntity<Map<String, Object>> getBooks(
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) String query,
            @PageableDefault(size = 6, page = 0, sort = "createDate", direction = Direction.ASC)
Pageable pageable) {
        // log.info("요청된 정렬 정보: {}", pageable.getSort());
        Map<String, Object> result = bookService.getBooksFiltered(categoryId, query, pageable);
        return ResponseEntity.ok(result);
    }

    //카테고리정보
    // 모든 카테고리 메뉴 조회
    @GetMapping("/categories")
    public ResponseEntity<List<CategoryMenuDTO>> getCategoryMenu() {
        List<CategoryMenuDTO> categories = bookService.getCategoryMenu();
        return ResponseEntity.ok(categories);
    }

    // 베스트 - 일간
    @GetMapping("/best/day")
    public ResponseEntity<Map<String, Object>> getBestBooksDay(
        @PageableDefault(size = 10, page = 0 , sort = "salesCount",
        direction = Direction.DESC) Pageable pageable){

        Map<String, Object> result = bookService.getBestBooksDay(pageable);
        return ResponseEntity.ok(result);
    }

    // 베스트 - 이번 주
    @GetMapping("/best/week")
    public ResponseEntity<Map<String, Object>> getBestBooksWeek(
        @PageableDefault(size = 10, page = 0, sort = "salesCount",
        direction = Direction.DESC) Pageable pageable) {
    
    Map<String, Object> result = bookService.getBestBooksWeek(pageable);
    return ResponseEntity.ok(result);
    }


    // 베스트 - 이번 달
    @GetMapping("/best/month")
    public ResponseEntity<Map<String, Object>> getBestBooksMonth(
        @PageableDefault(size = 10, page = 0, sort = "salesCount",
        direction = Direction.DESC) Pageable pageable) {

        Map<String, Object> result = bookService.getBestBooksMonth(pageable);
        return ResponseEntity.ok(result);
    }

    // 신상품 조회 (일간/주간/월간/전체)
    @GetMapping("/new")
    public ResponseEntity<Page<BookCategoryDTO>> getNewBooks(
        @RequestParam(defaultValue = "all") String period,
        @PageableDefault(size = 10, page = 0, sort = "createDate", direction = Direction.DESC) Pageable pageable
    ) {
        Page<BookCategoryDTO> result = bookService.getBooksByPeriod(period, pageable);
        return ResponseEntity.ok(result);
    }


    //디테일페이지
    @GetMapping("/detail/{bookId}")
    public ResponseEntity<BookDetailDTO> getBook(@PathVariable Integer bookId){
        BookDetailDTO dto = bookService.getDetailBook(bookId);
        return ResponseEntity.ok(dto);
    }

    



    

}
