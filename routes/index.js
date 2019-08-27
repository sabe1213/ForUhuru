var express = require('express');
var router = express.Router();
var controller = require('../public/javascripts/controller');

//ホーム画面の表示
//mode: false 編集可能
//mode: true 編集不可（確認画面）
router.get('/', function(req, res, next){
  res.render('index', {mode: false, inputs: req.body});
});

router.post('/', function(req, res, next){
  console.log(req.body.submit)
  //登録ボタンを押し、情報をDBに登録する
  if(req.body.submit=='登録'){
    controller.register(req.body, function(err){
      if(err){
        res.status(500)
        res.render('error', { error: err })
      }else{
        res.render('register', req.body);
      }
    });
  //readonlyを解除し、修正する
  }else if(req.body.submit=='修正'){
    res.render('index', {mode: false, inputs: req.body});
  //確認画面に遷移し、readonlyにし、一時的に編集できないようにする
  }else{
    res.render('index', {mode: true, inputs: req.body});
  }
});

//一覧の確認画面を表示する
router.get('/list', function(req, res, next){
  controller.list(function(err, users){ 
    if(err){
      res.status(500)
      res.render('error', { error: err })
    }else{ 
      res.render('list', { users: users });
    }
  });
});

module.exports = router;
