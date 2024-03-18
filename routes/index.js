var express = require('express');
var router = express.Router();

// 导入lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(__dirname + '/../data/db.json');
// 获取db对象
const db = low(adapter)
const shortid = require("shortid")

router.get('/accountList', function(req, res, next) {
  let account = db.get("accounts").value()
  res.render("list",{account:account})
});


router.get('/accountAdd', function(req, res, next) {
  res.render('create')
});

router.post('/add', function(req, res, next) {
  let id = shortid.generate();
  db.get('accounts').unshift({id:id, ...req.body}).write()
  res.render("success" , {msg:'恭喜你添加成功' , url:"/accountList"})
});

router.get('/delete/:id' , (req , res)=>{
  let id = req.params.id
  db.get("accounts").remove({id:id}).write()
  res.render("success" , {msg:'恭喜你删除成功' , url:"/accountList"})
})

module.exports = router;
