function checkCookie (req, res, next) {
	if (req.header('Set-Cookie')) {
		console.log(req.header('Set-Cookie'))
		next()
	}else{
		const cookieKey = "KSIJS6shs7qd7djs"
		// res.cookie('_session_key', cookieKey)
		res.set('Cookie', '_session_key='+cookieKey)
		console.log("куков нет.")
		next()
	}
	
}

module.exports.checkCookie = checkCookie;