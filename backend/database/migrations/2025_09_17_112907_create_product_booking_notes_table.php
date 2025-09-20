<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_booking_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('product_bookings')->onDelete('cascade');
            $table->text('note');
            $table->decimal('additional_fee', 8, 2);
            $table->boolean('accept_fee')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_booking_notes');
    }
};
