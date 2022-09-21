<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bills extends Model
{
    use HasFactory;


    protected $fillable = [
        'num_factura',
        'fecha_creacion',
        'emisor',
        'nit_emisor',
        'receptor',
        'nit_receptor',
        'valor_ant_iva',
        'iva',
        'valor_pagar',
        'items'
    ];

}
