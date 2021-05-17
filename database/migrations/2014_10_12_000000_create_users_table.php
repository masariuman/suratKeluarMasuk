<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('rinku')->nullable();
            $table->string('juugyouinBangou')->nullable();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('yuubaaMei')->nullable();
            $table->string('sashin')->nullable();
            $table->enum('reberu', ['2', '1', '0'])->default('2')->comment('2 = bkn pengurus, 1 = admin ruangan, 0 = super admin');
            $table->unsignedBigInteger('heya_id');
            $table->foreign('heya_id')->references('id')->on('heya');
            $table->unsignedBigInteger('role_id');
            $table->foreign('role_id')->references('id')->on('userRoles');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->foreignId('current_team_id')->nullable();
            $table->text('profile_photo_path')->nullable();
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
        Schema::dropIfExists('users');
    }
}
