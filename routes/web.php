<?php

use App\Http\Controllers\BusinessPlanController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('businessplans')->name('businessplan.')->group(function () {
        Route::post('step-one', [BusinessPlanController::class, 'storeStepOne'])->name('step-one.store');
        Route::post('{businessPlan}/step-two', [BusinessPlanController::class, 'storeStepTwo'])->name('step-two.store');
        Route::post('{businessPlan}/step-three', [BusinessPlanController::class, 'storeStepThree'])->name('step-three.store');
    });

    Route::resource('businessplans', BusinessPlanController::class)->names([
        'index' => 'businessplan.index',
        'create' => 'businessplan.create',
        'store' => 'businessplan.store',
        'show' => 'businessplan.show',
        'edit' => 'businessplan.edit',
        'update' => 'businessplan.update',
        'destroy' => 'businessplan.destroy',
    ]);
});

require __DIR__.'/settings.php';
