
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.on('/').render('welcome');

Route.post('/users', 'UserController.store');
Route.post('/users/forgot-password', 'UserController.forgotPassword');
Route.post('/users/set-password', 'UserController.setPassword');

Route.post('/auth', 'SessionController.create');

Route.resource('categories', 'CategoryController')
  .middleware(['auth:jwt'], new Map([
    [['store', 'update', 'destroy'], ['is:(adm)']],
  ]));

Route.resource('locations', 'LocationController')
  .middleware(['auth:jwt'], new Map([
    [['store', 'update', 'destroy'], ['is:(adm)']],
  ]));

Route.group(() => {
  Route.resource('/', 'DeviceController')
    .middleware(['auth:jwt'], new Map([
      [['store', 'update', 'destroy'], ['is:(adm)']],
    ]));

  Route.put('/:id/category', 'DeviceController.putCategories')
    .middleware(['auth:jwt', 'is:(adm)']);

  Route.put('/:id/location', 'DeviceController.putLocations')
    .middleware(['auth:jwt', 'is:(adm)']);
}).prefix('devices');

Route.resource('messages', 'MessageController').middleware(['auth:jwt']);

Route.resource('services', 'ServiceController').middleware(['auth:jwt']);
