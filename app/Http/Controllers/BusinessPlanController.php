<?php

namespace App\Http\Controllers;

use App\Http\Requests\Businessplan\BusinessPlanStoreRequest;
use App\Models\BusinessPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $businessplans = BusinessPlan::with(['user', 'notes.user'])
            ->where('user_id', auth()->id())
            ->paginate(15);

        return Inertia::render('businessplan/index', [
            'businessplans' => $businessplans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BusinessPlanStoreRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        BusinessPlan::create($data);

        return redirect()->route('businessplan.index')->with('success', 'Business Plan created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
