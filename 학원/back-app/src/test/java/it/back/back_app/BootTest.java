package it.back.back_app;

import org.junit.jupiter.api.*;

@DisplayName("스프링 테스트")
public class BootTest {

    @BeforeAll
    public static void beforeAll() {
        System.out.println("#테스트가 시작 됩니다#");
    }

    @AfterAll
    public static void afterAll() {
        System.out.println("#테스트가 종료 됩니다#");
    }

    @BeforeEach
    public void beforeEach() {
        System.out.println("#테스트가 동작 합니다.#");
    }

    @AfterEach
    public void afterEach() {
        System.out.println("#테스트가 완료 되었습니다#");
    }

    @Test
    @DisplayName("테스트1")
    public void Test1() {
        System.out.println("#테스트1#");
    }


    @Test
    @DisplayName("테스트2")
    public void Test2() {
        System.out.println("#테스트2#");
    }
}
