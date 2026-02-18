<?php

namespace Database\Seeders;

use App\Models\TransactionCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TransactionCategorySeeder extends Seeder
{
    /**
     * @var array<int, array{name: string, type: string, description: string}>
     */
    protected array $categories = [
        // Income categories
        ['name' => 'Produktverkäufe', 'type' => 'income', 'description' => 'Einnahmen aus dem Verkauf von Produkten'],
        ['name' => 'Dienstleistungen', 'type' => 'income', 'description' => 'Einnahmen aus erbrachten Dienstleistungen'],
        ['name' => 'Beratungshonorare', 'type' => 'income', 'description' => 'Einnahmen aus Beratungstätigkeiten'],
        ['name' => 'Webshop-Umsätze', 'type' => 'income', 'description' => 'Einnahmen aus dem Online-Shop'],
        ['name' => 'Abonnements & Lizenzen', 'type' => 'income', 'description' => 'Wiederkehrende Einnahmen aus Abos und Lizenzgebühren'],
        ['name' => 'Provisionen', 'type' => 'income', 'description' => 'Einnahmen aus Vermittlungsprovisionen'],
        ['name' => 'Mieteinnahmen', 'type' => 'income', 'description' => 'Einnahmen aus der Vermietung von Räumen oder Gegenständen'],
        ['name' => 'Zinserträge', 'type' => 'income', 'description' => 'Einnahmen aus Zinsen auf Bankguthaben'],
        ['name' => 'Fördermittel & Zuschüsse', 'type' => 'income', 'description' => 'Staatliche Förderungen, Zuschüsse und Subventionen'],
        ['name' => 'Sonstige Einnahmen', 'type' => 'income', 'description' => 'Einnahmen, die keiner anderen Kategorie zugeordnet werden können'],

        // Expense categories
        ['name' => 'Miete & Nebenkosten', 'type' => 'expense', 'description' => 'Büromiete, Gewerbemiete und Nebenkosten'],
        ['name' => 'Gehälter & Löhne', 'type' => 'expense', 'description' => 'Personalkosten, Gehälter und Sozialabgaben'],
        ['name' => 'Website & Hosting', 'type' => 'expense', 'description' => 'Kosten für Webseite, Domains und Hosting'],
        ['name' => 'Webshop-Kosten', 'type' => 'expense', 'description' => 'Plattformgebühren, Plugins und Wartung des Online-Shops'],
        ['name' => 'IT Hardware', 'type' => 'expense', 'description' => 'Computer, Laptops, Server und sonstige IT-Geräte'],
        ['name' => 'Software & Lizenzen', 'type' => 'expense', 'description' => 'Softwarelizenzen, SaaS-Abonnements und Cloud-Dienste'],
        ['name' => 'Marketing & Werbung', 'type' => 'expense', 'description' => 'Online-Werbung, Printmedien, Flyer und Kampagnen'],
        ['name' => 'Versicherungen', 'type' => 'expense', 'description' => 'Betriebshaftpflicht, Sachversicherungen und weitere Policen'],
        ['name' => 'Büromaterial & Ausstattung', 'type' => 'expense', 'description' => 'Schreibwaren, Möbel und Bürobedarf'],
        ['name' => 'Telefon & Internet', 'type' => 'expense', 'description' => 'Telekommunikationskosten und Internetanschlüsse'],
        ['name' => 'Reisekosten', 'type' => 'expense', 'description' => 'Geschäftsreisen, Fahrten, Übernachtungen und Verpflegung'],
        ['name' => 'Fahrzeugkosten', 'type' => 'expense', 'description' => 'Leasing, Kraftstoff, Wartung und Versicherung'],
        ['name' => 'Steuerberater & Buchhaltung', 'type' => 'expense', 'description' => 'Kosten für Steuerberatung und Buchhaltungsdienstleistungen'],
        ['name' => 'Rechtsberatung', 'type' => 'expense', 'description' => 'Anwaltskosten und juristische Beratung'],
        ['name' => 'Wareneinkauf', 'type' => 'expense', 'description' => 'Einkauf von Waren und Rohstoffen'],
        ['name' => 'Versand & Logistik', 'type' => 'expense', 'description' => 'Versandkosten, Verpackung und Logistikdienstleistungen'],
        ['name' => 'Fortbildung & Schulungen', 'type' => 'expense', 'description' => 'Weiterbildungen, Kurse und Fachliteratur'],
        ['name' => 'Bankgebühren', 'type' => 'expense', 'description' => 'Kontoführungsgebühren, Transaktionskosten und Zahlungsanbieter'],
        ['name' => 'Abschreibungen', 'type' => 'expense', 'description' => 'Abschreibungen auf Anlagevermögen'],
        ['name' => 'Sonstige Ausgaben', 'type' => 'expense', 'description' => 'Ausgaben, die keiner anderen Kategorie zugeordnet werden können'],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->categories as $category) {
            TransactionCategory::query()->updateOrCreate(
                ['slug' => Str::slug($category['name'])],
                [
                    'name' => $category['name'],
                    'type' => $category['type'],
                    'description' => $category['description'],
                    'is_active' => true,
                ],
            );
        }
    }
}
