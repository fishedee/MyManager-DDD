package com.fishedee.mymanager_ddd.business;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fishedee.id_generator.IdGeneratorKey;
import com.fishedee.mymanager_ddd.framework.MyLoginUserHolder;
import com.fishedee.security_boost.DefaultUserDetail;
import com.fishedee.security_boost.LoginUserHolder;
import com.fishedee.util_boost.utils.BaseEntityType;
import com.fishedee.util_boost.utils.ValidatorUtil;
import com.fishedee.web_boost.WebBoostException;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.math.BigDecimal;

@Entity
@ToString
@Getter
@IdGeneratorKey("card")
@Slf4j
public class Card extends BaseEntityType {
    @Id
    private Long id;

    private Long userId;

    private String userName;

    private String name;

    private String bank;

    private String card;

    private BigDecimal money;

    private String remark;

    @Transient
    @JsonIgnore
    @Autowired
    private MyLoginUserHolder loginUserHolder;

    protected Card(){

    }

    public Card(CardDTO dto){
        ValidatorUtil.check(dto);
        this.update(dto);
        this.id = idGenerator.nextLong(this);
        this.userId = loginUserHolder.getCurrentUser().getId();
        this.userName = loginUserHolder.getCurrentUser().getName();
    }

    private void update(CardDTO dto){
        this.name = dto.getName();
        this.bank = dto.getBank();
        this.card = dto.getCard();
        this.money = dto.getMoney();
        this.remark = dto.getRemark();
    }

    public void mod(CardDTO dto){
        ValidatorUtil.check(dto);
        this.update(dto);
        if( this.userId.equals(loginUserHolder.getCurrentUser().getId()) == false ){
            throw new WebBoostException(1,"你没有权限执行此操作",null);
        }
        this.userName = loginUserHolder.getCurrentUser().getName();
    }

}
