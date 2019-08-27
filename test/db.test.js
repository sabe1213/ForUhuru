
const db = require('../public/javascripts/db');

describe('データベースへの接続テスト', () => {
  const OLD_ENV = process.env;
  var user = {
    name: '田中太郎', //氏名
    sex: 1, //性別(男性: 1, 女性: 2, 未入力: 0)
    phone_number: '03-0000-0000', //電話番号
    address_number: '100-00000', //郵便番号
    address: '東京都XXX区XXXXX' //住所
  };

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test('テーブルに情報を記録', done => {
    db.addUser(user, (err, res) => {
      expect(err).toBeNull()
      done();
    });
  })

  test('テーブルに情報を記録失敗', done => {
    process.env.DATABASE_HOST = '';
    db.addUser(user, (err, res) => {
      expect(err).toBeDefined()
      done();
    });
  })

  test('テーブルから情報取得', done => {
    db.addUser(user, (err, res) => {
      expect(err).toBeNull()
      done();
    });
  })

  test('テーブルから情報取得失敗', done => {
    process.env.DATABASE_HOST = '';
    db.addUser(user, (err, res) => {
      expect(err).toBeDefined()
      done();
    });
  })
});
