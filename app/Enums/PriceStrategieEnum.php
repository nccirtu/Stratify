<?php

namespace App\Enums;

enum PriceStrategieEnum: string
{
    case LOWEST_PRICE = 'lowest_price';
    case HIGHEST_PRICE = 'highest_price';
    case AVERAGE_PRICE = 'average_price';
}
