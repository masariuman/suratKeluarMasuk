<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuratKeluar extends Model
{
    protected $table = 'keluar';
    protected $fillable = [
        'rinku',
        'tujuanSurat',
        'nomorSurat',
        'tanggalSurat',
        'perihal',
        'tanggalKirim',
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
