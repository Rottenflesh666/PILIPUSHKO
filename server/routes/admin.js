module.exports = (app) => {
  app.post('/admin/create', (req, res) => { //req.body
    res.status(200).json({ task: 'kek',});
  });

  app.post('/admin/tasks', (req, res) => {
    let tasks=[
      {
        id: '1',
        task: 'kek',
      },
      {
        id: '2',
        task: 'Что означают ответы "Несовпадение данных", "Неверное число записей" и т.п. при проверке решения?',
      },
      {
        id: '3',
        task: 'Что такое "стоимость", "эффективность", "план выполнения", "оптимизация" и зачем нам это? ',
      },
      {
        id: '4',
        task: 'При повторном решении ранее решенного упражнения SELECT появляется кнопка "Записать". Что это? Изменится ли при этом мой рейтинг?',
      },
      {
        id: '5',
        task: 'Что означают ответы "Несовпадение данных", "Неверное число записей" и т.п. при проверке решения?',
      },
      {
        id: '6',
        task: 'Что такое "стоимость", "эффективность", "план выполнения", "оптимизация" и зачем нам это? ',
      },
      {
        id: '7',
        task: 'asdsadsadadsadsadsadsadasdasdas?',
      },
      {
        id: '8',
        task: 'adadasdasdasdsadsadsasadsadas',
      },
      {
        id: '9',
        task: 'adadasdasdasdd? ',
      },
      {
        id: '10',
        task: 'sadasdassadsadad?',
      },
    ];
    res.status(200).json({
      tasks,
    })
  });
};
