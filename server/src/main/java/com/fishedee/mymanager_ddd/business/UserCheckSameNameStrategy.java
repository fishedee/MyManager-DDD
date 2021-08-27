package com.fishedee.mymanager_ddd.business;

public interface UserCheckSameNameStrategy {
    void checkNameWhenCreated(String newName);
    void checkNameWhenUpdated(Long id,String newName);
}
