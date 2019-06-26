module.exports = (app) => {
  app.post('/api/tasks', (req, res) => { //body.id - test id
    let tasks = [
      {
        id: '1',
        task: 'Что означает, например, такое время вылета (прилета) в таблице Trip: "1900-01-01 14:30:00.000"?',
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
    ];
    res.status(200).json({
      tasks,
    })
  });

  app.post('/api/tasks/check', (req, res) => {
    res.status(200).json({});
  });

  /*body:
    userId
    result
    taskId*/
  app.post('/tasks/result', (req, res) => {

    res.status(200).json({
      correctly:true,
    });
  });
};
