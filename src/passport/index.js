const passport = require('passport');
const local = require('./local');
const db = require('../db/models');

module.exports = () => {
	// 매개변수로 user, done 을 받는다. 그리고 너무 많이 저장하면 서버에 부담이 간다.
	// 사용자 정보를 가볍게 저장하기 위해 id만 메모리에 저장한다. 서버의 메모리 부담을 줄이기 위해
	passport.serializeUser((user, done) => {
		// req.login 의 User가 이 매개변수를 통해 들어온다.
		return done(null, user.id);
	});

	//
	passport.deserializeUser(async (id, done) => {
		try {
			const user = await db.User.findOne({ where: { id } });
			return done(null, user); // req.user, req.isAuthenticated() === true,
		} catch (err) {
			console.error(err);
			return done(err);
		}
	});
	local();
};
