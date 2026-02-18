<?php

namespace App\Models;

use App\Enums\PostCategoryEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'image_url',
        'image_alt',
        'category',
        'author',
        'content',
        'is_active',
    ];

    protected $casts = [
        'category' => PostCategoryEnum::class,
        'is_active' => 'boolean',
    ];
}
