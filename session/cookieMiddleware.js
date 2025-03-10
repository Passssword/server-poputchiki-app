
function cookieMiddleware (req, res, next) {
	if (req.header('session')) {
		
		let data = req.header('session').split('=')
		console.log(req.method)
		console.log(data)

		next()
	}else{
		const cookieKey = "KSIJS6shs7qd7djs"
		// res.cookie('_session_key', cookieKey)
		res.set('Cookie', '_session_key='+cookieKey)
		console.log("куков нет.")
		next()
	}
	
}

module.exports.cookieMiddleware = cookieMiddleware;