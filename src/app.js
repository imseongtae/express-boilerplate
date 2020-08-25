const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');
// DB
const db = require('./db/models');
const passportConfig = require('./passport');
const app = express();

const userRouter = require('./routes/user');

// 모델의 정수를 수정하면 자동으로 반영되지 않는 문제가 발생한다.
// force: true를 주면 마이그레이션 없이 디비를 다시 만들 수 있다.
// 데이터가 있다면 마이그레이션은 필수
db.sequelize.sync();
passportConfig(); // 서버가 시작될 때 passport 동작시킴

app.use(morgan('dev'));
// 미들웨어는 요청과 응답을 조작한다.
app.use(cors());
// json 데이터를 받기 위한 처리, 순서대로 내려오면서 json이면 req.body에 넣어줌
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // form data를 action으로 전송할 때 req.body에 넣어줌
// session이랑 밀접한 연관이 있는 쿠키도 해석을 해주어야 하므로 미들웨어에서 사용, 암호화 되어 있을 수 있음
app.use(cookie('cookiesecret')); // 쿠키 파서 미들웨어에도 같은 키를 넣는다.
// session을 하려면 session 모듈 필요, 설정은 아래 두개 항목만 지정
app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: 'cookiesecret', // 암호화한 것을 해독할 수 있는 키
	}),
);
app.use(passport.initialize()); // initialize를 통해 요청에 로그인과 로그아웃 기능을 만들어줌
app.use(passport.session()); // 사용자가 로그인한 정보를 기록할 수 있는 세션을 만듦

// routing
app.use('/user', userRouter);

app.get('/', (req, res) => {
	return res.status(200).json({ message: 'hello world' });
});

app.listen(3000, () => {
	console.log('Server running at localhost:3000');
});
