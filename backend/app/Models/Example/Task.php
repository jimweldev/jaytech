<?php

namespace App\Models\Example;

use Illuminate\Database\Eloquent\Model;

class Task extends Model {
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];
}
