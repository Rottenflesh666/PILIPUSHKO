module.exports = (app) => {
  app.post('/api/tests', (req, res) => {
    let testsList=[
      {
        id:'1',
        name:'Wenn die Soldaten durch die Stadt marschieren',
      },
      {
        id:'2',
        name:'Polska pod względem bezpieczeństwa zajmuje miejsce 35.',
      }
    ];
      res.status(200).json({
        testsList,
      })
  });
};
