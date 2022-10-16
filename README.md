# 原神提瓦特小助手

**请注意：此项目并非miHoYo/COGNOSPHERE的官方项目，作者承诺不侵犯任何用户的隐私**

这是一个通过调用米游社/HoYoLAB API的一个查询工具，可以通过UID查询玩家信息

**访问地址：https://teyvet.amekiri.com**

## 部署

本项目支持Docker一键部署，只需要输入：
````shell
docker push amekiri/teyvet-helper:0.0.0
docker run -itd --name teyvet-helper -p 80:3000 amekiri/teyvet-helper
````

## 常见问题

### 显示“暂时不支持国服”

由于不知道国服的DS算法，因此暂时不支持查询国服。若有人知道其算法，可以联系作者

### 显示“Data is not public for the user”

由于用户未注册米游社/HoYoLAB，或者用户设置隐藏信息，导致无法进行查询

## HoYoLAB API使用：

由于国内无法通过正常方式访问HoYoLAB，导致国际服账号的信息无法在国内获取，而以下API可以帮助用户获取国际服账号的信息

### 查询角色基本信息

- API：https://teyvet.amekiri.com/api/BasicInfo
- 请求方法：GET/POST
- 参数：
  - server：服务器（cn_gf01，cn_qd01，os_asia，os_usa，os_cht，os_euro）
  - uid：玩家游戏UID
  - cookie(可选): 用户Cookie（可通过米游社/HoYoLAB获取）

### 查询角色详细信息

- API：https://teyvet.amekiri.com/api/DetailInfo
- 请求方法：GET/POST
- 参数：
  - server：服务器（cn_gf01，cn_qd01，os_asia，os_usa，os_cht，os_euro）
  - uid：玩家游戏UID
  - cookie(可选): 用户Cookie（可通过米游社/HoYoLAB获取）

### 查询当期和上期深渊数据

- API：https://teyvet.amekiri.com/api/AbyssInfo
- 请求方法：GET/POST
- 参数：
  - server：服务器（cn_gf01，cn_qd01，os_asia，os_usa，os_cht，os_euro）
  - uid：玩家游戏UID
  - type：请求类型（1为当期，2为上期）
  - cookie(可选): 用户Cookie（可通过米游社/HoYoLAB获取）
