# MyManager-DDD

MyManager 的 DDD 版本

# 技术栈

整体架构，DDD 驱动

后端：

- SpringBoot，基础框架
- SpringSecurity，登录态
- JPA，数据库 ORM

前端：

- React，基础框架
- Ant-Design，组件库
- Formily，表单库
- Antd-Formily-Boost，辅助组件库

# 启动

```bash
git clone git@github.com:fishedee/MyManager-DDD.git
```

下载代码

```bash
cd data
mysql -uroot -p < data.sql
```

加载数据库脚本

```bash
cd server
SPRING_PROFILES_ACTIVE=development mvn spring-boot:run
```

启动后端服务器

```bash
cd static
npm install
npm start
```

启动前端服务器

打开页面 localhost:8000 即可
