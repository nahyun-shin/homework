package back.smart.code;

import back.smart.code.books.service.BookService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;

import java.util.Map;

import static org.springframework.test.util.AssertionErrors.assertNotNull;

@SpringBootTest
@DisplayName("book 서비스 테스트")
public class BookServiceTest {

    private final BookService bookService;

    @Autowired
    public BookServiceTest(BookService bookService) {
        this.bookService = bookService;
    }
    @Test
    @DisplayName("book 리스트 가져오기")
    void getBookList() throws Exception {
        //give
        PageRequest pageable = PageRequest.of(0, 10);
        //when
        Map<String, Object> resultMap = bookService.getBooksList(pageable);
        //then
        assertNotNull("결과는 null이면 안됩니다.", resultMap);
        assertNotNull("북 리스트는 존재해야 합니다.", resultMap.get("data"));
    }
}
