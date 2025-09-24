<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product\Product;
use App\Models\Product\ProductModelServices;

class ProductModel extends Model
{
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function product() {
        return $this->belongsTo(Product::class);
    }

    public function prices() {
        return $this->hasMany(ProductModelServices::class);
    }
}
