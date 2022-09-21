<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->integer("num_factura");
            $table->enum('status',['1','2'])->default('1');
            $table->string("emisor", 150);
            $table->integer("nit_emisor");
            $table->string("receptor", 150);
            $table->integer("nit_receptor");
            $table->integer("valor_ant_iva");
            $table->integer("iva");
            $table->integer("valor_pagar");
            $table->string("items", 1500);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bills');
    }
}
