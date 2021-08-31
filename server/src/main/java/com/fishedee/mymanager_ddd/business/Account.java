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

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@ToString
@Getter
@IdGeneratorKey("account")
@Slf4j
public class Account extends BaseEntityType {
    public enum Type {
        IN,//收入
        OUT,//指出
        TRANSFER_IN,//转账收入
        TRANSFER_OUT,//转账支出
    }
    @Id
    private Long id;

    private Long userId;

    private String userName;

    private String name;

    private BigDecimal money;

    private Long categoryId;

    private String categoryName;

    private Long cardId;

    private String cardName;

    @Enumerated(EnumType.STRING)
    private Account.Type type;

    private String remark = "";

    @Transient
    @JsonIgnore
    @Autowired
    private MyLoginUserHolder loginUserHolder;

    protected Account(){

    }

    public Account(AccountDTO dto){
        ValidatorUtil.check(dto);
        this.update(dto);
        this.id = idGenerator.nextLong(this);
        this.userId = loginUserHolder.getCurrentUser().getId();
        this.userName = loginUserHolder.getCurrentUser().getName();
    }

    private void update(AccountDTO dto){
        this.name = dto.getName();
        this.cardId = dto.getCardId();
        this.cardName = dto.getCardName();
        this.categoryId = dto.getCategoryId();
        this.categoryName = dto.getCategoryName();
        this.type = dto.getType();
        this.money = dto.getMoney();
        this.remark = dto.getRemark();
    }

    public void mod(AccountDTO dto){
        ValidatorUtil.check(dto);
        this.update(dto);
        if( this.userId.equals(loginUserHolder.getCurrentUser().getId()) == false ){
            throw new WebBoostException(1,"你没有权限执行此操作",null);
        }
        this.userName = loginUserHolder.getCurrentUser().getName();
    }

}
