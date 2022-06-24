const express = require('express');
const app = express();
var mysql = require('mysql');
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())
app.set('view engine', 'ejs');
var conn = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'node'
});
conn.connect((err) => {
    if (err) throw err;
    console.log("Connection Successfully");
})
app.get('/',(req, res) => {
    // res.send("Hello express js");
    res.render('insert');

});
app.post('/insert', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var sql = `insert into users(user_name,user_email,user_password) values('${name}','${email}','${password}')`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send("<h1> Data Send</h1>")

    })

})
app.get('/show', (req, res) => {
    var sql = "select * from users";
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.render('show', { users: result });
    })

})
app.get('/delete/:id', (req, res) => {
    var id = req.params.id;
    var sql = `delete from users where user_id='${id}'`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/show')
    })
});
app.get('/edit/:id', (req, res) => {
    var id = req.params.id;
    var sql = `select * from users where user_id='${id}'`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        // res.redirect('edit', { users: result })
        res.render('edit', { users: result })

    })
})
app.post('/update/:id', (req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var sql = `update users set user_name='${name}',user_email='${email}',user_password='${password}' where user_id='${id}'`;
    conn.query(sql, (err, result) => {
        console.log(result);
        if (err) throw err;
        res.redirect('/show')

    })

})
var server = app.listen(5000, () => {
    console.log("hello express")
})