<?php

namespace App\Enums;

enum PriceCalculationEnum: string
{
    case COMPETITOR_PRICE = 'competitor_price';
    case COST_WITH_PROFIT = 'cost_with_profit';
    case MARKET_PRICE = 'market_price';
}
