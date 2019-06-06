module.exports = (app) => {
  app.post('/api/groups', (req, res) => {
    let groupsList = [
      {
        id: '1',
        name: 'Drittes Reich',
      },
      {
        id: '2',
        name: 'Фиксики',
      }
    ];
    res.status(200).json({
      groupsList,
    })
  });

  app.post('/groups/student/result', (req, res) => { //body:
    res.status(200).json({
      students,
    })
  });

  app.post('/groups/students', (req, res) => { //body: groupId
    let students = [
      {
        id: '1',
        fullName: 'Barambek kek uzukym1',
      },
      {
        id: '2',
        fullName: 'Barambek kek uzukym2',
      },
      {
        id: '3',
        fullName: 'Barambek kek uzukym3',
      },
      {
        id: '4',
        fullName: 'Barambek kek uzukym4',
      },
      {
        id: '5',
        fullName: 'Barambek kek uzukym5',
      },
      {
        id: '6',
        fullName: 'Barambek kek uzukym6',
      },
      {
        id: '7',
        fullName: 'Barambek kek uzukym7',
      },
      {
        id: '8',
        fullName: 'Barambek kek uzukym8',
      },
      {
        id: '9',
        fullName: 'Barambek kek uzukym9 ',
      },
      {
        id: '10',
        fullName: 'Barambek kek uzukym10',
      },
    ];
    res.status(200).json({
      students,
    })
  });
};
