const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

// DB
const db = require('./db/models');
const { noExtendLeft } = require('sequelize/types/lib/operators');
const app = express();

// 모델의 정수를 수정하면 자동으로 반영되지 않는 문제가 발생한다.
// force: true를 주면 마이그레이션 없이 디비를 다시 만들 수 있다.
// 데이터가 있다면 마이그레이션은 필수
db.sequelize.sync();

app.use(cors());
// json 데이터를 받기 위한 처리, 순서대로 내려오면서 json이면 req.body에 넣어줌
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // form data를 action으로 전송할 때 req.body에 넣어줌

app.post('/user', async (req, res, next) => {
	const { email, password, nickname } = req.body;
	try {
		// 암호화
		const hash = await bcrypt.hash(password, 12); // 암호화한 값을 저장한다.
		// 중복에 대한 에러 검증
		const exUser = await db.User.findOne({
			email,
		});
		if (exUser)
			return res.status(403).json({
				errorCode: 1, // 개발자간 에러 코드를 다시 정의해주는 경우도 많다.
				message: '이미 회원가입되어 있습니다.',
			});
		// 403 금지, 401은 권한 없음, 400은 잘못된 요청
		const newUser = await db.User.create({
			email,
			password: hash,
			nickname,
		});
		return res.status(201).json(newUser);
	} catch (error) {
		console.log(error);
		// 실무에서는 최대한 에러가 나지 않는 게 중요
		// if 문을 사용해 분기처리를 하는 경우가 많음
		return next(error);
	}
});

app.listen(3000, () => {
	console.log('Server running at localhost:3000');
});
