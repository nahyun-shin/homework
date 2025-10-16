package it.back.back_app.book.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.back.back_app.book.dto.BookCategoryDTO;
import it.back.back_app.book.dto.BookDetailDTO;
import it.back.back_app.book.dto.BookMainDTO;
import it.back.back_app.book.dto.CategoryMenuDTO;
import it.back.back_app.book.entity.BookCategoryEntity;
import it.back.back_app.book.entity.BookEntity;
import it.back.back_app.book.repository.BookCategoryRepository;
import it.back.back_app.book.repository.BookImageRepository;
import it.back.back_app.book.repository.BookRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    
    private final BookImageRepository bookImageRepository;
    private final BookCategoryRepository bookCategoryRepository;

    @Value("${server.file.upload.path}")
    private String filePath;

    // 웹에서 접근 가능한 이미지 기본 URL
    private final String baseImageUrl = "/api/v1/image/";

    
    // 모든 카테고리 조회
    @Transactional(readOnly = true)
    public List<CategoryMenuDTO> getCategoryMenu() {
        return bookCategoryRepository.findAll().stream()
                .map(entity -> new CategoryMenuDTO(entity.getCategoryId(), entity.getCategoryName()))
                .toList();
    }

    /**
     * Best 도서 목록 - 구매 수 기준 내림차순 5권
     */
    @Transactional(readOnly = true)
    public List<BookMainDTO> getBestBooks() {
        List<BookEntity> books = bookRepository.findTop5ByShowYnOrderBySalesCountDesc("Y");
        return books.stream()
                .map(book -> BookMainDTO.of(book, baseImageUrl))
                .toList();
    }

    /**
     * New 도서 목록 - 최신 생성일 기준 5권
     */
    @Transactional(readOnly = true)
    public List<BookMainDTO> getNewBooks() {
        List<BookEntity> books = bookRepository.findTop5ByShowYnOrderByCreateDateDesc("Y");
        return books.stream()
                .map(book -> BookMainDTO.of(book, baseImageUrl))
                .toList();
    }

    /**
     * Banner 도서 목록 - 관리자 지정 책만 (ex: bannerYn = 'Y')
     */
    @Transactional(readOnly = true)
    public List<BookMainDTO> getBannerBooks() {
        List<BookEntity> books = bookRepository.findByShowYnAndBannerYn("Y", "Y");
        return books.stream()
                .map(book -> BookMainDTO.of(book, baseImageUrl))
                .toList();
    }

    /**
     * 베스트 도서 - 일 간
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getBestBooksDay(Pageable pageable) {

        LocalDateTime  weekAgo = LocalDateTime.now().minusDays(1);
        Page<BookEntity> books = bookRepository.findByShowYnAndCreateDateAfterOrderBySalesCountDesc("Y",weekAgo, pageable);
        
        List<BookCategoryDTO> list = books.getContent().stream()
        .map(book -> BookCategoryDTO.of(book, baseImageUrl))
        .toList();

        Map<String, Object> result = new HashMap<>();
        result.put("total", books.getTotalElements());
        result.put("page", books.getNumber());
        result.put("content", list);

        return result;
    }

    /**
     * 베스트 도서 - 이번 주
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getBestBooksWeek(Pageable pageable) {

        LocalDateTime  weekAgo = LocalDateTime.now().minusWeeks(1);
        Page<BookEntity> books = bookRepository.findByShowYnAndCreateDateAfterOrderBySalesCountDesc("Y", weekAgo, pageable);
        
        List<BookCategoryDTO> list = books.getContent().stream()
        .map(book -> BookCategoryDTO.of(book, baseImageUrl))
        .toList();

        Map<String, Object> result = new HashMap<>();
        result.put("total", books.getTotalElements());
        result.put("page", books.getNumber());
        result.put("content", list);

        return result;
    }

    /**
     * 베스트 도서 - 이번 달
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getBestBooksMonth(Pageable pageable) {

        LocalDateTime monthAgo = LocalDateTime.now().minusMonths(1);
        Page<BookEntity> books = bookRepository.findByShowYnAndCreateDateAfterOrderBySalesCountDesc("Y", monthAgo, pageable);

        List<BookCategoryDTO> list = books.getContent().stream()
        .map(book -> BookCategoryDTO.of(book, baseImageUrl))
        .toList();

        Map<String, Object> result = new HashMap<>();
        result.put("total", books.getTotalElements());
        result.put("page", books.getNumber());
        result.put("content", list);

        return result;
    }

    /**
     * 신상품 도서 - 전체 및 기간 조회
     * @param categoryId
     * @param query
     * @param pageable
     * @return
     */
    @Transactional(readOnly = true)
    public Page<BookCategoryDTO> getBooksByPeriod(String period, Pageable pageable) {
    LocalDateTime now = LocalDateTime.now();
    Page<BookEntity> bookPage;

    switch (period.toLowerCase()) {
        case "daily":
            bookPage = bookRepository.findByShowYnAndCreateDateAfterOrderByCreateDateDesc("Y", now.minusDays(1), pageable);
            break;
        case "weekly":
            bookPage = bookRepository.findByShowYnAndCreateDateAfterOrderByCreateDateDesc("Y", now.minusWeeks(1), pageable);
            break;
        case "monthly":
            bookPage = bookRepository.findByShowYnAndCreateDateAfterOrderByCreateDateDesc("Y", now.minusMonths(1), pageable);
            break;
        case "all":
        default:
            bookPage = bookRepository.findByShowYnOrderByCreateDateDesc("Y", pageable);
            break;
    }

        return bookPage.map(entity -> BookCategoryDTO.of(entity, baseImageUrl));
    }





     



    /**
     * 카테고리 + 검색어 필터링 조회
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getBooksFiltered(Integer categoryId, String query, Pageable pageable) {

    BookCategoryEntity category = null;
    if (categoryId != null && categoryId != 0) {
        category = bookCategoryRepository.findById(categoryId).orElse(null);
    }

    Page<BookEntity> bookList = bookRepository.findByCategoryAndQuery(category, query, pageable);


    Map<String, Object> resultMap = new HashMap<>();
    List<BookCategoryDTO> list = bookList.getContent().stream()
        .map(bookEntity -> BookCategoryDTO.of(bookEntity, baseImageUrl))
        .toList();

    resultMap.put("total", bookList.getTotalElements());
    resultMap.put("page", bookList.getNumber());
    resultMap.put("content", list);

    return resultMap;
}

    /**
     * 도서 상세페이지
     */
    @Transactional(readOnly = true)
    public BookDetailDTO getDetailBook(Integer bookId) {
    BookEntity book = bookRepository.findByBookIdAndStockYn(bookId, "Y")
            .orElseThrow(() -> new RuntimeException("해당 책을 찾을 수 없습니다."));
    
    return BookDetailDTO.of(book, baseImageUrl);
}



}
