package it.back.back_app.filter;

import java.io.IOException;
import java.io.PrintWriter;

import org.json.JSONObject;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import it.back.back_app.common.utils.JWTUtils;
import it.back.back_app.security.dto.UserSecureDTO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 
 * 로그인 이전에 JWT를 검증하기 위한 필터
 * 검증에 문제가 없다면 인증정보를 SecurityContextHoler 에 저장
 */
@RequiredArgsConstructor
@Slf4j
public class JWTFilter  extends OncePerRequestFilter{

    private final JWTUtils jwtUtils;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        //요청 request header 에서 token 찾기
        //헤더에 원래 있는 속성임....
        String acessToken = request.getHeader("Authorization");

        if(acessToken == null) {
            log.info("acessToken is null");
            filterChain.doFilter(request, response);
            return; // 자격이 없으니 로그인으로 넘거가라!
        }

        try{

            if(acessToken.startsWith("Bearer ")) {
                acessToken = acessToken.substring(7);

                if( !jwtUtils.validateToken(acessToken)) {
                    throw new IllegalAccessException("유효하지 않은 토큰입니다.");
                }
            }

            //토큰의 카테고리 검색
            String category = jwtUtils.getCategory(acessToken);
            
            if(! category.equals("access")) {
                throw new IllegalAccessException("유효하지 않은 토큰입니다.");
            }

        }catch(Exception e) {
            //response 한다! 
            response.setContentType("application/json");
            PrintWriter writer = response.getWriter();
            JSONObject message = this.getErrorMessage(e.getMessage(), HttpServletResponse.SC_NOT_ACCEPTABLE);
            writer.write(message.toString());
            response.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
            return;  // 함수 종료 
        }

        // 인증 성공
        String userId = jwtUtils.getUserId(acessToken);
        String userName = jwtUtils.getUserName(acessToken);
        String userRole = jwtUtils.getUserRole(acessToken);
       

        UserSecureDTO dto = new UserSecureDTO(userId, userName, userName, userRole);

        //시큐리티 세션에 저장()
        Authentication authentication = 
                new UsernamePasswordAuthenticationToken(dto, null, dto.getAuthorities());
        
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //다음으로 이동
        filterChain.doFilter(request, response);
        
    }
    private JSONObject getErrorMessage(String message, int status){
        JSONObject jObj = new JSONObject();
            jObj.put("resultMsg", message == null ? "InvalidToken" :message);
            jObj.put("status", status);

            return jObj;

    }

    
}
