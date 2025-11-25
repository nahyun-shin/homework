package back.smart.code.security.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class SecureUserDTO  extends User {

    private static final String ROLE_PREFIX = "ROLE_";

    public SecureUserDTO(String username, String password, String roleName) {
        super(username, password, getAuthority(roleName));
    }


    private static List<GrantedAuthority> getAuthority(String roleName) {
        List<GrantedAuthority> list= new ArrayList<>();
        list.add(new SimpleGrantedAuthority(ROLE_PREFIX + roleName));
        return list;
    }

}
