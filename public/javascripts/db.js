/*
 * Heroku PostgreSQLに接続し、データを記録する
 */

/*
var user = {
  name: '田中太郎', //氏名
  age '20', //年齢
  sex: 1, //性別(男性: 1, 女性: 2, 未入力: 0)
  phonenum: '03-0000-0000', //電話番号
  postcode: '100-00000', //郵便番号
  address: '東京都XXX区XXXXX' //住所
}
*/

const pg = require('pg');
require('dotenv').config();

// 接続先 
var pool = new pg.Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  ssl: process.env.DATABASE_SSL,
}); 

// テーブルに情報を記録
exports.addUser = function(user, next)
{
  pool.connect( function(err, client){
    if (err) {
      console.log(err);
    } else {
      var query = {
        text: "insert into USERINFO(NAME, AGE, SEX, PHONENUM, POSTCODE, ADDRESS, CREATED_AT, UPDATED_AT) VALUES($1, $2, $3, $4, $5, $6, current_timestamp, current_timestamp)",
        values: [user.name, user.age, user.sex, user.phonenum, user.postcode, user.address],
      };
    
      client.query(query, (err, res) => {
        if (err) console.error(err.stack);
        client.end();
        next(err, res);
      });
    }
  });
}

// テーブルから情報を取得
exports.getUsers = function(next)
{
  pool.connect( function(err, client){
    if (err) {
      console.log(err);
    } else {
      var query = {
        text: "select NAME, AGE, SEX, PHONENUM, POSTCODE, ADDRESS from USERINFO"
      };
      client.query(query, (err, res) => {
        if (err) console.error(err.stack);
        client.end();
        next(err, res);
      });
    }
  });
}

