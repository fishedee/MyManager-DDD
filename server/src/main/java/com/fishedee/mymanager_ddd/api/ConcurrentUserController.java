package com.fishedee.mymanager_ddd.api;

import com.fishedee.mymanager_ddd.business.ConcurrentUser;
import com.fishedee.mymanager_ddd.infrastructure.ConcurrentUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/concurrentUser")
public class ConcurrentUserController {

    @Autowired
    private ConcurrentUserRepository concurrentUserRepository;


    //curl触发 curl http://localhost:9191/api/concurrentUser/incAge\?data\=%7B%22id%22%3A10001%7D
    //wrk性能测试 wrk -t8 -c100 -d10s "http://localhost:9191/api/concurrentUser/incAge?data=%7B%22id%22%3A10001%7D"
    //ab性能测试 ab -n 1000 -c 10 -k "http://localhost:9191/api/concurrentUser/incAge?data=%7B%22id%22%3A10001%7D"
    @GetMapping("/incAge")
    @Transactional
    public void incAge(Long id){
        ConcurrentUser user = concurrentUserRepository.getForLock(id);
        user.incAge();
    }
}
