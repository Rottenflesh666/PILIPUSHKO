module.exports = (app) => {
  require('./login')(app);
  require('./global')(app);
  require('./testsList')(app);
};
