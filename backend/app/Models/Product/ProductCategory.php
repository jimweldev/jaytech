<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];
}
