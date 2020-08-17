# Express boilerplate



## sequelize
`.sequelizerc` 설정 후 아래 명령어 실행

```bash
$ npx sequelize init
```  
- 아래와 같은 구조가 반환됨

```bash
├── package.json
├── package-lock.json
└── src
    ├── db
    │   ├── config
    │   │   └── config.js
    │   ├── migrations
    │   ├── models
    │   │   └── index.js
    │   └── seeders
    └── app.js
```


### Model

```bash
$ npx sequelize model:generate --name Task --attributes taskName: string
$ npx sequelize model:generate --name User --attributes name:string
```
