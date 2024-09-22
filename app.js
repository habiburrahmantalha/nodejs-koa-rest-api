const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
app.use(bodyParser());

let items = [
  {
    id: 1,
    name: "Talha",
    age: 36
  },
  {
    id: 2,
    name: "Habib",
    age: 33
  }
];

// GET all items
router.get('/items', (ctx) => {
  ctx.body = items;
});

// GET item by ID
router.get('/items/:id', (ctx) => {
  const item = items.find(i => i.id === parseInt(ctx.params.id));
  if (!item) {
    ctx.status = 404;
    ctx.body = { message: 'Item not found' };
    return;
  }
  ctx.body = item;
});

// POST create new item
router.post('/items', (ctx) => {
  const newItem = ctx.request.body;
  newItem.id = items.length + 1;
  items.push(newItem);
  ctx.body = newItem;
});

// PUT update an existing item
router.put('/items/:id', (ctx) => {
  const id = parseInt(ctx.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = { message: 'Item not found' };
    return;
  }
  items[index] = { ...items[index], ...ctx.request.body };
  ctx.body = items[index];
});

// DELETE an item by ID
router.delete('/items/:id', (ctx) => {
  const id = parseInt(ctx.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = { message: 'Item not found' };
    return;
  }
  items.splice(index, 1);
  ctx.status = 204; // No content
});

// Register the routes and start the server
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
