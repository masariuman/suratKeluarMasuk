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
        return $this->hasMany('App\Models\AlhuqulAlfareia', 'heya_id');
    }

    public function masuk()
    {
        return $this->hasMany('App\Models\SuratMasuk', 'heya_id');
    }

    public function keluar()
    {
        return $this->hasMany('App\Models\SuratKeluar', 'heya_id');
    }
}
