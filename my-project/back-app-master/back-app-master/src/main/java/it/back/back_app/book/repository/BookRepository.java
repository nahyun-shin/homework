package it.back.back_app.book.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    // New: 생성일 기준 5권
    List<BookEntity> findTop5ByShowYnOrderByCreateDateDesc(String showYn);
    
    // Best: 구매수 기준 기간정렬
    Page<BookEntity> findByShowYnAndCreateDateAfterOrderBySalesCountDesc(String showYn, LocalDateTime date, Pageable pageable);

    // New: 생성일 기준 전체 정렬
    Page<BookEntity> findByShowYnOrderByCreateDateDesc(String showYn, Pageable pageable);
    
    //New: 생성일 기준 기간 정렬
    Page<BookEntity> findByShowYnAndCreateDateAfterOrderByCreateDateDesc(String showYn, LocalDateTime date, Pageable pageable);

    
    // Banner: 배너 노출 설정된 책들
    List<BookEntity> findByShowYnAndBannerYn(String showYn, String bannerYn);

    
    
    // 카테고리 + 검색어 + 페이징
    @Query("""
        SELECT b FROM BookEntity b
        WHERE b.showYn = 'Y'
        AND(:category IS NULL OR b.category = :category)
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



    // 단일 책 조회 (책 ID 기준)
    Optional<BookEntity> findByBookIdAndShowYn(Integer bookId, String showYn);



}

