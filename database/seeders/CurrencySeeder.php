<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CurrencySeeder extends Seeder
{
    /**
     * @var array<int, array{name: string, code: string, symbol: string}>
     */
    protected array $currencies = [
        ['name' => 'Euro', 'code' => 'EUR', 'symbol' => '€'],
        ['name' => 'Schweizer Franken', 'code' => 'CHF', 'symbol' => 'CHF'],
        ['name' => 'Britisches Pfund', 'code' => 'GBP', 'symbol' => '£'],
        ['name' => 'US-Dollar', 'code' => 'USD', 'symbol' => '$'],
        ['name' => 'Schwedische Krone', 'code' => 'SEK', 'symbol' => 'kr'],
        ['name' => 'Dänische Krone', 'code' => 'DKK', 'symbol' => 'kr'],
        ['name' => 'Norwegische Krone', 'code' => 'NOK', 'symbol' => 'kr'],
        ['name' => 'Polnischer Zloty', 'code' => 'PLN', 'symbol' => 'zł'],
        ['name' => 'Tschechische Krone', 'code' => 'CZK', 'symbol' => 'Kč'],
        ['name' => 'Ungarischer Forint', 'code' => 'HUF', 'symbol' => 'Ft'],
        ['name' => 'Rumänischer Leu', 'code' => 'RON', 'symbol' => 'lei'],
        ['name' => 'Bulgarischer Lew', 'code' => 'BGN', 'symbol' => 'лв'],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->currencies as $currency) {
            Currency::query()->updateOrCreate(
                ['code' => $currency['code']],
                [
                    'name' => $currency['name'],
                    'slug' => Str::slug($currency['name']),
                    'symbol' => $currency['symbol'],
                ],
            );
        }
    }
}
