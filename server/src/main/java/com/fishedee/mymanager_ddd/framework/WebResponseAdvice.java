package com.fishedee.mymanager_ddd.framework;

import com.fishedee.web_boost.WebBoostResponseAdvice;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackages = "com.fishedee.mymanager_ddd")
public class WebResponseAdvice extends WebBoostResponseAdvice {
}
