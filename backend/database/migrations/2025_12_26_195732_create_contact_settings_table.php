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
        Schema::create('contact_settings', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('phone');
            $table->string('address_line1');
            $table->string('address_line2')->nullable();
            $table->timestamps();
        });

        // Seed default contact details matching the current Contact page
        \DB::table('contact_settings')->insert([
            'email' => 'hello@Frame2Complex.com',
            'phone' => '+44 1274 722303',
            'address_line1' => 'Feather Rd, Bradford BD3 9DJ',
            'address_line2' => 'United Kingdom',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_settings');
    }
};
