package com.fishedee.mymanager_ddd.infrastructure;

import com.fishedee.jpa_boost.CurdRepository;
import com.fishedee.mymanager_ddd.business.Card;
import com.fishedee.mymanager_ddd.business.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryRepository extends CurdRepository<Category,Long> {
}
