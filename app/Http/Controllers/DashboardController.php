<?php

namespace App\Http\Controllers;

use App\Models\BusinessPlan;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $businessplans = BusinessPlan::with(['user', 'notes.user'])
            ->where('user_id', auth()->id())
            ->orderBy('updated_at', 'desc')
            ->paginate(15);

        return Inertia::render('dashboard', [
            'businessplans' => $businessplans,
        ]);
    }
}
