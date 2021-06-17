<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableSuratKeluar extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('keluar', function (Blueprint $table) {
            $table->id();
            $table->string('rinku')->nullable();
            $table->unsignedBigInteger('heya_id');
            $table->foreign('heya_id')->references('id')->on('heya');
            $table->unsignedBigInteger('subbid_id');
            $table->foreign('subbid_id')->references('id')->on('alhuqulAlfareia');
            $table->string('tujuanSurat')->nullable();
            $table->string('nomorSurat')->nullable();
            $table->date('tanggalSurat')->nullable();
            $table->string('perihal')->nullable();
            $table->date('tanggalKirim')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('kodeBerkas')->nullable();
            $table->string('file')->nullable();
            $table->enum('sutattsu', ['1', '0'])->default('1');
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
        Schema::dropIfExists('keluar');
    }
}
