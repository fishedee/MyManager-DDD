package com.fishedee.mymanager_ddd.framework;

import com.fishedee.security_boost.DefaultUserDetail;
import com.fishedee.security_boost.LoginUserHolder;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MyLoginUserHolder {
    @Autowired
    private LoginUserHolder loginUserHolder;

    public static class MyUserDetail {
        private DefaultUserDetail defaultUserDetail;
        MyUserDetail(DefaultUserDetail defaultUserDetail){
            this.defaultUserDetail = defaultUserDetail ;
        }

        public Long getId(){
            return Long.valueOf(this.defaultUserDetail.getId());
        }

        public String getName(){
            return this.defaultUserDetail.getName();
        }
    }

    public MyUserDetail getCurrentUser(){
        DefaultUserDetail defaultUserDetail =  (DefaultUserDetail)this.loginUserHolder.getCurrentUser().getUserDetails();
        return new MyUserDetail(defaultUserDetail);
    }
}
