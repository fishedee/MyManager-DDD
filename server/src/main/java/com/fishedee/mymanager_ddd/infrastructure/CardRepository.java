package com.fishedee.mymanager_ddd.infrastructure;

import com.fishedee.jpa_boost.CurdRepository;
import com.fishedee.mymanager_ddd.business.Card;
import org.springframework.stereotype.Component;

@Component
public class CardRepository extends CurdRepository<Card,Long> {
}
