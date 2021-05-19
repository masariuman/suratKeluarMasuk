<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Uuzaa extends Model
{
    protected $table = 'users';
    protected $fillable = [
        'rinku',
        'juugyouinBangou',
        'name',
        'yuuzaaMei',
        'sashin',
        'reberu',
        'heya_id',
        'password',
        'sutattsu'
    ];

    public function heya()
    {
        return $this->belongsTo('App\Models\Heya', 'heya_id');
    }
}
