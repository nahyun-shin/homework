package it.back.back_app.book.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.back.back_app.book.dto.BookCategoryDTO;
import it.back.back_app.book.dto.BookMainDTO;
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
     * 카테고리 + 검색어 필터링 조회
     */
    @Transactional(readOnly = true)
public Map<String, Object> getBooksFiltered(Integer categoryId, String query, Pageable pageable) {

    BookCategoryEntity category = null;
    if (categoryId != null && categoryId !=0) {
        category = bookCategoryRepository.findById(categoryId).orElse(null);
    }

    Page<BookEntity> bookList = bookRepository.findByCategoryAndQuery(category, query, pageable);


    Map<String, Object> resultMap = new HashMap<>();
    List<BookCategoryDTO> list = bookList.getContent().stream()
            .map(BookCategoryDTO::of)
            .toList();

    resultMap.put("total", bookList.getTotalElements());
    resultMap.put("page", bookList.getNumber());
    resultMap.put("content", list);

    return resultMap;
}




}
