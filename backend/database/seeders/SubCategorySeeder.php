<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SubCategorySeeder extends Seeder
{
    public function run(): void
    {
        $subCategories = [
            ['category' => 'Snooker', 'name' => 'Snooker', 'price' => 500],
            ['category' => 'Snooker', 'name' => 'Double Snooker', 'price' => 800],
            ['category' => 'Snooker', 'name' => 'Snooker & PS', 'price' => 700],
            ['category' => 'Leisure Rooms', 'name' => 'VIP', 'price' => 1500],
            ['category' => 'Pool', 'name' => 'Pool & PS', 'price' => 600],
            ['category' => 'PlayStations', 'name' => 'Double PlayStation', 'price' => 600],
            ['category' => 'PlayStations', 'name' => 'PlayStation', 'price' => 400],
            ['category' => 'PlayStations', 'name' => 'Pool & PS', 'price' => 600],
            ['category' => 'PlayStations', 'name' => 'Snooker & PS', 'price' => 700],
            ['category' => 'Football', 'name' => 'Football Ground', 'price' => 2000],
            ['category' => 'Cricket', 'name' => 'Cricket Ground', 'price' => 2000],
            ['category' => 'Cricket', 'name' => 'Cricket Lane', 'price' => 500],
            ['category' => 'Badminton', 'name' => 'Badminton Courts', 'price' => 800],
        ];

        foreach ($subCategories as $subCat) {
            $category = Category::where('name', $subCat['category'])->first();
            
            if ($category) {
                SubCategory::create([
                    'category_id' => $category->id,
                    'name' => $subCat['name'],
                    'slug' => Str::slug($subCat['name']),
                    'price_per_hour' => $subCat['price'],
                    'is_active' => true,
                ]);
            }
        }
    }
}
