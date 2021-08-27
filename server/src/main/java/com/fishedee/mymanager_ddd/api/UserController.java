package com.fishedee.mymanager_ddd.api;

import com.fishedee.jpa_boost.CurdFilter;
import com.fishedee.jpa_boost.CurdFilterBuilder;
import com.fishedee.jpa_boost.CurdFilterable;
import com.fishedee.mymanager_ddd.business.User;
import com.fishedee.mymanager_ddd.business.UserDTO;
import com.fishedee.mymanager_ddd.framework.CurdController;
import com.fishedee.mymanager_ddd.infrastructure.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@RestController
@RequestMapping("/user")
public class UserController extends CurdController<Long, UserDTO, User, UserController.UserFilter> {

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void init(){
        this.setCurdRepository(userRepository);
    }

    @Data
    public static class UserFilter implements CurdFilterable {
        @Override
        public CurdFilter getFilter(){
            CurdFilterBuilder builder = new CurdFilterBuilder();
            return builder;
        }
    }
}
