package it.back.back_app.book.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import it.back.back_app.book.entity.BookCategoryEntity;
import it.back.back_app.book.entity.BookEntity;

public interface BookRepository extends JpaRepository<BookEntity, Integer> {

    // Best: 구매수 기준 5권
    List<BookEntity> findTop5ByShowYnOrderBySalesCountDesc(String showYn);

    // Best: 구매수 기준 정렬
    List<BookEntity> findByShowYnOrderBySalesCountDesc(String showYn);
    
    // New: 생성일 기준 5권
    List<BookEntity> findTop5ByShowYnOrderByCreateDateDesc(String showYn);
    
    // New: 생성일 기준 정렬
    List<BookEntity> findByShowYnAndCreateDateAfterOrderByCreateDateDesc(String showYn, LocalDate date);
    
    // Banner: 배너 노출 설정된 책들
    List<BookEntity> findByShowYnAndBannerYn(String showYn, String bannerYn);

    // 전체 검색
    Page<BookEntity> findByTitleContainingOrWriterContaining(String title, String writer, Pageable pageable);

    

    // 전체 조회 + 검색어 필터링
    @Query("SELECT b FROM BookEntity b " +
           "WHERE (:query IS NULL OR " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.writer) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.publisher) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<BookEntity> findByQuery(@Param("query") String query, Pageable pageable);

    
    // 카테고리 + 검색어 + 페이징
    @Query("""
        SELECT b FROM BookEntity b
        WHERE (:category IS NULL OR b.category = :category)
        AND (:query IS NULL OR 
            LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%')) OR
            LOWER(b.writer) LIKE LOWER(CONCAT('%', :query, '%')) OR
            LOWER(b.publisher) LIKE LOWER(CONCAT('%', :query, '%'))
        )
    """)

    Page<BookEntity> findByCategoryAndQuery(
        @Param("category") BookCategoryEntity category,
        @Param("query") String query,
        Pageable pageable
    );






}

