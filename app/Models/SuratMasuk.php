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
        'heya_id',
        'subbid_id',
        'file',
        'user_id',
        'kodeBerkas',
        'sutattsu'
    ];

    public function heya()
    {
        return $this->belongsTo('App\Models\Heya', 'heya_id');
    }

    public function subbid()
    {
        return $this->belongsTo('App\Models\AlhuqulAlfareia', 'subbid_id');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }
}
