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
@IdGeneratorKey("category")
@Slf4j
public class Category extends BaseEntityType {
    @Id
    private Long id;

    private Long userId;

    private String userName;

    private String name;

    private String remark;

    @Transient
    @JsonIgnore
    @Autowired
    private MyLoginUserHolder loginUserHolder;

    protected Category(){

    }

    public Category(CategoryDTO dto){
        ValidatorUtil.check(dto);
        this.update(dto);
        this.id = idGenerator.nextLong(this);
        this.userId = loginUserHolder.getCurrentUser().getId();
        this.userName = loginUserHolder.getCurrentUser().getName();
    }

    private void update(CategoryDTO dto){
        this.name = dto.getName();
        this.remark = dto.getRemark();
    }

    public void mod(CategoryDTO dto){
        ValidatorUtil.check(dto);
        this.update(dto);
        if( this.userId.equals(loginUserHolder.getCurrentUser().getId()) == false ){
            throw new WebBoostException(1,"你没有权限执行此操作",null);
        }
        this.userName = loginUserHolder.getCurrentUser().getName();
    }

}
