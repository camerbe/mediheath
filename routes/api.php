<?php

use App\Http\Controllers\api\AuthController;
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
Route::post('auth/login', [AuthController::class, 'login']);
Route::group(['middleware' => 'auth:api'], function (){
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::apiResources([
        'poles'=>PoleController::class,
        'centres'=>CentreController::class,
        'homes'=>HomeController::class,
        'teamtypes'=>TeamTypeController::class,
        'teams'=>TeamController::class,
    ]);
});


Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web', 'auth:api']], function () {
    \UniSharp\LaravelFilemanager\Lfm::routes();
});
