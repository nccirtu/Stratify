<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function checkout(Request $request): mixed
    {
        if ($request->user()->subscribed('default')) {
            return redirect()->route('filament.app.auth.profile');
        }

        return $request->user()
            ->newSubscription('default', config('subscription.stripe_price_id'))
            ->checkout([
                'success_url' => route('filament.app.auth.profile'),
                'cancel_url' => route('filament.app.auth.profile'),
                'customer_update' => [
                    'address' => 'auto',
                ],
            ]);
    }

    public function portal(Request $request): mixed
    {
        return $request->user()->redirectToBillingPortal(
            route('filament.app.auth.profile'),
        );
    }
}
