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
        return $this->belongsToMany('App\Models\Heya')->withTimestamps();
    }
}
