<?php

namespace App\Enums;

enum StatusEnum: string
{
    case DRAFT = 'draft';
    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';
}
