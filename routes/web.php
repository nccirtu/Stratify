<?php

use App\Http\Controllers\BusinessPlanController;
use App\Http\Controllers\BusinessPlanPdfController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SubscriptionController;
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
        Route::put('{businessPlan}/save-step', [BusinessPlanController::class, 'saveStep'])->name('save-step');
        Route::post('{businessPlan}/transactions', [BusinessPlanController::class, 'storeTransaction'])->name('transaction.store');
    });

    Route::resource('businessplans', BusinessPlanController::class)->names([
        'index' => 'businessplan.index',
        'create' => 'businessplan.create',
        'store' => 'businessplan.store',
        'show' => 'businessplan.show',
        'edit' => 'businessplan.edit',
        'update' => 'businessplan.update',
        'destroy' => 'businessplan.destroy',
    ])->parameters([
        'businessplans' => 'businessPlan',
    ]);

    Route::get('/subscription/checkout', [SubscriptionController::class, 'checkout'])->name('subscription.checkout');
    Route::get('/subscription/portal', [SubscriptionController::class, 'portal'])->name('subscription.portal');

    Route::get('/business-plan/{businessPlan}/pdf', [BusinessPlanPdfController::class, 'show'])->name('business-plan.pdf');
    Route::get('/business-plan/{businessPlan}/pdf/download', [BusinessPlanPdfController::class, 'download'])->name('business-plan.pdf.download');

    Route::get('/blog/{post:slug}', [PostController::class, 'show'])->name('blog.show');
});

require __DIR__.'/settings.php';
