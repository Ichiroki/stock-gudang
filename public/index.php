<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Development Mode

// This settings is safest mode if you want to make out something, either add some test debug, create some feature, and code refactoring

// Comment / uncomment from below

// Register the Composer autoloader...
// require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
// /** @var Application $app */
// $app = require_once __DIR__.'/../bootstrap/app.php';

// $app->handleRequest(Request::capture());

// Comment / uncomment from above

// *-------------------------------------------------------* //

// Production Mode

// This settings is used for production, either you want to test out somethin or add more feature, comments out the setting below and use development mode to make sure everything is safe

// Comment / uncomment from below

// Register the Composer autoloader...
require __DIR__.'/laravel/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/laravel/bootstrap/app.php';

$app->handleRequest(Request::capture());

// Comment / uncomment from above
