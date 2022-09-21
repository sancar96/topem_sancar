<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KeyController extends Controller
{
    
    /**
     * Función para generar un token al usuario logueado
     * @return String $token
     */
    public static function generateAccessToken(){
        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken;
        return $token;
    }


}
