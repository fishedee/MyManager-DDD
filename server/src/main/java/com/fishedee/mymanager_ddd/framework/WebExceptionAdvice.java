package com.fishedee.mymanager_ddd.framework;

import com.fishedee.id_generator.IdGeneratorException;
import com.fishedee.jpa_boost.JPABoostException;
import com.fishedee.web_boost.LogTimeHandlerInterceptor;
import com.fishedee.web_boost.WebBoostExceptionAdvice;
import com.fishedee.web_boost.WebBoostResponseAdvice;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.ValidationException;

@ControllerAdvice
public class WebExceptionAdvice extends WebBoostExceptionAdvice {
    //自定义异常的拦截返回
    @ExceptionHandler(JPABoostException.class)
    @ResponseBody
    public WebBoostResponseAdvice.ResponseResult exceptionHandler(JPABoostException e){
        return new WebBoostResponseAdvice.ResponseResult(HttpStatus.OK,1,e.getMessage(),null);
    }

    @ExceptionHandler(IdGeneratorException.class)
    @ResponseBody
    public WebBoostResponseAdvice.ResponseResult exceptionHandler(IdGeneratorException e){
        return new WebBoostResponseAdvice.ResponseResult(HttpStatus.OK,1,e.getMessage(),null);
    }

    @ExceptionHandler(ValidationException.class)
    @ResponseBody
    public WebBoostResponseAdvice.ResponseResult exceptionHandler(ValidationException e){
        return new WebBoostResponseAdvice.ResponseResult(HttpStatus.OK,1,e.getMessage(),null);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseBody
    public WebBoostResponseAdvice.ResponseResult exceptionHandler(AccessDeniedException e){
        return new WebBoostResponseAdvice.ResponseResult(HttpStatus.OK,1,"没有权限访问",null);
    }
}
