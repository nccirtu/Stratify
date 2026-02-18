<?php

namespace Database\Seeders;

use App\Models\Tax;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TaxSeeder extends Seeder
{
    /**
     * @var array<int, array{name: string, rate: float, code: string, country_code: string, description: string, is_inclusive: bool, reverse_charge: bool, applies_to: ?string}>
     */
    protected array $taxes = [
        ['name' => 'USt 19%', 'rate' => 19.00, 'code' => 'DE-UST-19', 'country_code' => 'DE', 'description' => 'Regelsteuersatz', 'is_inclusive' => false, 'reverse_charge' => false, 'applies_to' => null],
        ['name' => 'USt 7%', 'rate' => 7.00, 'code' => 'DE-UST-7', 'country_code' => 'DE', 'description' => 'Ermäßigter Steuersatz (Lebensmittel, Bücher, etc.)', 'is_inclusive' => false, 'reverse_charge' => false, 'applies_to' => null],
        ['name' => 'USt 0%', 'rate' => 0.00, 'code' => 'DE-UST-0', 'country_code' => 'DE', 'description' => 'Steuerbefreit (§4 UStG)', 'is_inclusive' => false, 'reverse_charge' => false, 'applies_to' => null],
        ['name' => 'Kleinunternehmerregelung', 'rate' => 0.00, 'code' => 'DE-KUR', 'country_code' => 'DE', 'description' => 'Keine USt gem. §19 UStG', 'is_inclusive' => false, 'reverse_charge' => false, 'applies_to' => null],
        ['name' => 'Reverse Charge', 'rate' => 0.00, 'code' => 'DE-RC', 'country_code' => 'DE', 'description' => 'Steuerschuldnerschaft des Leistungsempfängers (§13b UStG)', 'is_inclusive' => false, 'reverse_charge' => true, 'applies_to' => null],
        ['name' => 'Innergemeinschaftliche Lieferung', 'rate' => 0.00, 'code' => 'DE-IGL', 'country_code' => 'DE', 'description' => 'Steuerfreie innergemeinschaftliche Lieferung (§4 Nr. 1b UStG)', 'is_inclusive' => false, 'reverse_charge' => false, 'applies_to' => null],
        ['name' => 'USt 20% (AT)', 'rate' => 20.00, 'code' => 'AT-UST-20', 'country_code' => 'AT', 'description' => 'Regelsteuersatz Österreich', 'is_inclusive' => false, 'reverse_charge' => false, 'applies_to' => null],
        ['name' => 'USt 10% (AT)', 'rate' => 10.00, 'code' => 'AT-UST-10', 'country_code' => 'AT', 'description' => 'Ermäßigter Steuersatz Österreich', 'is_inclusive' => false, 'reverse_charge' => false, 'applies_to' => null],
        ['name' => 'USt 8.1% (CH)', 'rate' => 8.10, 'code' => 'CH-MWST-8', 'country_code' => 'CH', 'description' => 'Regelsteuersatz Schweiz', 'is_inclusive' => false, 'reverse_charge' => false, 'applies_to' => null],
        ['name' => 'USt 2.6% (CH)', 'rate' => 2.60, 'code' => 'CH-MWST-2', 'country_code' => 'CH', 'description' => 'Ermäßigter Steuersatz Schweiz', 'is_inclusive' => false, 'reverse_charge' => false, 'applies_to' => null],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->taxes as $tax) {
            Tax::query()->updateOrCreate(
                ['code' => $tax['code']],
                [
                    'name' => $tax['name'],
                    'slug' => Str::slug($tax['name']),
                    'rate' => $tax['rate'],
                    'country_code' => $tax['country_code'],
                    'description' => $tax['description'],
                    'is_inclusive' => $tax['is_inclusive'],
                    'reverse_charge' => $tax['reverse_charge'],
                    'applies_to' => $tax['applies_to'],
                    'is_active' => true,
                ],
            );
        }
    }
}
