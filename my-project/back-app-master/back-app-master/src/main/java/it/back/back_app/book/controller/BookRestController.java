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
import org.springframework.web.bind.annotation.*;

import it.back.back_app.book.dto.*;
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

    private final BookService bookService;

    @Value("${server.file.upload.path}")
    private String uploadPath;

    // ------------------------------
    // 1️⃣ 이미지 불러오기
    // ------------------------------
    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getBookImage(@PathVariable("filename") String filename) {
        try {
            Path filePath = Paths.get(uploadPath).resolve(filename).normalize();
            log.info("Serving image from path: {}", filePath.toString());
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            String contentType = filename.endsWith(".png") ? "image/png" : "image/jpeg";

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);

        } catch (Exception e) {
            log.error("Error while serving image file: " + filename, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    // ------------------------------
    // 2️⃣ 메인 페이지 도서 목록
    // ------------------------------
    @GetMapping("/main")
    public ResponseEntity<ApiResponse<List<BookMainDTO>>> getMainBookList(
            @RequestParam("type") String type,
            @PageableDefault(size = 6, page = 0) Pageable pageable) {

        log.info("메인페이지 도서 목록 조회, type={}", type);

        List<BookMainDTO> books;

        switch (type.toLowerCase()) {
            case "best":
                books = bookService.getBestBooks();
                break;
            case "new":
                books = bookService.getNewBooks();
                break;
            case "banner":
                books = bookService.getBannerBooks();
                break;
            default:
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(ApiResponse.error("Invalid type parameter."));
        }

        log.info("응답 데이터: {}", books);
        return ResponseEntity.ok(ApiResponse.ok(books));
    }

    // ------------------------------
    // 3️⃣ 카테고리 페이지
    // ------------------------------
    @GetMapping("/books")
    public ResponseEntity<Map<String, Object>> getBookList(
            @RequestParam(value = "categoryId", required = false) Integer categoryId,
            @RequestParam(value = "query", required = false) String query,
            @PageableDefault(size = 6, page = 0, sort = "createDate", direction = Direction.ASC) Pageable pageable) {

        Map<String, Object> result = bookService.getBooksFiltered(categoryId, query, pageable);
        return ResponseEntity.ok(result);
    }

    // ------------------------------
    // 4️⃣ 카테고리 메뉴
    // ------------------------------
    @GetMapping("/categories")
    public ResponseEntity<List<CategoryMenuDTO>> getCategoryMenu() {
        List<CategoryMenuDTO> categories = bookService.getCategoryMenu();
        return ResponseEntity.ok(categories);
    }

    // ------------------------------
    // 5️⃣ 베스트 도서 조회
    // ------------------------------
    @GetMapping("/best/day")
    public ResponseEntity<Map<String, Object>> getBestBooksDay(
            @PageableDefault(size = 10, page = 0, sort = "salesCount", direction = Direction.DESC) Pageable pageable) {
        Map<String, Object> result = bookService.getBestBooksDay(pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/best/week")
    public ResponseEntity<Map<String, Object>> getBestBooksWeek(
            @PageableDefault(size = 10, page = 0, sort = "salesCount", direction = Direction.DESC) Pageable pageable) {
        Map<String, Object> result = bookService.getBestBooksWeek(pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/best/month")
    public ResponseEntity<Map<String, Object>> getBestBooksMonth(
            @PageableDefault(size = 10, page = 0, sort = "salesCount", direction = Direction.DESC) Pageable pageable) {
        Map<String, Object> result = bookService.getBestBooksMonth(pageable);
        return ResponseEntity.ok(result);
    }

    // ------------------------------
    // 6️⃣ 신상품 조회
    // ------------------------------
    @GetMapping("/new")
    public ResponseEntity<Page<BookCategoryDTO>> getNewBooks(
            @RequestParam(value = "period", defaultValue = "all") String period,
            @PageableDefault(size = 10, page = 0, sort = "createDate", direction = Direction.DESC) Pageable pageable) {

        Page<BookCategoryDTO> result = bookService.getBooksByPeriod(period, pageable);
        return ResponseEntity.ok(result);
    }

    // ------------------------------
    // 7️⃣ 도서 상세 페이지
    // ------------------------------
    @GetMapping("/books/{bookId}")
    public ResponseEntity<BookDetailDTO> getBook(@PathVariable("bookId") Integer bookId) {
        BookDetailDTO dto = bookService.getDetailBook(bookId);
        return ResponseEntity.ok(dto);
    }
}
