<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableSuratMasuk extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('masuk', function (Blueprint $table) {
            $table->id();
            $table->string('rinku')->nullable();
            $table->string('asalSurat')->nullable();
            $table->string('nomorSurat')->nullable();
            $table->date('tanggalSurat')->nullable();
            $table->string('perihal')->nullable();
            $table->date('tanggalNaik')->nullable();
            $table->date('tanggalTurun')->nullable();
            $table->unsignedBigInteger('subbid_id');
            $table->foreign('subbid_id')->references('id')->on('alhuqulAlfareia');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::dropIfExists('masuk');
    }
}
