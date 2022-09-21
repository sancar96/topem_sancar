<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('bills')->insert([
            'num_factura' => 1,
            'emisor' => 'Reposteria ltda.',
            'nit_emisor' => 9721081,
            'receptor' => 'Sancar S.A.S.',
            'nit_receptor' => 9966682,
            'valor_ant_iva' => 100000,
            'iva' => 19000,
            'valor_pagar' => 119000,
            'items' => '{"0":{"descripcion":"Pastel de 2 pisos","cantidad":1,"val_unit":100000,"val_total":100000}}',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            'status' => '1'
        ]);
    }
}
