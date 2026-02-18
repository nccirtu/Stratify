<?php

namespace App\Http\Controllers;

use App\Enums\PostCategoryEnum;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display the specified blog post.
     */
    public function show(Post $post): Response
    {
        return Inertia::render('blog/show', [
            'blogPost' => $post,
            'postCategories' => PostCategoryEnum::label(),
            'postCategoryColors' => PostCategoryEnum::colors(),
        ]);
    }
}
