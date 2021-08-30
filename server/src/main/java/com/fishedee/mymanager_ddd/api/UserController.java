package com.fishedee.mymanager_ddd.api;

import com.fishedee.jpa_boost.CurdFilter;
import com.fishedee.jpa_boost.CurdFilterBuilder;
import com.fishedee.jpa_boost.CurdFilterable;
import com.fishedee.mymanager_ddd.business.User;
import com.fishedee.mymanager_ddd.business.UserDTO;
import com.fishedee.mymanager_ddd.framework.CurdController;
import com.fishedee.mymanager_ddd.infrastructure.UserRepository;
import com.fishedee.util_boost.annotation.TransactionalForWrite;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController extends CurdController<User,Long, UserDTO, UserController.Filter> {

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void init(){
        this.setCurdRepository(userRepository);
    }

    @Data
    public static class Filter implements CurdFilterable {
        private String name;

        private String remark;

        @Override
        public CurdFilter getFilter(){
            CurdFilterBuilder builder = new CurdFilterBuilder();
            if( name != null){
                builder.like("name","%"+name+"%");
            }
            if( remark != null){
                builder.like("remark","%"+remark+"%");
            }
            return builder;
        }
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    protected void postAdd(User user){
        user.modPassword(passwordEncoder.encode("123"));
    }

    @PostMapping("/modPassword")
    @TransactionalForWrite
    public void modPassword(Long userId,String password){
        User user = this.userRepository.get(userId);
        user.modPassword(passwordEncoder.encode(password));
    }
}
