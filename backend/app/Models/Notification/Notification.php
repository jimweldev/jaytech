<?php

namespace App\Models\Notification;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model {
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];
}
