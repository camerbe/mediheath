<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\CentreController;
use App\Http\Controllers\api\HomeController;
use App\Http\Controllers\api\MedicalTeamController;
use App\Http\Controllers\api\OtherTeamController;
use App\Http\Controllers\api\PoleController;
use App\Http\Controllers\api\TeamController;
use App\Http\Controllers\api\TeamTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/
Route::post('auth/login', [AuthController::class, 'login']);
Route::get('homes/last', [HomeController::class, 'getOneHome']);
Route::get('centres/last', [CentreController::class, 'getOneCentre']);
Route::get('poles/last', [PoleController::class, 'getOnePole']);
Route::get('medicals/last', [MedicalTeamController::class, 'getOneMedicalTeam']);
Route::get('others/last', [OtherTeamController::class, 'getOneOtherTeam']);
Route::group(['middleware' => 'auth:api'], function (){
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::apiResources([
        'poles'=>PoleController::class,
        'centres'=>CentreController::class,
        'homes'=>HomeController::class,
        'teamtypes'=>TeamTypeController::class,
        'teams'=>TeamController::class,
        'medicals'=>MedicalTeamController::class,
        'others'=>OtherTeamController::class,
    ]);
});



