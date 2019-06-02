module.exports = (app) => {
  app.post('/api/tasks', (req, res) => {
    res.status(200);
  });

  app.post('/api/tasks/check', (req, res) => {
    res.status(200); // 406 - wrong database query
  })
};
