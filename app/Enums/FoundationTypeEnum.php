<?php

namespace App\Enums;

enum FoundationTypeEnum: string
{
    case NEW = 'new';
    case EXPANSION = 'expansion';
    case RESTRUCTURING = 'restructuring';
    case RELOCATION = 'relocation';
    case TAKEOVER = 'takeover';
}
