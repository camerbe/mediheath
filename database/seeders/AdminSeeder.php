<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('users')->insert([
            [
                'name' => 'JPB',
                'email' => 'webmaster@camer.be',
                'password' => bcrypt('bessala1984'),
                'created_at' => now(),
                'updated_at' => now(),
                'email_verified_at' => now(),
            ],

        ]);
    }
}
