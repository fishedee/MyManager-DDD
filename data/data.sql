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
('user','{id}',10,'20001'),
('category','{id}',10,'20001'),
('card','{id}',10,'20001'),
('account','{id}',10,'20001');

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
                     is_enabled char(16) not null,
                     create_time timestamp not null,
                     modify_time timestamp not null,
                     primary key( id )
)engine=innodb default charset=utf8 auto_increment = 10001;

#创建类目表
create table category(
                           id integer not null,
                           user_id integer not null,
                           user_name char(32) not null,
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
                       user_name char(32) not null,
                       name char(32) not null,
                       bank char(32) not null,
                       card varchar(32) not null,
                       money decimal(14,2) not null,
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
                          user_name char(32) not null,
                          name char(32) not null,
                          money integer not null,
                          remark varchar(128) not null,
                          category_id integer not null,
                          category_name char(32) not null,
                          card_id integer not null,
                          card_name char(32) not null,
                          type char(32) not null,
                          create_time timestamp not null,
                          modify_time timestamp not null,
                          primary key( id )
)engine=innodb default charset=utf8 auto_increment = 10001;

alter table account add index userIdIndex(user_id);



insert into user(id,name,roles,remark,is_enabled,password,create_time,modify_time) values
(10001,'fish','ADMIN','','ENABLE','$2a$12$WtxiMJuXjgzCpa1OWT8hR.wMpxq0DbeF1fMpCJbdzCdhdYte1ZtfC',now(),now());

insert into category(id,user_id,user_name,name,remark,create_time,modify_time) values
(10001,10001,'fish',"日常收支",'',now(),now()),
(10002,10001,'fish',"衣着服装",'',now(),now()),
(10003,10001,'fish',"理财投资",'',now(),now()),
(10004,10001,'fish',"薪酬工资",'',now(),now());

insert into card(id,user_id,user_name,name,bank,card,money,remark,create_time,modify_time) values
(10001,10001,'fish','工资卡',"农业银行卡",'',0,'',now(),now()),
(10002,10001,'fish','消费卡',"工商银行卡",'',0,'',now(),now()),
(10003,10001,'fish','理财卡',"工商银行卡",'',0,'',now(),now());

insert into account(id,user_id,user_name,name,money,remark,category_id,category_name,card_id,card_name,type,create_time,modify_time) values
(10001,10001,'fish',"日常支出",100,'',10001,"日常收支",10002,'消费卡','in',now(),now()),
(10002,10001,'fish',"日常收入",100,'',10001,"日常收支",10002,'消费卡','out','2014-11-10 12:0:0','2014-11-10 12:0:0'),
(10003,10001,'fish',"日常收入",100,'',10001,"日常收支",10002,'消费卡','transfer-in','2014-10-10 12:0:0','2014-10-10 12:0:0');

#显示一下所有数据
select * from user;
select * from category;
select * from card;
select * from account;


