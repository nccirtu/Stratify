<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function greeting(): string
    {
        $hour = now()->hour;

        return match (true) {
            $hour < 12 => __('Guten Morgen'),
            $hour < 18 => __('Guten Tag'),
            default => __('Guten Abend'),
        };
    }

    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'greeting' => $this->greeting(),
            'blogPosts' => Inertia::scroll(fn () => Post::query()->where('posts.is_active', true)->latest()->paginate(6)),
            'postCategories' => \App\Enums\PostCategoryEnum::label(),
            'postCategoryColors' => \App\Enums\PostCategoryEnum::colors(),
        ]);
    }
}
