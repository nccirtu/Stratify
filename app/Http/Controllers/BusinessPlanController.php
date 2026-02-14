<?php

namespace App\Http\Controllers;

use App\Actions\BusinessPlan\UpsertBusinessPlanStepOne;
use App\Actions\BusinessPlan\UpsertBusinessPlanStepThree;
use App\Actions\BusinessPlan\UpsertBusinessPlanStepTwo;
use App\Http\Requests\Businessplan\StoreStepOneRequest;
use App\Http\Requests\Businessplan\StoreStepThreeRequest;
use App\Http\Requests\Businessplan\StoreStepTwoRequest;
use App\Models\Branches;
use App\Models\BusinessPlan;
use App\Models\Company;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessPlanController extends Controller
{
    public function __construct(
        protected UpsertBusinessPlanStepOne $upsertStepOne,
        protected UpsertBusinessPlanStepTwo $upsertStepTwo,
        protected UpsertBusinessPlanStepThree $upsertStepThree
    ) {}

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
    public function create(): Response
    {
        return Inertia::render('businessplan/create', [
            'branches' => Branches::all(),
            'companies' => Company::where('user_id', auth()->id())->get(),
        ]);
    }

    /**
     * Store step one.
     */
    public function storeStepOne(StoreStepOneRequest $request): RedirectResponse
    {
        $businessPlan = $this->upsertStepOne->handle($request->validated());

        return redirect()->route('businessplan.edit', ['businessplan' => $businessPlan->id, 'step' => 2])
            ->with('success', 'Step 1 saved.');
    }

    /**
     * Store step two.
     */
    public function storeStepTwo(StoreStepTwoRequest $request, BusinessPlan $businessPlan): RedirectResponse
    {
        $this->upsertStepTwo->handle($businessPlan, $request->validated());

        return redirect()->route('businessplan.edit', ['businessplan' => $businessPlan->id, 'step' => 3])
            ->with('success', 'Step 2 saved.');
    }

    /**
     * Store step three.
     */
    public function storeStepThree(StoreStepThreeRequest $request, BusinessPlan $businessPlan): RedirectResponse
    {
        $this->upsertStepThree->handle($businessPlan, $request->validated());

        return redirect()->route('businessplan.index')
            ->with('success', 'Business Plan completed.');
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
    public function edit(BusinessPlan $businessPlan, Request $request): Response
    {
        $step = $request->query('step', 1);

        return Inertia::render('businessplan/edit', [
            'businessPlan' => $businessPlan,
            'step' => (int) $step,
            'branches' => Branches::all(),
            'companies' => Company::where('user_id', auth()->id())->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BusinessPlan $businessPlan): RedirectResponse
    {
        $step = $request->input('step', 1);

        if ($step == 1) {
            $data = app(StoreStepOneRequest::class)->validated();
            $this->upsertStepOne->handle($data, $businessPlan);
        } elseif ($step == 2) {
            $data = app(StoreStepTwoRequest::class)->validated();
            $this->upsertStepTwo->handle($businessPlan, $data);
        } elseif ($step == 3) {
            $data = app(StoreStepThreeRequest::class)->validated();
            $this->upsertStepThree->handle($businessPlan, $data);
        }

        return back()->with('success', "Step $step updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
