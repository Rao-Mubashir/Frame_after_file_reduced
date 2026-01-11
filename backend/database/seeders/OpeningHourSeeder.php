<?php

namespace Database\Seeders;

use App\Models\OpeningHour;
use Illuminate\Database\Seeder;

class OpeningHourSeeder extends Seeder
{
    public function run(): void
    {
        $openingHours = [
            ['day' => 'Monday', 'open' => '12:00', 'close' => '04:00'],
            ['day' => 'Tuesday', 'open' => '12:00', 'close' => '04:00'],
            ['day' => 'Wednesday', 'open' => '12:00', 'close' => '04:00'],
            ['day' => 'Thursday', 'open' => '12:00', 'close' => '04:00'],
            ['day' => 'Friday', 'open' => '15:00', 'close' => '04:00'],
            ['day' => 'Saturday', 'open' => '10:00', 'close' => '04:00'],
            ['day' => 'Sunday', 'open' => '10:00', 'close' => '04:00'],
        ];

        foreach ($openingHours as $hours) {
            OpeningHour::create([
                'day_of_week' => $hours['day'],
                'opening_time' => $hours['open'],
                'closing_time' => $hours['close'],
                'is_open' => true,
            ]);
        }
    }
}
