package com.fishedee.mymanager_ddd.business;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fishedee.id_generator.IdGeneratorKey;
import com.fishedee.util_boost.utils.BaseEntityType;
import com.fishedee.util_boost.utils.ValidatorUtil;
import lombok.Getter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;

@Entity
@Getter
@ToString
@IdGeneratorKey("user")
public class User extends BaseEntityType {
    public enum Role{
        ADMIN,//超级管理员
        USER,//普通管理员
    }

    public enum IsEnabeld{
        ENABLE,
        DISABLE,
    }
    @Id
    private Long id;

    private String name;

    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private Role roles;

    private String remark;

    @Enumerated(EnumType.STRING)
    private IsEnabeld isEnabled;

    @Transient
    @JsonIgnore
    @Autowired
    private UserCheckSameNameStrategy userCheckSameNameStrategy;

    protected User(){

    }

    public  User(UserDTO userDTO){
        ValidatorUtil.check(userDTO);
        userCheckSameNameStrategy.checkNameWhenCreated(userDTO.getName());
        this.id = this.idGenerator.nextLong(this);
        this.update(userDTO);
    }

    private void update(UserDTO userDTO){
        this.name = userDTO.getName();
        this.roles = userDTO.getRoles();
        this.remark = userDTO.getRemark();
        this.isEnabled = userDTO.getIsEnabled();
    }

    public void mod(UserDTO userDTO){
        ValidatorUtil.check(userDTO);
        userCheckSameNameStrategy.checkNameWhenUpdated(this.id, userDTO.getName());
        this.update(userDTO);
    }

    public void modPassword(String password){
        this.password = password;
    }
}
