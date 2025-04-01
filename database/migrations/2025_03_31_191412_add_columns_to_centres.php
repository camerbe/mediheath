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
        Schema::table('centres', function (Blueprint $table) {
            //
            $table->string('description')->nullable();
            $table->longText('photo_1')->nullable();
            $table->longText('photo_2')->nullable();
            $table->longText('photo_3')->nullable();
            $table->longText('photo_4')->nullable();
            $table->longText('photo_5')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('centres', function (Blueprint $table) {
            //
            $table->dropColumn('description');
            $table->dropColumn('photo_1');
            $table->dropColumn('photo_2');
            $table->dropColumn('photo_3');
            $table->dropColumn('photo_4');
            $table->dropColumn('photo_5');
        });
    }
};
