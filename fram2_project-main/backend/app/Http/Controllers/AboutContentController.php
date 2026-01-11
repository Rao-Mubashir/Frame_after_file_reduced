<?php

namespace App\Http\Controllers;

use App\Models\AboutUsContent;
use Illuminate\Http\Request;

class AboutContentController extends Controller
{
    /**
     * Return About Us content for public consumption.
     */
    public function publicIndex()
    {
        return response()->json($this->getContents());
    }

    /**
     * Return About Us content for admin (requires admin role).
     */
    public function adminIndex(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($this->getContents());
    }

    /**
     * Update About Us content (admin only).
     */
    public function update(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'contents' => ['required', 'array'],
            'contents.*' => ['nullable', 'string'],
        ]);

        $allowedKeys = $this->allowedKeys();

        foreach ($data['contents'] as $key => $value) {
            if (! in_array($key, $allowedKeys, true)) {
                continue;
            }

            AboutUsContent::updateOrCreate(
                ['key' => $key],
                ['value' => $value ?? '']
            );
        }

        return response()->json($this->getContents());
    }

    /**
     * Get content as key => value map.
     */
    protected function getContents(): array
    {
        return AboutUsContent::query()
            ->pluck('value', 'key')
            ->toArray();
    }

    /**
     * Keys that can be managed via the API.
     */
    protected function allowedKeys(): array
    {
        return [
            // AboutHero
            'about.hero.title',
            'about.hero.subtitle',

            // AboutWhoWeAre
            'about.who_we_are.heading',
            'about.who_we_are.paragraph_1',
            'about.who_we_are.paragraph_2',
            'about.who_we_are.paragraph_3',

            // AboutStats
            'about.stats.1.number',
            'about.stats.1.label',
            'about.stats.2.number',
            'about.stats.2.label',
            'about.stats.3.number',
            'about.stats.3.label',

            // AboutBuilding
            'about.building.heading',
            'about.building.subtitle',

            // AboutEurope
            'about.europe.heading',
            'about.europe.address_line1',
            'about.europe.address_line2',
            'about.europe.features.1.title',
            'about.europe.features.1.description',
            'about.europe.features.2.title',
            'about.europe.features.2.description',
            'about.europe.features.3.title',
            'about.europe.features.3.description',
            'about.europe.features.4.title',
            'about.europe.features.4.description',

            // AboutValues
            'about.values.heading',
            'about.values.1.title',
            'about.values.1.description',
            'about.values.2.title',
            'about.values.2.description',
            'about.values.3.title',
            'about.values.3.description',
            'about.values.4.title',
            'about.values.4.description',
        ];
    }
}
