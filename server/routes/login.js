module.exports = (app) => {
  app.post('/api/login', (req, res) => {
    if (req.body.userInfo.login === '1' && req.body.userInfo.login === '1') {
      res.status(200).json({
        id:'0',
        fullName: 'baramber kek lol',
        accessMode: 0,
      })
    }
    if(req.body.userInfo.login === '2' && req.body.userInfo.login === '2'){
      res.status(200).json({
        id:'1',
        fullName: 'qwertov qwertii qwertovich',
        accessMode: 1,
      })
    }
  });
};
