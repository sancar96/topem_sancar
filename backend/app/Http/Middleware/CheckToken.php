<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        /**
         * Validamos que el token que se envia en la peticion exista en la tabla personal_access_token
         * en caso de ser asi dejamos que la peticion inicial continue, si no se restona el response con un mensaje
         */
        if(PersonalAccessToken::findToken($request->token)){
            return $next($request);
        }else{
            return response("Token Autorización Invalido", 401);
        }
    }
}
