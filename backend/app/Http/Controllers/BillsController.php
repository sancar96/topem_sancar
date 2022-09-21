<?php

namespace App\Http\Controllers;

use App\Models\Bills;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BillsController extends Controller
{
       
    /**
     * Función para validar existencia del usuario según el email y contraseña enviados en el login
     * @param Request $request
     * @return JSON response
     */
    public function validateUserExist(Request $request){

        if (Auth::attempt(['email' => $request->email, 'password' => $request->pass])) {
            return response(KeyController::generateAccessToken(), 200);
        }else{
            return response("Usuario on constraseña invalidos", 401);
        }
    }

    /**
     * Función para obtener todas las facturas activas de la BD
     * @return Object Bills
     */
    public function getBills(){
        return Bills::where("status",1)->get();
    }

    /**
     * Función para obtener el detalle de una factura especifica según el id
     * @param Request $request
     * @return Object Bills
     */
    public function getSpecificBill(Request $request){
        return Bills::where("id",$request->idFactura)->first();
    }

    /**
     * Función para obtener el consecutivo automaticamente para la creación de las facturas
     */
    public function getBillConsecutive(){
        $lastBill = Bills::orderBy('id','desc')->first();
        $consecutive = $lastBill->num_factura + 1;
        return $consecutive;
    }

    /**
     * Función para crear una nueva factura
     * @param Request $request
     * @return JSON response
     */
    public function saveBill(Request $request){

        $bill = new Bills();
        $bill->num_factura = $this->getBillConsecutive();
        $bill->nit_emisor = $request->nit_emisor;
        $bill->emisor = $request->emisor;
        $bill->nit_receptor = $request->nit_receptor;
        $bill->receptor = $request->receptor;
        $bill->valor_ant_iva = $request->valor_ant_iva;
        $bill->iva = $request->iva;
        $bill->valor_pagar = $request->valor_pagar;
        $bill->items = $request->items;

        if($bill->save()){
            return response("Factura creada.", 200);
        }else{
            return response("Error al crear la factura", 500);
        }
    }

    /**
     * Función para editar una factura especifica
     * @param Request $request
     * @return JSON response
     */
    public function editBill(Request $request){
        $bill = Bills::where("id", $request->id)->first();

        $bill->nit_emisor = $request->nit_emisor;
        $bill->emisor = $request->emisor;
        $bill->nit_receptor = $request->nit_receptor;
        $bill->receptor = $request->receptor;
        $bill->valor_ant_iva = $request->valor_ant_iva;
        $bill->iva = $request->iva;
        $bill->valor_pagar = $request->valor_pagar;
        $bill->items = $request->items;

        if($bill->save()){
            return response("Factura actualizada.", 200);
        }else{
            return response("Error al actualizar la factura", 500);
        }
    }

    /**
     * Función para eliminar una factura especifica
     * @param Request $request
     * @return JSON response
     */
    public function deleteBill(Request $request){

        $bill = Bills::where("id", $request->id)->first();
        $bill->status = '2';

        if($bill->save()){
            return response("Factura eliminada.", 200);
        }else{
            return response("Error al eliminar la factura", 500);
        }
        
    }

}
