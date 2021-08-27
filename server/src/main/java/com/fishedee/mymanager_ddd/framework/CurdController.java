package com.fishedee.mymanager_ddd.framework;

import com.fishedee.jpa_boost.*;
import com.fishedee.util_boost.annotation.TransactionalForWrite;
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
public class CurdController<IdT extends Serializable,DtoT,EntityT,FilterT extends CurdFilterable> {
    @Autowired
    protected QueryRepository queryRepository;

    private CurdRepository<EntityT,IdT> curdRepository;

    private Class<EntityT> entityClazz;

    private Class<DtoT> dtoClazz;

    private Constructor<EntityT> entityConstructor;

    private Method entityGetIdMethod;

    private Method entityModMethod;

    public CurdController(){
        ParameterizedType ptype = (ParameterizedType)this.getClass().getGenericSuperclass();
        this.dtoClazz = (Class)ptype.getActualTypeArguments()[1];
        this.entityClazz = (Class)ptype.getActualTypeArguments()[2];

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

    @GetMapping("/search")
    public Page<List<EntityT>> search(WebBoostRequestBox<FilterT> filter, CurdAntdPageDTO pageDTO){
        return this.queryRepository.findByFilter(entityClazz,filter.unwrap(),pageDTO.getPageable().withCount().withSort("id desc"));
    }

    @GetMapping("/get")
    public EntityT get(@NotNull WebBoostRequestBox<IdT> id){
        return this.curdRepository.get(id.unwrap());
    }

    @PostMapping("/add")
    @TransactionalForWrite
    public IdT add(WebBoostRequestBox<DtoT> data){
        try{
            EntityT entity = this.entityConstructor.newInstance(data.unwrap());
            this.curdRepository.add(entity);
            return (IdT)entityGetIdMethod.invoke(entity);
        }catch(IllegalAccessException e ){
            throw new RuntimeException(e);
        }catch(IllegalArgumentException e ){
            throw new RuntimeException(e);
        }catch(InvocationTargetException e ){
            throw new RuntimeException(e);
        }catch(InstantiationException e ){
            throw new RuntimeException(e);
        }
    }

    @PostMapping("mod")
    @TransactionalForWrite
    public void mod(WebBoostRequestBox<DtoT> data,@NotNull  WebBoostRequestBox<IdT> id){
        try{
            EntityT entity = this.curdRepository.get(id.unwrap());
            this.entityModMethod.invoke(entity,data.unwrap());
        }catch(IllegalAccessException e ){
            throw new RuntimeException(e);
        }catch(IllegalArgumentException e ){
            throw new RuntimeException(e);
        }catch(InvocationTargetException e ){
            throw new RuntimeException(e);
        }
    }

    @PostMapping("del")
    @TransactionalForWrite
    public void del(@NotNull WebBoostRequestBox<IdT> id){
        EntityT entity = this.curdRepository.get(id.unwrap());
        this.curdRepository.del(entity);
    }
}
