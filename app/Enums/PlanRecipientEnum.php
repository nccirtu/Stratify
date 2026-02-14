<?php

namespace App\Enums;

enum PlanRecipientEnum: string
{
    case INVESTOR = 'investor';
    case EMPLOYMENT_OFFICE = 'employment_office';
    case BANK = 'bank';
    case GOVERNMENT = 'government';
    case OWN = 'own';
    case OTHER = 'other';
}
