module.exports = (app) => {
  app.post('/api/login', (req, res) => {
    if (req.body.userInfo.login === '1' && req.body.userInfo.login === '1') {
      res.status(200).json({
        accessMode: 0,
      })
    }
  });
};
