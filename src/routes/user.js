const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../db/models');

const router = express.Router();

router.post('/', async (req, res, next) => {
	const { email, password, nickname } = req.body;
	try {
		// 암호화
		const hash = await bcrypt.hash(password, 12); // 암호화한 값을 저장한다.
		// 중복에 대한 에러 검증
		const exUser = await db.User.findOne({
			where: {
				email,
			},
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

// 쿠키를 기반으로 사용자를 찾는다.

// 로그인에 대한 정의는 서비스마다 다르다.
// passport라는 모듈이 같은 방식으로 로그인을 구현할 수 있게 도와준다. 즉 passport를 통해 인증시스템을 간단하게 구현할 수 있도록 도와준다.
// passport kakao가 있다.. passport-local은
router.post('/login', (req, res, next) => {
	try {
		passport.authenticate('local', (err, user, info) => {
			// 콜백함수는 err, user, info 3개의 매개변수를 받는데, 이는 local Strategy done의 인수 3개이다.
			if (err) {
				console.error(err);
				next(err); // 알아서 처리하도록 에러를 넘긴다.
			}
			// 400번대 응답
			if (info) {
				return res.status(401).json(info.reason);
			}
			// 성공할 경우 req.login은 원래 있던 게 아니라 passport.initialize() 를 통해 req에 로그인을 넣어주는 것이다.
			// login은 세션에 사용자 정보를 저장하는 역할을 수행한다. 'user를 세션에 저장'
			// 이 지점에서 발생하는 질문 그래서 세션에 사용자 정보를 어떻게 저장할 것인가?? 여기서 serializeUser가 나온다.
			// 가볍게 정보를 저장하기 위해 serializeUser가 사용되며, req.login을 통해 로그인할 때 한 번만 사용된다.
			return req.login(user, async err => {
				if (err) {
					console.error(err);
					next(err);
				}
				// 쿠키는 프론트로 알아서 내려주므로 걱정 안해도 된다.
				// 헤더에 쿠키가 실리고, body에 user 데이터가 내려간다.
				return res.json(user);
			});
		})(req, res, next);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
