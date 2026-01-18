<?php

namespace App\Enums;

enum StatusEnum: string
{
    case DRAFT = 'draft';
    case IN_PROGRESS = 'in progress';
    case COMPLETED = 'completed';
}
