/*
 * コントローラ
 */
const db =require('./db');


// ユーザ情報の登録
exports.register = function(user, next)
{
  db.addUser(user, function(err, res){
    next(err);
  });
}

// ユーザ一覧の取得
exports.list = function(next)
{
  db.getUsers(function(err, res){
    next(err, res.rows);
  });
}

