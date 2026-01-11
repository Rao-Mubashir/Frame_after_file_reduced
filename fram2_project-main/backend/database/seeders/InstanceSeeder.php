<?php

namespace Database\Seeders;

use App\Models\SubCategory;
use App\Models\Instance;
use Illuminate\Database\Seeder;

class InstanceSeeder extends Seeder
{
    public function run(): void
    {
        $instances = [
            ['sub_category' => 'Snooker', 'count' => 19, 'prefix' => 'SNOOKER'],
            ['sub_category' => 'Double Snooker', 'count' => 1, 'prefix' => 'DBL-SNOOKER'],
            ['sub_category' => 'Snooker & PS', 'count' => 15, 'prefix' => 'SNOOKER-PS', 'category' => 'Snooker'],
            ['sub_category' => 'VIP', 'count' => 4, 'prefix' => 'VIP'],
            ['sub_category' => 'Pool & PS', 'count' => 3, 'prefix' => 'POOL-PS', 'category' => 'Pool'],
            ['sub_category' => 'Double PlayStation', 'count' => 2, 'prefix' => 'DBL-PS'],
            ['sub_category' => 'PlayStation', 'count' => 8, 'prefix' => 'PS'],
            ['sub_category' => 'Football Ground', 'count' => 6, 'prefix' => 'FOOTBALL'],
            ['sub_category' => 'Cricket Ground', 'count' => 6, 'prefix' => 'CRICKET-GRD'],
            ['sub_category' => 'Cricket Lane', 'count' => 1, 'prefix' => 'CRICKET-LANE'],
            ['sub_category' => 'Badminton Courts', 'count' => 6, 'prefix' => 'BADMINTON'],
        ];

        foreach ($instances as $instanceData) {
            if (isset($instanceData['category'])) {
                $subCategory = SubCategory::whereHas('category', function($query) use ($instanceData) {
                    $query->where('name', $instanceData['category']);
                })->where('name', $instanceData['sub_category'])->first();
            } else {
                $subCategory = SubCategory::where('name', $instanceData['sub_category'])->first();
            }
            
            if ($subCategory) {
                for ($i = 1; $i <= $instanceData['count']; $i++) {
                    Instance::create([
                        'sub_category_id' => $subCategory->id,
                        'name' => $instanceData['sub_category'] . ' ' . $i,
                        'identifier' => $instanceData['prefix'] . '-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                        'is_active' => true,
                    ]);
                }
            }
        }
    }
}
