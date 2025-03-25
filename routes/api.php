<?php

use App\Http\Controllers\api\CentreController;
use App\Http\Controllers\api\HomeController;
use App\Http\Controllers\api\PoleController;
use App\Http\Controllers\api\TeamController;
use App\Http\Controllers\api\TeamTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/
Route::apiResources([
    'poles'=>PoleController::class,
    'centres'=>CentreController::class,
    'homes'=>HomeController::class,
    'teamtypes'=>TeamTypeController::class,
    'teams'=>TeamController::class,
]);
