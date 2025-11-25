package it.back.back_app;

import it.back.back_app.board.dto.BoardDTO;
import it.back.back_app.board.service.BoardService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.mock.web.MockMultipartFile;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.util.AssertionErrors.assertNotNull;

@SpringBootTest
@DisplayName("게시글 서비스 테스트")
public class BoardServiceTest {
    private final BoardService boardService;

    @Autowired
    public BoardServiceTest(BoardService boardService) {
        this.boardService = boardService;
    }

    @Test
    @DisplayName("게시글 리스트 가져오기")
    void getBoardList() throws Exception {
        //give
        PageRequest pageable = PageRequest.of(0, 10);
        //when
        Map<String, Object> resultMap = boardService.getBoardList(pageable);
        //then
        assertNotNull("결과는 null이면 안됩니다.", resultMap);
        assertNotNull("게시글 리스트는 존재해야 합니다.", resultMap.get("content"));
    }

    //게시글 등록
    @Test
    @DisplayName("게시글 등록하기")
    void createBoard() throws Exception {
        MockMultipartFile file =
                new MockMultipartFile("file",
                        "my-test.txt",
                        "tex/plane",
                        "테스트 내용이 있습니다.".getBytes());

        BoardDTO.Request board = new BoardDTO.Request();
        board.setTitle("테스트용 타이틀");
        board.setContents("테스트용 컨텐츠");
        board.setWriter("ADMIN");
        board.setFile(file);

        //when
        Map<String, Object> resultMap = boardService.writeBoard(board);
        assertEquals(200,resultMap.get("resultCode"));

    }
}
