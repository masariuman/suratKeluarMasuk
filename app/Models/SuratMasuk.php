<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuratMasuk extends Model
{
    protected $table = 'masuk';
    protected $fillable = [
        'rinku',
        'asalSurat',
        'nomorSurat',
        'tanggalSurat',
        'perihal',
        'tanggalNaik',
        'tanggalTurun',
        'subbid_id',
        'file',
        'user_id',
        'sutattsu'
    ];

    public function subbid()
    {
        return $this->belongsTo('App\Models\AlhuqulAlfareia', 'subbid_id');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }
}
