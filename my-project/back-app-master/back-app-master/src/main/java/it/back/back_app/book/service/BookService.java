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
import org.springframework.web.multipart.MultipartFile;

import it.back.back_app.book.dto.BookCategoryDTO;
import it.back.back_app.book.dto.BookDetailDTO;
import it.back.back_app.book.dto.BookImageDTO;
import it.back.back_app.book.dto.BookMainDTO;
import it.back.back_app.book.dto.BookRequestDTO;
import it.back.back_app.book.dto.BookResponseDTO;
import it.back.back_app.book.dto.CategoryMenuDTO;
import it.back.back_app.book.entity.BookCategoryEntity;
import it.back.back_app.book.entity.BookEntity;
import it.back.back_app.book.entity.BookImageEntity;
import it.back.back_app.book.repository.BookCategoryRepository;
import it.back.back_app.book.repository.BookImageRepository;
import it.back.back_app.book.repository.BookRepository;
import it.back.back_app.common.utils.FileUtils;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final BookImageRepository bookImageRepository;
    private final BookCategoryRepository bookCategoryRepository;
    private final FileUtils fileUtils;

    @Value("${server.file.upload.path}")
    private String filePath;

    // 웹에서 접근 가능한 이미지 기본 URL
    private final String baseImageUrl = "/api/v1/image/";

    private List<String> extentions = Arrays.asList("jpg", "jpeg", "gif", "png", "webp", "bmp");

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

        LocalDateTime weekAgo = LocalDateTime.now().minusDays(1);
        Page<BookEntity> books = bookRepository.findByShowYnAndCreateDateAfterOrderBySalesCountDesc("Y", weekAgo,
                pageable);

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

        LocalDateTime weekAgo = LocalDateTime.now().minusWeeks(1);
        Page<BookEntity> books = bookRepository.findByShowYnAndCreateDateAfterOrderBySalesCountDesc("Y", weekAgo,
                pageable);

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
        Page<BookEntity> books = bookRepository.findByShowYnAndCreateDateAfterOrderBySalesCountDesc("Y", monthAgo,
                pageable);

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
     * 
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
                bookPage = bookRepository.findByShowYnAndCreateDateAfterOrderByCreateDateDesc("Y", now.minusDays(1),
                        pageable);
                break;
            case "weekly":
                bookPage = bookRepository.findByShowYnAndCreateDateAfterOrderByCreateDateDesc("Y", now.minusWeeks(1),
                        pageable);
                break;
            case "monthly":
                bookPage = bookRepository.findByShowYnAndCreateDateAfterOrderByCreateDateDesc("Y", now.minusMonths(1),
                        pageable);
                break;
            case "all":
            default:
                bookPage = bookRepository.findByShowYnOrderByCreateDateDesc("Y", pageable);
                break;
        }

        return bookPage.map(entity -> BookCategoryDTO.of(entity, baseImageUrl));
    }

    /**
     * user 카테고리 + 검색어 필터링 조회
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
     * admin 카테고리 + 검색어 필터링 조회
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getAdminBooksFiltered(Integer categoryId, String query, Pageable pageable) {

        BookCategoryEntity category = null;
        if (categoryId != null && categoryId != 0) {
            category = bookCategoryRepository.findById(categoryId).orElse(null);
        }

        Page<BookEntity> bookList = bookRepository.findByCategoryAndQueryAndShowYn(category, query, pageable);

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
     * user 도서 상세페이지
     */
    @Transactional(readOnly = true)
    public BookDetailDTO getDetailBook(Integer bookId,Integer categoryId) {
        BookEntity book = bookRepository.findByBookIdAndCategoryCategoryIdAndShowYn(bookId,categoryId, "Y")
                .orElseThrow(() -> new RuntimeException("해당 책을 찾을 수 없습니다."));

        return BookDetailDTO.of(book, baseImageUrl);
    }

    /**
     * admin 도서 상세페이지
     */
    @Transactional(readOnly = true)
    public BookResponseDTO getAdminDetailBook(Integer bookId) {
        BookEntity book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("해당 책을 찾을 수 없습니다."));

        return BookResponseDTO.of(book, baseImageUrl);
    }

    /* ✅ 책 등록 */
    @Transactional
    public BookEntity registerBook(BookRequestDTO dto) throws Exception {
        BookCategoryEntity category = bookCategoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리입니다."));

        BookEntity book = BookEntity.builder()
                .publisher(dto.getPublisher())
                .pubDate(dto.getPubDate() != null ? dto.getPubDate() : LocalDate.now())
                .title(dto.getTitle() != null ? dto.getTitle() : "제목 없음")
                .subTitle(dto.getSubTitle() != null ? dto.getSubTitle() : "")
                .writer(dto.getWriter() != null ? dto.getWriter() : "작가 미상")
                .content(dto.getContent())
                .bookQty(dto.getBookQty())
                .price(dto.getPrice())
                .category(category)
                .showYn(dto.getShowYn() != null ? (dto.getShowYn() ? "Y" : "N") : "Y")
                .stockYn(dto.getStockYn() != null ? (dto.getStockYn() ? "Y" : "N") : "N")
                .bannerYn(dto.getBannerYn() != null ? (dto.getBannerYn() ? "Y" : "N") : "N")
                .build();

        saveBookImages(dto, book);
        return bookRepository.save(book);
    }

    /* -------------------- 책 수정 -------------------- */
    @Transactional
    public BookEntity updateBook(Integer bookId, BookRequestDTO dto) throws Exception {
        BookEntity book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("해당 책을 찾을 수 없습니다."));

        // 카테고리 변경
        if (dto.getCategoryId() != 0) {
            BookCategoryEntity category = bookCategoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리입니다."));
            book.setCategory(category);
        }

        // 기본 정보 갱신
        book.setTitle(getOrDefault(dto.getTitle(), book.getTitle()));
        book.setSubTitle(getOrDefault(dto.getSubTitle(), book.getSubTitle()));
        book.setWriter(getOrDefault(dto.getWriter(), book.getWriter()));
        book.setPublisher(getOrDefault(dto.getPublisher(), book.getPublisher()));
        book.setContent(getOrDefault(dto.getContent(), book.getContent()));
        book.setPrice(getOrDefault(dto.getPrice(), book.getPrice()));
        book.setBookQty(getOrDefault(dto.getBookQty(), book.getBookQty()));
        book.setShowYn(toYn(dto.getShowYn(), book.getShowYn()));
        book.setStockYn(toYn(dto.getStockYn(), book.getStockYn()));
        book.setBannerYn(toYn(dto.getBannerYn(), book.getBannerYn()));

        // 이미지 수정 (기존 삭제 + 새로 업로드)
        if (dto.getFiles() != null && !dto.getFiles().isEmpty()) {
            deleteBookImages(book);     // 기존 이미지 삭제
            saveBookImages(dto, book);  // 새 이미지 업로드
        }

        return bookRepository.save(book);
    }

    /* -------------------- 책 삭제 -------------------- */
    @Transactional
    public void deleteBook(Integer bookId) {
        BookEntity book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 책입니다."));

        deleteBookImages(book);  // 이미지 삭제
        bookRepository.delete(book);
    }

    /* -------------------- 이미지 업로드 공통 -------------------- */
    @Transactional
    private void saveBookImages(BookRequestDTO dto, BookEntity book) throws Exception {
        List<MultipartFile> files = dto.getFiles();
        List<Boolean> flags = dto.getMainImageFlags();

        if (files == null || files.isEmpty()) return;

        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            boolean isMain = flags != null && i < flags.size() ? flags.get(i) : false;

            String originalName = file.getOriginalFilename();
            if (originalName == null || !isAllowedExtension(originalName)) {
                throw new IllegalArgumentException("허용되지 않은 이미지 확장자입니다: " + originalName);
            }

            Map<String, Object> fileMap = fileUtils.uploadFiles(file, filePath);
            String fileName = (String) fileMap.get("fileName");
            String storedName = (String) fileMap.get("storedFileName");
            String savedPath = (String) fileMap.get("filePath");

            BookImageEntity image = BookImageEntity.builder()
                    .fileName(fileName)
                    .storedName(storedName)
                    .filePath(savedPath)
                    .mainYn(isMain)
                    .book(book)
                    .build();

            book.addImage(image);
        }

        // 대표 이미지 지정
        if (book.getFileList().stream().noneMatch(BookImageEntity::getMainYn)) {
            BookImageEntity first = book.getFileList().iterator().next();
            first.setMainYn(true);
        }
    }

    /* -------------------- 이미지 삭제 -------------------- */
    private void deleteBookImages(BookEntity book) {
        if (book.getFileList() == null || book.getFileList().isEmpty()) return;

        for (BookImageEntity image : book.getFileList()) {
            try {
                String fullPath = image.getFilePath() + image.getStoredName();
                fileUtils.deleteFile(fullPath);
                bookImageRepository.delete(image);
            } catch (Exception e) {
                System.err.println("이미지 삭제 실패: " + image.getFileName());
            }
        }
        book.getFileList().clear();
    }

    /* -------------------- 헬퍼 -------------------- */
    private <T> T getOrDefault(T newValue, T oldValue) {
        return newValue != null ? newValue : oldValue;
    }

    private String toYn(Boolean value, String oldValue) {
        return value != null ? (value ? "Y" : "N") : oldValue;
    }

    private boolean isAllowedExtension(String fileName) {
        String ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        return extentions.contains(ext);
    }

}
