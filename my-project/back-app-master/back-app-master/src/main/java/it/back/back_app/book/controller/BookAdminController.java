package it.back.back_app.book.controller;

import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import it.back.back_app.book.dto.BookRequestDTO;
import it.back.back_app.book.dto.BookResponseDTO;
import it.back.back_app.book.entity.BookEntity;
import it.back.back_app.book.service.BookService;
import it.back.back_app.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
public class BookAdminController {

    private final BookService bookService;

    // ------------------------------
    // 1️⃣ 목록 조회 (페이징 + 검색 + 카테고리)
    // ------------------------------
    @GetMapping("/books")
    public ResponseEntity<Map<String, Object>> getAdminBooks(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "categoryId", required = false) Integer categoryId,
            @PageableDefault(size = 6, page = 0, sort = "createDate", direction = Direction.ASC) Pageable pageable) {

        Map<String, Object> result = bookService.getAdminBooksFiltered(categoryId, query, pageable);
        return ResponseEntity.ok(result);
    }

    // // ------------------------------
    // // 2️⃣ 단건 상세 조회
    // // ------------------------------
    @GetMapping("/books/{bookId}")
    public ResponseEntity<BookResponseDTO> getBook(@PathVariable("bookId") Integer bookId) {
        BookResponseDTO dto = bookService.getAdminDetailBook(bookId);
        return ResponseEntity.ok(dto);
    }

    /**
     * 도서 등록
     */
    @PostMapping("/books")
    public ResponseEntity<?> createBook(@ModelAttribute BookRequestDTO dto) {
        try {
            // 디버깅용 로그
        System.out.println("=== 받은 데이터 ===");
        System.out.println("Title: " + dto.getTitle());
        System.out.println("Files: " + (dto.getFiles() != null ? dto.getFiles().size() : 0));
        System.out.println("MainImageFlags: " + dto.getMainImageFlags());
        System.out.println("ShowYn: " + dto.getShowYn());
        System.out.println("PubDate: " + dto.getPubDate());
            BookEntity savedBook = bookService.registerBook(dto);
            return ResponseEntity.ok(savedBook.getBookId());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(500)
                    .body("도서 등록 중 오류 발생: " + e.getMessage());
        }
    }
    
    //수정
    @PutMapping("/books/{bookId}")
    public ResponseEntity<?> updateBook(
            @PathVariable("bookId") Integer bookId,
            @ModelAttribute BookRequestDTO dto
    ) {
        try {
              // 디버깅용 로그
        System.out.println("=== 받은 데이터 ===");
        System.out.println("Title: " + dto.getTitle());
        System.out.println("Files: " + (dto.getFiles() != null ? dto.getFiles().size() : 0));
        System.out.println("MainImageFlags: " + dto.getMainImageFlags());
        System.out.println("ShowYn: " + dto.getShowYn());
        System.out.println("PubDate: " + dto.getPubDate());
            BookEntity updatedBook = bookService.updateBook(bookId, dto);
            return ResponseEntity.ok(Map.of(
                "message", "도서가 수정되었습니다.",
                "bookId", updatedBook.getBookId()
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of(
                "message", "도서 수정 중 오류가 발생했습니다.",
                "error", e.getMessage()
            ));
        }
    }
    //삭제
    @DeleteMapping("/books/{bookId}")
public ResponseEntity<ApiResponse<Map<String, Object>>> deleteBoard(@PathVariable("bookId") int bookId) throws Exception {

        Map<String, Object> resultMap = bookService.deleteBook(bookId);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.ok(resultMap));
    }


    
}
