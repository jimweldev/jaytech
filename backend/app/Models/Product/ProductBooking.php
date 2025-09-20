<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;
use App\Models\Core\User;

class ProductBooking extends Model {
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function customer() {
        return $this->belongsTo(User::class);
    }
}
