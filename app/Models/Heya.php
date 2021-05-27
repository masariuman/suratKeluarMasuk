<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Heya extends Model
{
    protected $table = 'heya';
    protected $fillable = [
        'heyaMei',
        'sutattsu',
        'rinku',
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->hasMany('App\Models\User')->withTimestamps();
    }

    public function alhuqulalfareia()
    {
        return $this->hasMany('App\Models\AlhuqulAlfareia')->withTimestamps();
    }
}
