const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./mock/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.metadata = {
      ...req.body.metadata,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1
    };
  }
  if (req.method === 'PUT') {
    req.body.metadata = {
      ...req.body.metadata,
      updatedAt: new Date().toISOString(),
      version: (req.body.metadata?.version || 0)
    };
  }
  next();
});

server.use(router);

const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
