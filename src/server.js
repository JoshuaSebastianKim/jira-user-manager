
const express = require('express');

const app = express();

app.set('views', './src/views');
app.set('view engine', 'pug');
app.use(express.static('dist'));

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(process.env.PORT || 80);
