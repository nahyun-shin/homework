package it.back.back_app;

import it.back.back_app.board.controller.BoardRestContorller;
import it.back.back_app.common.utils.JWTUtils;
import jakarta.transaction.Transactional;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class BoardControlTest {

    private final MockMvc mockMvc;
    private final BoardRestContorller boardRestContorller;
    private final JWTUtils jwtUtils;
    private String token;

    //의존성 주입
    @Autowired
    public BoardControlTest(MockMvc mockMvc, BoardRestContorller boardRestContorller,JWTUtils jwtUtils) {
        this.mockMvc = mockMvc;
        this.boardRestContorller = boardRestContorller;
        this.jwtUtils = jwtUtils;
    }

    @BeforeEach
    @DisplayName("로그인 토큰 생성")
    public void beforeAll() throws Exception {
        MvcResult result = mockMvc.perform(
                post("/api/v1/login")
                        .contentType("x-www-form-urlencoded;charset=utf-8")
                        .param("username","admin")
                        .param("password","1234")

        ).andExpect(status().isOk()).andReturn();
        JSONObject json =  new JSONObject(result.getResponse().getContentAsString());
        token = json.getJSONObject("content").getString("token");

        this.token = "Bearer " + token;
        System.out.println(this.token);
    }

    @Test
    @DisplayName("게시글 가져오기")
    void getBoardList()throws Exception {
        var result = mockMvc.perform(
                get("/api/v1/board")
                        .header("Authorization", this.token)
        );
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.response.page").value(0))
                .andExpect(jsonPath("$.response.content").isArray());
    }


    @Test
    @DisplayName("게시글 가져오기")
    void getBoard()throws Exception {
        var result = mockMvc.perform(
                get("/api/v1/board")
                        .param("bookid","1")
                        .header("Authorization", this.token)
        );
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.response.page").value(0))
                .andExpect(jsonPath("$.response.content").isArray());
    }





    @Test
    @DisplayName("게시글을 등록하고 OK로 200 받는다.")
    @Transactional //테스트 후 rollback
    void writeBoard() throws Exception {

        //전송할 파일을 임의로 만든다.
        //give
        MockMultipartFile file =
                new MockMultipartFile("file",
                "my-test.txt",
                "tex/plane",
                "테스트 내용이 있습니다.".getBytes());

        String jwtToken = this.token.substring(7);
        String userId = jwtUtils.getUserId(jwtToken);


        //when
        var result = mockMvc.perform(
                multipart("/api/v1/board")
                        .file(file)
                        .param("title", "테스트입니다.")
                        .param("writer", userId)
                        .param("contents","내용내용내용")
                        .header("Authorization", this.token)
                        .contentType("multipart/form-data")
        );

        //then
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.response.resultCode").value(200));
    }


}
