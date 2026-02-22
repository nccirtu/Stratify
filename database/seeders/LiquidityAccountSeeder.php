<?php

namespace Database\Seeders;

use App\Models\LiquidityAccount;
use App\Models\TransactionCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class LiquidityAccountSeeder extends Seeder
{
    /**
     * @var array<int, array{name: string, section: string, order_index: int, source: string|null}>
     */
    protected array $accounts = [
        // Income
        ['name' => 'Forderungen aus Lieferung u. Leistungen', 'section' => 'income', 'order_index' => 1, 'source' => null],
        ['name' => 'Barverkäufe', 'section' => 'income', 'order_index' => 2, 'source' => null],
        ['name' => 'Erwartete Kundenanzahlungen', 'section' => 'income', 'order_index' => 3, 'source' => null],
        ['name' => 'Eigenkapital-Einlagen', 'section' => 'income', 'order_index' => 4, 'source' => null],
        ['name' => 'Kreditauszahlung', 'section' => 'income', 'order_index' => 5, 'source' => null],
        ['name' => 'Desinvestment und Anlageverkäufe', 'section' => 'income', 'order_index' => 6, 'source' => null],
        ['name' => 'Sonstige Einnahmen', 'section' => 'income', 'order_index' => 7, 'source' => null],
        // Investment
        ['name' => 'Grundstück/Gebäude/Umbaumaßnahmen', 'section' => 'investment', 'order_index' => 8, 'source' => null],
        ['name' => 'Anschaffung Maschinen/Geräte', 'section' => 'investment', 'order_index' => 9, 'source' => null],
        ['name' => 'Büroausstattung, PCs, Firmenfahrzeug', 'section' => 'investment', 'order_index' => 10, 'source' => null],
        // Operational
        ['name' => 'Ware, Material, Roh-/Hilfs-/Betriebsstoffe', 'section' => 'operational', 'order_index' => 11, 'source' => null],
        ['name' => 'Personalkosten', 'section' => 'operational', 'order_index' => 12, 'source' => 'employee'],
        ['name' => 'Fremdleistungen', 'section' => 'operational', 'order_index' => 13, 'source' => null],
        ['name' => 'Miete einschl. Nebenkosten', 'section' => 'operational', 'order_index' => 14, 'source' => null],
        ['name' => 'Leasing Maschinen', 'section' => 'operational', 'order_index' => 15, 'source' => null],
        ['name' => 'Reparaturen, Wartung', 'section' => 'operational', 'order_index' => 16, 'source' => null],
        ['name' => 'KFZ-Kosten: Leasing, Steuern, Versicherung', 'section' => 'operational', 'order_index' => 17, 'source' => null],
        ['name' => 'KFZ-Kosten: Benzin, Instandhaltung, Pflege', 'section' => 'operational', 'order_index' => 18, 'source' => null],
        ['name' => 'Sonstige Reisekosten', 'section' => 'operational', 'order_index' => 19, 'source' => null],
        ['name' => 'Betriebl. Versicherungen / Beiträge', 'section' => 'operational', 'order_index' => 20, 'source' => null],
        ['name' => 'Telefon/Fax/Internet/Handy/Porto', 'section' => 'operational', 'order_index' => 21, 'source' => null],
        ['name' => 'Werbekosten, Internet, Messen, Bewirtung', 'section' => 'operational', 'order_index' => 22, 'source' => null],
        ['name' => 'Buchführungs- und Steuerberatungskosten', 'section' => 'operational', 'order_index' => 23, 'source' => null],
        ['name' => 'Rechtsanwalts- und Beratungskosten', 'section' => 'operational', 'order_index' => 24, 'source' => null],
        ['name' => 'Sonstige Kosten (z.B. Gebühren, Abgaben)', 'section' => 'operational', 'order_index' => 25, 'source' => null],
        ['name' => 'Anzahlungen an Lieferanten', 'section' => 'operational', 'order_index' => 26, 'source' => null],
        // Financing
        ['name' => 'Zinsen für Darlehen und Kontokorrentkredite', 'section' => 'financing', 'order_index' => 27, 'source' => 'loan_interest'],
        ['name' => 'Tilgungsraten Darlehen', 'section' => 'financing', 'order_index' => 28, 'source' => 'loan_repayment'],
        ['name' => 'Umsatzsteuer (Zahllast oder Erstattung)', 'section' => 'financing', 'order_index' => 29, 'source' => null],
        ['name' => 'Steuern (Voraus-, Nachzahlungen für GewSt, KöSt)', 'section' => 'financing', 'order_index' => 30, 'source' => null],
        ['name' => 'Kapitalentnahmen', 'section' => 'financing', 'order_index' => 31, 'source' => null],
    ];

    /**
     * Maps transaction category slugs to their liquidity account order_index.
     *
     * @var array<string, int|null>
     */
    protected array $categoryMapping = [
        'produktverkaufe' => 1,
        'dienstleistungen' => 1,
        'beratungshonorare' => 1,
        'webshop-umsatze' => 2,
        'abonnements-lizenzen' => 1,
        'provisionen' => 1,
        'mieteinnahmen' => 7,
        'zinsertrage' => 7,
        'fordermittel-zuschusse' => 7,
        'sonstige-einnahmen' => 7,
        'miete-nebenkosten' => 14,
        'gehalter-lohne' => 12,
        'website-hosting' => 21,
        'webshop-kosten' => 25,
        'it-hardware' => 10,
        'software-lizenzen' => 25,
        'marketing-werbung' => 22,
        'versicherungen' => 20,
        'buromaterial-ausstattung' => 25,
        'telefon-internet' => 21,
        'reisekosten' => 19,
        'fahrzeugkosten' => 17,
        'steuerberater-buchhaltung' => 23,
        'rechtsberatung' => 24,
        'wareneinkauf' => 11,
        'versand-logistik' => 13,
        'fortbildung-schulungen' => 25,
        'bankgebuhren' => 25,
        'abschreibungen' => null,
        'sonstige-ausgaben' => 25,
    ];

    public function run(): void
    {
        foreach ($this->accounts as $account) {
            LiquidityAccount::query()->updateOrCreate(
                ['slug' => Str::slug($account['name'])],
                [
                    'name' => $account['name'],
                    'section' => $account['section'],
                    'order_index' => $account['order_index'],
                    'source' => $account['source'],
                    'is_active' => true,
                ],
            );
        }

        $this->mapTransactionCategories();
    }

    protected function mapTransactionCategories(): void
    {
        $accountsByOrderIndex = LiquidityAccount::all()->keyBy('order_index');

        foreach ($this->categoryMapping as $categorySlug => $orderIndex) {
            $liquidityAccountId = $orderIndex !== null
                ? $accountsByOrderIndex->get($orderIndex)?->id
                : null;

            TransactionCategory::query()
                ->where('slug', $categorySlug)
                ->update(['liquidity_account_id' => $liquidityAccountId]);
        }
    }
}
