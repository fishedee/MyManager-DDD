#创建数据库
drop database if exists FishMoney;
create database FishMoney;
use FishMoney;

# boost基础用库
create table id_generator_config(
        `key` char(32) not null,
        template char(64) not null,
        step integer not null,
        initial_value char(64) not null,
        primary key(`key`)
)engine=innodb default charset=utf8 auto_increment = 10001;

insert into id_generator_config(`key`,template,step,initial_value) values
('user','{id}',10,1000),
('sales_order','XSDD{year}{month}{day}{id:8}',10,'0');

create table persistent_logins(
                                  username varchar(64) not null,
                                  series varchar(64) not null,
                                  token varchar(64) not null,
                                  last_used datetime not null,
                                  primary key(series)
)engine=innodb default charset=utf8 auto_increment = 10001;

# 创建用户表
create table user(
                     id integer not null,
                     name char(32) not null,
                     password char(60) not null,
                     roles varchar(128) not null,
                     remark varchar(255) not null,
                     is_enabled integer not null,
                     create_time timestamp not null,
                     modify_time timestamp not null,
                     primary key( id )
)engine=innodb default charset=utf8 auto_increment = 10001;

#创建类目表
create table category(
                           id integer not null,
                           user_id integer not null,
                           name char(32) not null,
                           remark varchar(128) not null,
                           create_time timestamp not null,
                           modify_time timestamp not null,
                           primary key( id )
)engine=innodb default charset=utf8 auto_increment = 10001;

alter table category add index userIdIndex(user_id);

#创建银行卡表
create table card(
                       id integer not null,
                       user_id integer not null,
                       name char(32) not null,
                       bank char(32) not null,
                       card varchar(32) not null,
                       money integer not null,
                       remark varchar(128) not null,
                       create_time timestamp not null,
                       modify_time timestamp not null,
                       primary key( id )
)engine=innodb default charset=utf8 auto_increment = 10001;

alter table card add index userIdIndex(user_id);

#创建记账表
create table account(
                          id integer not null auto_increment,
                          user_id integer not null,
                          name char(32) not null,
                          money integer not null,
                          remark varchar(128) not null,
                          category_id integer not null,
                          card_id integer not null,
                          type integer not null,
                          createTime timestamp not null,
                          modifyTime timestamp not null,
                          primary key( id )
)engine=innodb default charset=utf8 auto_increment = 10001;

alter table account add index userIdIndex(user_id);



insert into user(id,name,roles,remark,is_enabled,password,create_time,modify_time) values
(10002,'fish','admin','',1,'$2a$12$WtxiMJuXjgzCpa1OWT8hR.wMpxq0DbeF1fMpCJbdzCdhdYte1ZtfC',now(),now());

insert into category(category_id,user_id,name,remark,create_time,modify_time) values
(10001,10001,"日常收支",'',now(),now()),
(10002,10001,"衣着服装",'',now(),now()),
(10003,10001,"理财投资",'',now(),now()),
(10004,10001,"薪酬工资",'',now(),now());

insert into card(card_id,user_id,name,bank,card,money,remark,create_time,modify_time) values
(10001,10001,'工资卡',"农业银行卡",'',0,'',now(),now()),
(10002,10001,'消费卡',"工商银行卡",'',0,'',now(),now()),
(10003,10001,'理财卡',"工商银行卡",'',0,'',now(),now());

insert into account(account_id,user_id,name,money,remark,category_id,card_id,type,create_time,modify_time) values
(10001,10001,"日常支出",100,'',10001,10002,1,now(),now()),
(10002,10001,"日常收入",100,'',10001,10002,2,'2014-11-10 12:0:0','2014-11-10 12:0:0'),
(10003,10001,"日常收入",100,'',10001,10002,3,'2014-10-10 12:0:0','2014-10-10 12:0:0');

#显示一下所有数据
select * from user;
select * from t_category;
select * from t_card;
select * from t_account;


