<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlhuqulAlfareiaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alhuqulAlfareia', function (Blueprint $table) {
            $table->id();
            $table->string('rinku')->nullable();
            $table->unsignedBigInteger('heya_id');
            $table->foreign('heya_id')->references('id')->on('heya');
            $table->string('asm')->nullable();
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
        Schema::dropIfExists('alhuqulAlfareia');
    }
}
