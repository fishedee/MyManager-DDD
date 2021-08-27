package com.fishedee.mymanager_ddd.framework;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.Data;

@Data
public class WebBoostRequestBox<T> {
    @JsonUnwrapped
    private T data;

    public T unwrap(){
        return this.data;
    }
}
