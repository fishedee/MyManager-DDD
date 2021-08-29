package com.fishedee.mymanager_ddd.infrastructure;

import com.fishedee.jpa_boost.CurdFilterBuilder;
import com.fishedee.jpa_boost.CurdPageAll;
import com.fishedee.jpa_boost.CurdRepository;
import com.fishedee.mymanager_ddd.business.User;
import com.fishedee.mymanager_ddd.business.UserCheckSameNameStrategy;
import com.fishedee.web_boost.WebBoostException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserRepository extends CurdRepository<User,Long> implements UserCheckSameNameStrategy {
    private List<User> getByName(String name){
        CurdFilterBuilder builder = new CurdFilterBuilder();
        builder.equal("name",name);
        return this.findByFilter(builder,new CurdPageAll(),false,false).getData();
    }

    @Override
    public void checkNameWhenCreated(String newName){
        List<User> userList = this.getByName(newName);
        if( userList.size() != 0 ){
            throw new WebBoostException(1,"重复的名字:"+newName,null);
        }
    }

    @Override
    public void checkNameWhenUpdated(Long id,String newName){
        List<User> userList = this.getByName(newName);
        if( userList.size() != 0 &&
            userList.get(0).getId().longValue() != id.longValue()){
            throw new WebBoostException(1,"重复的名字:"+newName,null);
        }
    }
}
