
const controller = require('../public/javascripts/controller');
const db = require('../public/javascripts/db');
var user = {
  name: '田中太郎', //氏名
  sex: 1, //性別(男性: 1, 女性: 2, 未入力: 0)
  phone_number: '03-0000-0000', //電話番号
  address_number: '100-00000', //郵便番号
  address: '東京都XXX区XXXXX' //住所
};

jest.mock('../public/javascripts/db');
test('ユーザ情報の登録', function(){
  db.addUser = jest.fn(async (user, next) => {next(null, {});});
  controller.register(user, (err, res) => {
    expect(err).toBeNull()
    done();
  });
})
test('ユーザ情報の登録エラー', function(){
  db.addUser = jest.fn(async (user, next) => {next('error', {});});
  controller.register(user, (err, res) => {
    expect(err).toBeDefined(err)
    done();
  });
})
test('ユーザ一覧の取得', function(){
  db.getUsers = jest.fn(async (next) => {next(null, [user]);});
  controller.register((err, users) => {
    expect(users[0]).toBe(user)
    expect(err).toBeNull(err)
    done();
  });
})
test('ユーザ一覧の取得エラー', function(){
  db.getUsers = jest.fn(async (next) => {next('error', [user]);});
  controller.register((err, users) => {
    expect(err).toBeDefined(err)
    done();
  });
})
