<?php

namespace App\Models;

use App\Enums\PostCategoryEnum;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'image_url',
        'image_alt',
        'category',
        'author',
        'content',
    ];

    protected $casts = [
        'category' => PostCategoryEnum::class,
    ];
}
