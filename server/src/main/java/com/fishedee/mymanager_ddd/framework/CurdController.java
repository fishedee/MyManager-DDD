package com.fishedee.mymanager_ddd.framework;

import com.fishedee.jpa_boost.*;
import com.fishedee.reflection_boost.GenericActualArgumentExtractor;
import com.fishedee.util_boost.annotation.TransactionalForWrite;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.util.List;

@Validated
@Slf4j
public class CurdController<EntityT,IdT extends Serializable,DtoT,FilterT extends CurdFilterable> {
    @Autowired
    protected QueryRepository queryRepository;

    private CurdRepository<EntityT,IdT> curdRepository;

    private Class<EntityT> entityClazz;

    private Class<DtoT> dtoClazz;

    private Constructor<EntityT> entityConstructor;

    private Method entityGetIdMethod;

    private Method entityModMethod;

    public CurdController(){
        GenericActualArgumentExtractor extractor = new GenericActualArgumentExtractor(getClass(),CurdController.class);
        this.entityClazz = extractor.getActualType(0);
        this.dtoClazz = extractor.getActualType(2);

        try {
            this.entityConstructor = this.entityClazz.getDeclaredConstructor(this.dtoClazz);
            this.entityGetIdMethod = this.entityClazz.getDeclaredMethod("getId");
            this.entityModMethod = this.entityClazz.getDeclaredMethod("mod",this.dtoClazz);
        }catch(SecurityException e ){
            throw new RuntimeException(e);
        }catch(NoSuchMethodException e ){
            throw new RuntimeException(e);
        }
    }

    protected void setCurdRepository(CurdRepository<EntityT,IdT> curdRepository){
        this.curdRepository = curdRepository;
    }

    protected void preSearch(FilterT filterT,PageDTO pageDTO){

    }

    protected Page<List<EntityT>> postSearch(Page<List<EntityT>> data){
        return data;
    }

    @GetMapping("/search")
    public Page<List<EntityT>> search(FilterT filter, PageDTO pageDTO){
        preSearch(filter,pageDTO);
        Page<List<EntityT>> result =  this.queryRepository.findByFilter(entityClazz,filter,pageDTO.getPageable().withCount().withSort("id desc"));
        return postSearch(result);
    }

    protected void preGetBatch(List<IdT> ids){

    }

    protected List<EntityT> postGetBatch(List<EntityT> data){
        return data;
    }

    @GetMapping("/getBatch")
    public List<EntityT> getBatch(List<IdT> ids){
        preGetBatch(ids);
        List<EntityT> result =  this.curdRepository.getBatch(ids);
        result = postGetBatch(result);
        return result;
    }

    protected void preGet(IdT ids){

    }

    protected EntityT postGet(EntityT data){
        return data;
    }

    @GetMapping("/get")
    public EntityT get(IdT id){
        preGet(id);
        EntityT result = this.curdRepository.get(id);
        result = postGet(result);
        return result;
    }

    protected void preAdd(DtoT data){

    }

    protected void postAdd(EntityT entity){
    }

    @PostMapping("/add")
    @TransactionalForWrite
    public IdT add(DtoT data)throws Exception{
        try{
            preAdd(data);
            EntityT entity = this.entityConstructor.newInstance(data);
            postAdd(entity);
            this.curdRepository.add(entity);
            return (IdT)entityGetIdMethod.invoke(entity);
        }catch(IllegalAccessException e ){
            throw new RuntimeException(e);
        }catch(IllegalArgumentException e ){
            throw new RuntimeException(e);
        }catch(InstantiationException e ){
            throw new RuntimeException(e);
        }catch(InvocationTargetException e ){
            throw (Exception) e.getCause();
        }
    }

    protected void preMod(DtoT data,IdT id){

    }

    protected void postMod(EntityT entity){
    }

    @PostMapping("mod")
    @TransactionalForWrite
    public void mod(DtoT data, IdT id)throws Exception{
        try{
            preMod(data,id);
            EntityT entity = this.curdRepository.get(id);
            postMod(entity);
            this.entityModMethod.invoke(entity,data);
        }catch(IllegalAccessException e ){
            throw new RuntimeException(e);
        }catch(IllegalArgumentException e ){
            throw new RuntimeException(e);
        }catch(InvocationTargetException e ){
            throw (Exception) e.getCause();
        }
    }

    protected void preDel(IdT id){

    }

    protected void postDel(EntityT entity){
    }

    @PostMapping("del")
    @TransactionalForWrite
    public void del(IdT id){
        preDel(id);
        EntityT entity = this.curdRepository.get(id);
        postDel(entity);
        this.curdRepository.del(entity);
    }
}
