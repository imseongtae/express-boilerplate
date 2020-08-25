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


## 로그인

- 로그인에 대한 정의는 서비스마다 다르다.
- `passport`라는 모듈이 같은 방식으로 로그인을 구현할 수 있게 도와준다. 즉 `passport`를 통해 인증시스템을 간단하게 구현할 수 있도록 도와준다.
- 그리고 sns 인증을 쉽게 구현하기 위한 passport kakao 등이 있다 

- 쿠키를 기반으로 사용자를 찾는다.


### 로그인 과정
1. email과 password 검사
1. session에 쿠키를 키로 삼아서 유저정보 저장, **user[cookie] = 유저정보**
1. 프론트에 쿠키 내려보내주기

```js
app.post('/user/login', (req, res, next) => {
  const { email, password } = req.body;
  try {
      // 로그인 과정
      // 1. email과 password 검사
      // 2. session에 쿠키를 키로 삼아서 유저정보 저장
      // user[cookie] = 유저정보
      // 3. 프론트에 쿠키 내려보내주기
  } catch (err) {
      console.log(err);
  }
});
```

## passport setting


