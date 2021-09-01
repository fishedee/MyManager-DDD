package com.fishedee.mymanager_ddd.api;

import com.fishedee.mymanager_ddd.business.User;
import com.fishedee.mymanager_ddd.framework.MyLoginUserHolder;
import com.fishedee.mymanager_ddd.infrastructure.UserRepository;
import com.fishedee.util_boost.annotation.TransactionalForWrite;
import com.fishedee.web_boost.WebBoostException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotBlank;

@RestController
@RequestMapping("/api/loginUser")
@Validated
public class LoginUserController {
    @Autowired
    private MyLoginUserHolder myLoginUserHolder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/modMyPassword")
    @TransactionalForWrite
    public void modMyPassword(@NotBlank  String oldPassword, @NotBlank  String newPassword){
        Long userId = myLoginUserHolder.getCurrentUser().getId();
        User user = userRepository.get(userId);
        boolean isMatch = passwordEncoder.matches(oldPassword,user.getPassword());
        if( isMatch == false ){
            throw new WebBoostException(1,"旧密码不正确",null);
        }
        user.modPassword(passwordEncoder.encode(newPassword));
    }
}
