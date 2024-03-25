var express = require('express');
var router = express.Router();

// 导入lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(__dirname + '/../data/db.json');
// 获取db对象
const db = low(adapter)
const shortid = require("shortid")

// 导入日期管理工具
const moment = require("moment")

const AccountModel = require("../Model/Account")


router.get('/accountList', function (req, res, next) {
  AccountModel.find().sort({ time: -1 }).exec()
    .then(data => {
      res.render('list', { account: data, moment: moment })
    })
    .catch(err => {
      res.status(500).send("显示失败");
    });
});

router.get('/accountAdd', function (req, res, next) {
  res.render('create')
});

router.post('/add', function (req, res, next) {
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  })
    .then(data => {
      res.render("success", { msg: '恭喜你添加成功', url: "/accountList" });
    })
    .catch(err => {
      res.status(500).send("插入失败");
    });
});

router.get('/delete/:id', (req, res) => {
  let id = req.params.id
  AccountModel.deleteOne({
    _id : id
  })
  .then(data =>{
    res.render("success", { msg: '恭喜你删除成功', url: "/accountList" })
  })
  .catch(err => {
    res.status(500).send("删除失败");
  })
  
})

module.exports = router;
