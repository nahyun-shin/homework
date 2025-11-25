package it.back.back_app.security;

import it.back.back_app.common.dto.ApiResponse;
import it.back.back_app.common.utils.JWTUtils;
import it.back.back_app.filter.LoginFilter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class RefreshController {

    private final JWTUtils jwtUtils;


    @PostMapping("/refresh")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for(Cookie cookie : cookies) {
            if(cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
                break;
            }
        }

        if(refresh == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("");
        }

        String category = jwtUtils.getCategory(refresh);
        if(!category.equals("refresh") || ! jwtUtils.validateToken(refresh) ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("refresh 토큰이 유효하지 않습니다.");
        }

        String userId = jwtUtils.getUserId(refresh);
        String userName = jwtUtils.getUserName(refresh);
        String userRole = jwtUtils.gertUserRole(refresh);

        String accessToken = jwtUtils.createJwt("access", userId, userName,
                userRole, LoginFilter.ACCESS_TOKEN_EXPIRE_TIME);
        String refreshToken = jwtUtils.createJwt("refresh", userId, userName,
                userRole, LoginFilter.REFRESH_TOKEN_EXPIRE_TIME);

        response.addCookie(createCookie("refresh", refreshToken));

        Map<String, Object> resultMap = Map.of("accessToken", accessToken);

        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.ok(resultMap));
    }


    //토큰 저장
    private Cookie createCookie(String name, Object value) {
        Cookie cookie = new Cookie(name, String.valueOf(value));
        cookie.setPath("/");
        cookie.setMaxAge((int)(LoginFilter.REFRESH_TOKEN_EXPIRE_TIME / 1000));
        cookie.setHttpOnly(true); // 자바스크립트에서 접근 금지

        return cookie;
    }
}
