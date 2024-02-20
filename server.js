const app = require('./app.js');
const dotenv = require('dotenv');

dotenv.config();

const listener = app.listen(process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});