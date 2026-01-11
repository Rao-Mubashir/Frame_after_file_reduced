<?php

namespace App\Http\Controllers;

use App\Models\ContactSetting;
use Illuminate\Http\Request;

class ContactSettingsController extends Controller
{
    /**
     * Public contact settings endpoint.
     */
    public function showPublic()
    {
        return response()->json($this->getSetting());
    }

    /**
     * Admin contact settings endpoint (view).
     */
    public function show(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($this->getSetting());
    }

    /**
     * Update contact settings (admin only).
     */
    public function update(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'address_line1' => ['required', 'string', 'max:255'],
            'address_line2' => ['nullable', 'string', 'max:255'],
        ]);

        $setting = $this->getSetting();
        $setting->fill($data);
        $setting->save();

        return response()->json($setting);
    }

    /**
     * Get (or create) the single contact settings row.
     */
    protected function getSetting(): ContactSetting
    {
        return ContactSetting::query()->firstOrCreate(
            ['id' => 1],
            [
                'email' => 'hello@Frame2Complex.com',
                'phone' => '+44 1274 722303',
                'address_line1' => 'Feather Rd, Bradford BD3 9DJ',
                'address_line2' => 'United Kingdom',
            ]
        );
    }
}
