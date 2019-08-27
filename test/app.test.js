const request = require('supertest');
const server = require('../app');


describe('ホーム画面の確認', () => {
  test('GET 200', async ()=>{
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('一覧画面の表示', () => {
  test('GET 200', async () => { 
    const response = await request(server).get('/list');
    expect(response.statusCode).toBe(200);
  });
});
