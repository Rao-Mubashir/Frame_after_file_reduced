<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Cricket', 'icon' => '🏏'],
            ['name' => 'Football', 'icon' => '⚽'],
            ['name' => 'Snooker', 'icon' => '🎱'],
            ['name' => 'PlayStations', 'icon' => '🎮'],
            ['name' => 'Pool', 'icon' => '🎱'],
            ['name' => 'Badminton', 'icon' => '🏸'],
            ['name' => 'Leisure Rooms', 'icon' => '🛋️'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => Str::slug($category['name'])],
                [
                    'name' => $category['name'],
                    'icon' => $category['icon'],
                    'is_active' => true,
                ]
            );
        }
    }
}
