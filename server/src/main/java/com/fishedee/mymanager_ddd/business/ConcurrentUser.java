package com.fishedee.mymanager_ddd.business;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fishedee.id_generator.IdGenerator;
import com.fishedee.id_generator.IdGeneratorKey;
import lombok.Getter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity
@ToString
@Getter
@IdGeneratorKey("concurrentUser")
public class ConcurrentUser {
    @Id
    private Long id;

    private Integer age;

    @Autowired
    @Transient
    @JsonIgnore
    private IdGenerator idGenerator;

    protected ConcurrentUser(){

    }

    public ConcurrentUser(int age){
        this.id = idGenerator.nextLong(this);
        this.age = age;
    }

    public void incAge(){
        this.age = this.age+1;
    }
}
