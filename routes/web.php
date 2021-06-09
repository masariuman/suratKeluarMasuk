<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/getUuzaa', 'UuzaaController@getUuzaa');

Route::post('/kanrisha/masuk/deeta/update', 'suratMasukCOntroller@apdet');
Route::post('/kanrisha/keluar/deeta/update', 'suratKeluarController@apdet');

Route::resources([
    'kanrisha/heya/deeta' => 'HeyaController',
    'kanrisha/uuzaa/deeta' => 'UuzaaController',
    'kanrisha/alhuqulAlfareia/deeta' => 'alhuqulAlfareiaController',
    'kanrisha/masuk/deeta' => 'suratMasukCOntroller',
    'kanrisha/keluar/deeta' => 'suratKeluarController',
]);

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Route::group(['middleware' => 'auth'], function () {
    Route::any('{all}', function () {
        return view('template');
    })
        ->where(['all' => '.*']);
});
