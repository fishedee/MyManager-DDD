package com.fishedee.mymanager_ddd.framework;

import com.fishedee.id_generator.IdGeneratorException;
import com.fishedee.jpa_boost.JPABoostException;
import com.fishedee.util_boost.web.UtilBoostExceptionAdvice;
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
public class WebExceptionAdvice extends UtilBoostExceptionAdvice {
}
