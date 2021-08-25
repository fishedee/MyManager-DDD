package com.fishedee.mymanager_ddd;

import com.fishedee.jpa_boost.lint.EnableJPALint;
import com.fishedee.mymanager_ddd.framework.MyLinter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@EnableTransactionManagement(proxyTargetClass = true)
@EnableAspectJAutoProxy(exposeProxy = true)
@EnableJPALint(
        allowIdHaveGeneratedValue = true,
        extraLinters = {
                MyLinter.class,
        }
)
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
public class App 
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }
}
