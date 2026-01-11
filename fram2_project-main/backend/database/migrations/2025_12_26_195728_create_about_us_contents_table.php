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
        Schema::create('about_us_contents', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value');
            $table->timestamps();
        });

        // Seed default content so existing About Us page text is preserved
        \DB::table('about_us_contents')->insert([
            // AboutHero
            ['key' => 'about.hero.title', 'value' => 'About'],
            ['key' => 'about.hero.subtitle', 'value' => 'Little moments of greatness'],

            // AboutWhoWeAre
            ['key' => 'about.who_we_are.heading', 'value' => 'Who we are'],
            ['key' => 'about.who_we_are.paragraph_1', 'value' => "We're Frame 2 Complex - a premier sports and recreation center located in Bradford, United Kingdom. We're dedicated to providing exceptional sporting facilities and entertainment options for individuals, families, and teams who are passionate about an active lifestyle."],
            ['key' => 'about.who_we_are.paragraph_2', 'value' => 'Our complex is more than just a sports venue. It\'s a destination where athletes, gamers, and sports enthusiasts of all levels come together to pursue their passions, compete, train, and create lasting memories. From competitive matches to casual fun, we offer something for everyone.'],
            ['key' => 'about.who_we_are.paragraph_3', 'value' => 'With professional-grade football grounds, a premier cricket field, dedicated boxing facilities, premium snooker tables, a cutting-edge game arena, and comfortable accommodation rooms, we provide everything you need for sports, recreation, and relaxation - all in one convenient location.'],

            // AboutStats
            ['key' => 'about.stats.1.number', 'value' => '6'],
            ['key' => 'about.stats.1.label', 'value' => 'Premium Facilities'],
            ['key' => 'about.stats.2.number', 'value' => '5000+'],
            ['key' => 'about.stats.2.label', 'value' => 'Happy Visitors'],
            ['key' => 'about.stats.3.number', 'value' => '50+'],
            ['key' => 'about.stats.3.label', 'value' => 'Expert Staff'],

            // AboutBuilding
            ['key' => 'about.building.heading', 'value' => 'Premium facilities designed for you'],
            ['key' => 'about.building.subtitle', 'value' => 'Every detail matters when creating spaces for sports and recreation'],

            // AboutEurope main heading and location
            ['key' => 'about.europe.heading', 'value' => 'Your Premier Sports Complex in Bradford'],
            ['key' => 'about.europe.address_line1', 'value' => 'Feather Rd, Bradford BD3 9DJ'],
            ['key' => 'about.europe.address_line2', 'value' => 'United Kingdom'],

            // AboutEurope feature cards
            ['key' => 'about.europe.features.1.title', 'value' => 'Prime Location'],
            ['key' => 'about.europe.features.1.description', 'value' => 'Easy access from Bradford city center'],
            ['key' => 'about.europe.features.2.title', 'value' => 'Extended Hours'],
            ['key' => 'about.europe.features.2.description', 'value' => 'Open 7 days a week'],
            ['key' => 'about.europe.features.3.title', 'value' => 'Online Booking'],
            ['key' => 'about.europe.features.3.description', 'value' => 'Book facilities anytime'],
            ['key' => 'about.europe.features.4.title', 'value' => 'Free WiFi'],
            ['key' => 'about.europe.features.4.description', 'value' => 'Stay connected throughout'],

            // AboutValues main heading and value cards
            ['key' => 'about.values.heading', 'value' => 'Our Values'],
            ['key' => 'about.values.1.title', 'value' => 'Passion'],
            ['key' => 'about.values.1.description', 'value' => 'We love sports and recreation, and it shows in everything we create - from our facilities to our visitor experiences.'],
            ['key' => 'about.values.2.title', 'value' => 'Community'],
            ['key' => 'about.values.2.description', 'value' => 'We bring people together, creating spaces where friendships form, teams unite, and families enjoy quality time.'],
            ['key' => 'about.values.3.title', 'value' => 'Excellence'],
            ['key' => 'about.values.3.description', 'value' => 'We never settle for good enough. We constantly maintain and improve our facilities to deliver the very best.'],
            ['key' => 'about.values.4.title', 'value' => 'Experience'],
            ['key' => 'about.values.4.description', 'value' => 'We believe in creating memorable moments - whether you\'re playing, training, gaming, or simply relaxing.'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_us_contents');
    }
};
