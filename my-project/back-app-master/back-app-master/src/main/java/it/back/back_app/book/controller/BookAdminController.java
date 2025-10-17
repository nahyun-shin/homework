package it.back.back_app.book.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import it.back.back_app.book.dto.BookRequestDTO;
import it.back.back_app.book.dto.BookResponseDTO;
import it.back.back_app.book.service.BookService;
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
public ResponseEntity<Map<String,Object>> getAdminBooks(
        @RequestParam(value = "query", required = false) String query,
        @RequestParam(value = "categoryId", required = false) Integer categoryId,
        @PageableDefault(size = 6, page = 0, sort = "createDate", direction = Direction.ASC) Pageable pageable) {

    Map<String,Object> result = bookService.getBooksFiltered(categoryId, query, pageable);
    return ResponseEntity.ok(result);
}


    // // ------------------------------
    // // 2️⃣ 단건 상세 조회
    // // ------------------------------
    // @GetMapping("/{bookId}")
    // public BookResponseDTO getBookListDetail(@PathVariable("bookId") int bookId) {
    //     return bookService.getBookListDetail(bookId);
    // }

    // // ------------------------------
    // // 3️⃣ 수정
    // // ------------------------------
    // @PutMapping("/{bookId}")
    // public BookResponseDTO updateBook(
    //         @PathVariable("bookId") int bookId,
    //         @RequestBody BookRequestDTO dto) {

    //     return bookService.updateBook(bookId, dto);
    // }

    // // ------------------------------
    // // 4️⃣ 삭제
    // // ------------------------------
    // @DeleteMapping("/{bookId}")
    // public void deleteBook(@PathVariable("bookId") int bookId) {
    //     bookService.deleteBook(bookId);
    // }
}
