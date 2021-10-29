package com.fishedee.mymanager_ddd.infrastructure;

import com.fishedee.jpa_boost.CurdRepository;
import com.fishedee.mymanager_ddd.business.ConcurrentUser;
import org.springframework.stereotype.Component;

@Component
public class ConcurrentUserRepository extends CurdRepository<ConcurrentUser,Long> {
}
