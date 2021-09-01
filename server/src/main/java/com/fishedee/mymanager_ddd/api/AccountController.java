package com.fishedee.mymanager_ddd.api;

import com.fishedee.jpa_boost.CurdFilter;
import com.fishedee.jpa_boost.CurdFilterBuilder;
import com.fishedee.jpa_boost.CurdFilterable;
import com.fishedee.mymanager_ddd.business.*;
import com.fishedee.mymanager_ddd.framework.TenantCurdController;
import com.fishedee.mymanager_ddd.infrastructure.AccountRepository;
import com.fishedee.mymanager_ddd.infrastructure.CardRepository;
import com.fishedee.mymanager_ddd.infrastructure.CategoryRepository;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@RestController
@RequestMapping("/api/account")
@Slf4j
public class AccountController extends TenantCurdController<Account,Long, AccountDTO, AccountController.Filter> {

    @Autowired
    private AccountRepository accountRepository;

    @PostConstruct
    public void init(){
        this.setCurdRepository(accountRepository);
    }

    @Data
    public static class Filter implements CurdFilterable {
        private Long userId;

        private String remark;

        private String name;

        private Account.Type type;

        private Long cardId;

        private Long categoryId;

        @Override
        public CurdFilter getFilter(){
            CurdFilterBuilder builder = new CurdFilterBuilder();
            if( remark != null){
                builder.like("remark","%"+remark+"%");
            }
            if( name != null){
                builder.like("name","%"+name+"%");
            }
            if( userId != null){
                builder.equal("userId",userId);
            }
            if( type != null){
                builder.equal("type",type);
            }
            if( cardId != null){
                builder.equal("cardId",cardId);
            }
            if( categoryId != null){
                builder.equal("categoryId",categoryId);
            }
            return builder;
        }
    }
}

