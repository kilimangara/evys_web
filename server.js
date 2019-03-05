var express = require('express')
var app = express()
//serves the index.html

app.use('/dist', express.static(__dirname + '/dist'))
app.use('/frontend/favicon', express.static(__dirname + '/public/favicon'))
app.use('/frontend/images', express.static(__dirname + '/public/images'))

app.get('*.js', function(req, res, next) {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    res.set('Content-Type', 'text/javascript')
    next()
})

app.get('/admin*', function(req, res) {
    res.sendFile('./dist/index_admin.html', { root: __dirname })
})

app.get('/login', function(req, res) {
    res.sendFile('./dist/index_student.html', { root: __dirname })
})

app.get('/app*', function(req, res) {
    res.sendFile('./dist/index_student.html', { root: __dirname })
})
app.listen(3000) //listens on port 3000 -> http://localhost:3000/
