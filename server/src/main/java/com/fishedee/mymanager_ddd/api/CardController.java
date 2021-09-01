package com.fishedee.mymanager_ddd.api;

import com.fishedee.jpa_boost.CurdFilter;
import com.fishedee.jpa_boost.CurdFilterBuilder;
import com.fishedee.jpa_boost.CurdFilterable;
import com.fishedee.mymanager_ddd.business.Card;
import com.fishedee.mymanager_ddd.business.CardDTO;
import com.fishedee.mymanager_ddd.framework.TenantCurdController;
import com.fishedee.mymanager_ddd.infrastructure.CardRepository;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@RestController
@RequestMapping("/api/card")
@Slf4j
public class CardController extends TenantCurdController<Card,Long, CardDTO, CardController.Filter> {

    @Autowired
    private CardRepository cardRepository;

    @PostConstruct
    public void init(){
        this.setCurdRepository(cardRepository);
    }

    @Data
    public static class Filter implements CurdFilterable {
        private Long userId;

        private String remark;

        private String name;

        private String bank;

        @Override
        public CurdFilter getFilter(){
            CurdFilterBuilder builder = new CurdFilterBuilder();
            if( remark != null){
                builder.like("remark","%"+remark+"%");
            }
            if( name != null){
                builder.like("name","%"+name+"%");
            }
            if( bank != null){
                builder.like("bank","%"+bank+"%");
            }
            if( userId != null){
                builder.equal("userId",userId);
            }
            return builder;
        }
    }
}

