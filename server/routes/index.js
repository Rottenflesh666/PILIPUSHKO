module.exports = (app) => {
  require('./login')(app);
  require('./global')(app);
  require('./testsList')(app);
  require('./groups')(app);
  require('./newQuestion')(app);
  require('./admin')(app);
};
