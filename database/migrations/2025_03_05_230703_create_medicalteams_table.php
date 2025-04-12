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
        Schema::create('medicalteams', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('titre')->nullable();
            $table->text('doctor_1')->nullable();
            $table->longText('image_doctor_1')->nullable();
            $table->text('doctor_2')->nullable();
            $table->longText('image_doctor_2')->nullable();
            $table->longText('doctor_3')->nullable();
            $table->longText('image_doctor_3')->nullable();
            $table->longText('doctor_4')->nullable();
            $table->longText('image_doctor_4')->nullable();
            $table->longText('doctor_5')->nullable();
            $table->longText('image_doctor_5')->nullable();
            $table->json('meta');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_team');
    }
};
