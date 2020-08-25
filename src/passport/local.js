const passport = require('passport');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');
const db = require('../db/models');

module.exports = () => {
	// 모듈을 사용하기 위한 규칙
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email', // email에는 req.body.email
				passwordField: 'password', // req.body.password
			},
			async (email, password, done) => {
				// 3개의 값이 들어옴, done은 콜백함수의 역할을 함
				// 검사를 이 부분👇에서 진행하는데, 그냥 DB를 사용해서 진행하면 됨
				try {
					const exUser = await db.User.findOne({ where: { email } });
					if (!exUser) {
						// done은 '에러, 성공, 실패'와 같이 3개의 인수를 전달받는다.
						// 존재하지 않는 사용자이므로 로그인에 대한 실패 done 함수
						return done(null, false, { reason: '존재하지 않는 사용자입니다.' });
					}
					// 사용자가 존재하면 비빌번호 비교를 진행, 비밀번호가 맞으면 로그인, 틀리면 비밀번호 오류
					// bcrypt.hash를 통해 암호화를 했는데, 그것과 비교하는 로직 일치하면 true, 다르면 false
					const result = await bcrypt.compare(password, exUser.password);
					if (result) {
						// 사용자가 존재하고, 비밀번호가 맞으면 로그인 성공, 두 번째 자리에 유저 객체를 넣어준다
						return done(null, exUser);
					} else {
						// 실패했다면 '에러, 성공, 실패' 자리에 메시지를 입력한다.
						return done(null, false, { reason: '비밀번호가 틀립니다.' });
					}
				} catch (err) {
					console.error(err);
					return done(err); // 첫 번째가 에러자리이므로 에러를 처리할 수 있다.
				}
			},
		),
	);
};
