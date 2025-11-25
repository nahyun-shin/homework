package back.smart.code.filter;

import back.smart.code.common.utils.JWTUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;

@RequiredArgsConstructor
public class LoginCustomFilter extends UserNamgePasswordAuthenticationFilter{

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;

    //유효시간
    private final static long ACCESS_TOKEN_EXPIRATION_TIME = 86400L;
    private final static long REFRESH_TOKEN_EXPIRATION_TIME = 86400L*2;

}
