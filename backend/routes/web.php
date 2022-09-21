<?php

use App\Http\Controllers\BillsController;
use Illuminate\Http\Client\Request;
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
//Ruta para generar token automaticamente
Route::get('/api/generateCSRF', function () { return csrf_token(); });
//Validar Existencia de Usuario
Route::post('/api/validateUserExist',[BillsController::class, 'validateUserExist']);
//Obtener Facturas validada con Middleware
Route::post('/api/getbills',[ BillsController::class, 'getBills' ])->middleware('checktoken');
//Obtener Factura Especifica validada con Middleware
Route::post('/api/getSpecificBill',[ BillsController::class, 'getSpecificBill' ])->middleware('checktoken');
//Crear Factura validada con Middleware
Route::post('/api/saveBill',[ BillsController::class, 'saveBill' ])->middleware('checktoken');
//Editar Factura validada con Middleware
Route::post('/api/editBill',[ BillsController::class, 'editBill' ])->middleware('checktoken');
//Eliminar Factura validada con Middleware
Route::post('/api/deleteBill',[ BillsController::class, 'deleteBill' ])->middleware('checktoken');