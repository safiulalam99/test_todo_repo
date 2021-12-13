const app = require('./app');
const Todo = require('../Todo');
const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`todo list RESTFful API server at: http://localhost:${port}`);
  /* eslint-enable no-console */
});
