<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AlhuqulAlfareia extends Model
{
    protected $table = 'alhuqulAlfareia';
    protected $fillable = [
        'heya_id',
        'sutattsu',
        'asm',
        'rinku',
        'created_at',
        'updated_at'
    ];

    public function heya()
    {
        return $this->belongsTo('App\Models\Heya');
    }

    public function masuk()
    {
        return $this->hasMany('App\Models\SuratMasuk', 'subbid_id');
    }

    public function keluar()
    {
        return $this->hasMany('App\Models\SuratKeluar', 'subbid_id');
    }
}
