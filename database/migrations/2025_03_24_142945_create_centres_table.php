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
        Schema::create('centres', function (Blueprint $table) {

            $table->uuid('id')->primary();
            $table->string('description')->nullable();
            $table->longText('photo_1')->nullable();
            $table->longText('photo_2')->nullable();
            $table->longText('photo_3')->nullable();
            $table->longText('photo_4')->nullable();
            $table->longText('photo_5')->nullable();
            $table->json('meta');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('centres');
    }
};
