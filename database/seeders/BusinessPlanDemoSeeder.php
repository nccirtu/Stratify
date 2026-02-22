<?php

namespace Database\Seeders;

use App\Models\BankAccount;
use App\Models\BankAccountBalance;
use App\Models\BusinessPlan;
use App\Models\Loan;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BusinessPlanDemoSeeder extends Seeder
{
    public function run(): void
    {
        $currencyId = DB::table('currencies')->where('code', 'EUR')->value('id');
        $taxId = DB::table('taxes')->where('code', 'DE-UST-19')->value('id');

        $businessPlan = BusinessPlan::updateOrCreate(
            ['id' => 1],
            [
                'user_id' => 1,
                'name' => 'Demo Businessplan 2025',
                'slug' => 'demo-businessplan-2025',
                'description' => 'Demo-Daten für den Liquiditätsplan',
                'is_active' => true,
                'status' => 'draft',
                'company_name' => 'Muster GmbH',
                'period_from' => '2025-01-01',
                'period_until' => '2025-12-31',
                'liquidity_opening_balance' => 15000.00,
            ]
        );

        $this->seedTransactions($businessPlan->id, $currencyId, $taxId);
        $this->seedEmployees($businessPlan->id);
        $this->seedLoans($businessPlan->id);
        $this->seedBankAccounts($businessPlan->id);
    }

    private function seedTransactions(int $businessPlanId, int $currencyId, int $taxId): void
    {
        Transaction::where('business_plan_id', $businessPlanId)->delete();

        $categories = TransactionCategory::pluck('id', 'slug');

        $transactions = [
            // Einnahmen — Forderungen (Produktverkäufe)
            ['slug' => 'produktverkaufe', 'name' => 'Softwareverkauf Jan', 'type' => 'income', 'date' => '2025-01-20', 'amount' => 8500.00],
            ['slug' => 'produktverkaufe', 'name' => 'Softwareverkauf Feb', 'type' => 'income', 'date' => '2025-02-14', 'amount' => 6200.00],
            ['slug' => 'produktverkaufe', 'name' => 'Softwareverkauf März', 'type' => 'income', 'date' => '2025-03-10', 'amount' => 9100.00],
            ['slug' => 'produktverkaufe', 'name' => 'Softwareverkauf Apr', 'type' => 'income', 'date' => '2025-04-22', 'amount' => 7800.00],
            ['slug' => 'produktverkaufe', 'name' => 'Softwareverkauf Mai', 'type' => 'income', 'date' => '2025-05-08', 'amount' => 10500.00],
            ['slug' => 'produktverkaufe', 'name' => 'Softwareverkauf Jun', 'type' => 'income', 'date' => '2025-06-18', 'amount' => 11200.00],
            ['slug' => 'produktverkaufe', 'name' => 'Softwareverkauf Jul', 'type' => 'income', 'date' => '2025-07-25', 'amount' => 9800.00],
            ['slug' => 'produktverkaufe', 'name' => 'Softwareverkauf Aug', 'type' => 'income', 'date' => '2025-08-12', 'amount' => 8300.00],
            ['slug' => 'produktverkaufe', 'name' => 'Softwareverkauf Sep', 'type' => 'income', 'date' => '2025-09-30', 'amount' => 12400.00],
            ['slug' => 'produktverkaufe', 'name' => 'Softwareverkauf Okt', 'type' => 'income', 'date' => '2025-10-15', 'amount' => 13100.00],
            ['slug' => 'produktverkaufe', 'name' => 'Softwareverkauf Nov', 'type' => 'income', 'date' => '2025-11-20', 'amount' => 14200.00],
            ['slug' => 'produktverkaufe', 'name' => 'Softwareverkauf Dez', 'type' => 'income', 'date' => '2025-12-18', 'amount' => 15800.00],

            // Einnahmen — Dienstleistungen
            ['slug' => 'dienstleistungen', 'name' => 'Beratungsprojekt Müller AG', 'type' => 'income', 'date' => '2025-02-28', 'amount' => 4500.00],
            ['slug' => 'dienstleistungen', 'name' => 'Implementierung Schmidt GmbH', 'type' => 'income', 'date' => '2025-05-31', 'amount' => 7200.00],
            ['slug' => 'dienstleistungen', 'name' => 'Support-Vertrag Q3', 'type' => 'income', 'date' => '2025-09-15', 'amount' => 3800.00],
            ['slug' => 'dienstleistungen', 'name' => 'Schulung November', 'type' => 'income', 'date' => '2025-11-10', 'amount' => 2900.00],

            // Einnahmen — Abonnements
            ['slug' => 'abonnements-lizenzen', 'name' => 'SaaS Abos Jan', 'type' => 'income', 'date' => '2025-01-05', 'amount' => 2100.00],
            ['slug' => 'abonnements-lizenzen', 'name' => 'SaaS Abos Feb', 'type' => 'income', 'date' => '2025-02-05', 'amount' => 2300.00],
            ['slug' => 'abonnements-lizenzen', 'name' => 'SaaS Abos Mrz', 'type' => 'income', 'date' => '2025-03-05', 'amount' => 2600.00],
            ['slug' => 'abonnements-lizenzen', 'name' => 'SaaS Abos Apr', 'type' => 'income', 'date' => '2025-04-05', 'amount' => 2900.00],
            ['slug' => 'abonnements-lizenzen', 'name' => 'SaaS Abos Mai', 'type' => 'income', 'date' => '2025-05-05', 'amount' => 3100.00],
            ['slug' => 'abonnements-lizenzen', 'name' => 'SaaS Abos Jun', 'type' => 'income', 'date' => '2025-06-05', 'amount' => 3400.00],
            ['slug' => 'abonnements-lizenzen', 'name' => 'SaaS Abos Jul', 'type' => 'income', 'date' => '2025-07-05', 'amount' => 3600.00],
            ['slug' => 'abonnements-lizenzen', 'name' => 'SaaS Abos Aug', 'type' => 'income', 'date' => '2025-08-05', 'amount' => 3800.00],
            ['slug' => 'abonnements-lizenzen', 'name' => 'SaaS Abos Sep', 'type' => 'income', 'date' => '2025-09-05', 'amount' => 4100.00],
            ['slug' => 'abonnements-lizenzen', 'name' => 'SaaS Abos Okt', 'type' => 'income', 'date' => '2025-10-05', 'amount' => 4400.00],
            ['slug' => 'abonnements-lizenzen', 'name' => 'SaaS Abos Nov', 'type' => 'income', 'date' => '2025-11-05', 'amount' => 4700.00],
            ['slug' => 'abonnements-lizenzen', 'name' => 'SaaS Abos Dez', 'type' => 'income', 'date' => '2025-12-05', 'amount' => 5000.00],

            // Ausgaben — Miete
            ['slug' => 'miete-nebenkosten', 'name' => 'Büromiete Jan', 'type' => 'expense', 'date' => '2025-01-01', 'amount' => 1800.00],
            ['slug' => 'miete-nebenkosten', 'name' => 'Büromiete Feb', 'type' => 'expense', 'date' => '2025-02-01', 'amount' => 1800.00],
            ['slug' => 'miete-nebenkosten', 'name' => 'Büromiete Mrz', 'type' => 'expense', 'date' => '2025-03-01', 'amount' => 1800.00],
            ['slug' => 'miete-nebenkosten', 'name' => 'Büromiete Apr', 'type' => 'expense', 'date' => '2025-04-01', 'amount' => 1800.00],
            ['slug' => 'miete-nebenkosten', 'name' => 'Büromiete Mai', 'type' => 'expense', 'date' => '2025-05-01', 'amount' => 1800.00],
            ['slug' => 'miete-nebenkosten', 'name' => 'Büromiete Jun', 'type' => 'expense', 'date' => '2025-06-01', 'amount' => 1800.00],
            ['slug' => 'miete-nebenkosten', 'name' => 'Büromiete Jul', 'type' => 'expense', 'date' => '2025-07-01', 'amount' => 1800.00],
            ['slug' => 'miete-nebenkosten', 'name' => 'Büromiete Aug', 'type' => 'expense', 'date' => '2025-08-01', 'amount' => 1800.00],
            ['slug' => 'miete-nebenkosten', 'name' => 'Büromiete Sep', 'type' => 'expense', 'date' => '2025-09-01', 'amount' => 1800.00],
            ['slug' => 'miete-nebenkosten', 'name' => 'Büromiete Okt', 'type' => 'expense', 'date' => '2025-10-01', 'amount' => 1800.00],
            ['slug' => 'miete-nebenkosten', 'name' => 'Büromiete Nov', 'type' => 'expense', 'date' => '2025-11-01', 'amount' => 1800.00],
            ['slug' => 'miete-nebenkosten', 'name' => 'Büromiete Dez', 'type' => 'expense', 'date' => '2025-12-01', 'amount' => 1800.00],

            // Ausgaben — Marketing
            ['slug' => 'marketing-werbung', 'name' => 'Google Ads Q1', 'type' => 'expense', 'date' => '2025-01-15', 'amount' => 1200.00],
            ['slug' => 'marketing-werbung', 'name' => 'Messe Frühjahr', 'type' => 'expense', 'date' => '2025-03-20', 'amount' => 3500.00],
            ['slug' => 'marketing-werbung', 'name' => 'LinkedIn Ads Q2', 'type' => 'expense', 'date' => '2025-05-10', 'amount' => 900.00],
            ['slug' => 'marketing-werbung', 'name' => 'Google Ads Q3', 'type' => 'expense', 'date' => '2025-07-15', 'amount' => 1400.00],
            ['slug' => 'marketing-werbung', 'name' => 'Messe Herbst', 'type' => 'expense', 'date' => '2025-09-22', 'amount' => 4200.00],
            ['slug' => 'marketing-werbung', 'name' => 'Google Ads Q4', 'type' => 'expense', 'date' => '2025-10-15', 'amount' => 1600.00],

            // Ausgaben — Software & Lizenzen
            ['slug' => 'software-lizenzen', 'name' => 'AWS Hosting Jan', 'type' => 'expense', 'date' => '2025-01-31', 'amount' => 650.00],
            ['slug' => 'software-lizenzen', 'name' => 'AWS Hosting Feb', 'type' => 'expense', 'date' => '2025-02-28', 'amount' => 650.00],
            ['slug' => 'software-lizenzen', 'name' => 'AWS Hosting Mrz', 'type' => 'expense', 'date' => '2025-03-31', 'amount' => 720.00],
            ['slug' => 'software-lizenzen', 'name' => 'AWS Hosting Apr', 'type' => 'expense', 'date' => '2025-04-30', 'amount' => 720.00],
            ['slug' => 'software-lizenzen', 'name' => 'AWS Hosting Mai', 'type' => 'expense', 'date' => '2025-05-31', 'amount' => 750.00],
            ['slug' => 'software-lizenzen', 'name' => 'AWS Hosting Jun', 'type' => 'expense', 'date' => '2025-06-30', 'amount' => 750.00],
            ['slug' => 'software-lizenzen', 'name' => 'Atlassian Suite', 'type' => 'expense', 'date' => '2025-07-15', 'amount' => 480.00],
            ['slug' => 'software-lizenzen', 'name' => 'AWS Hosting Aug', 'type' => 'expense', 'date' => '2025-08-31', 'amount' => 820.00],
            ['slug' => 'software-lizenzen', 'name' => 'AWS Hosting Sep', 'type' => 'expense', 'date' => '2025-09-30', 'amount' => 820.00],
            ['slug' => 'software-lizenzen', 'name' => 'AWS Hosting Okt', 'type' => 'expense', 'date' => '2025-10-31', 'amount' => 900.00],
            ['slug' => 'software-lizenzen', 'name' => 'AWS Hosting Nov', 'type' => 'expense', 'date' => '2025-11-30', 'amount' => 900.00],
            ['slug' => 'software-lizenzen', 'name' => 'AWS Hosting Dez', 'type' => 'expense', 'date' => '2025-12-31', 'amount' => 950.00],

            // Ausgaben — Steuerberater (quartalsweise)
            ['slug' => 'steuerberater-buchhaltung', 'name' => 'Steuerberatung Q1', 'type' => 'expense', 'date' => '2025-03-31', 'amount' => 1200.00],
            ['slug' => 'steuerberater-buchhaltung', 'name' => 'Steuerberatung Q2', 'type' => 'expense', 'date' => '2025-06-30', 'amount' => 1200.00],
            ['slug' => 'steuerberater-buchhaltung', 'name' => 'Steuerberatung Q3', 'type' => 'expense', 'date' => '2025-09-30', 'amount' => 1200.00],
            ['slug' => 'steuerberater-buchhaltung', 'name' => 'Steuerberatung Q4', 'type' => 'expense', 'date' => '2025-12-31', 'amount' => 1200.00],

            // Ausgaben — Wareneinkauf
            ['slug' => 'wareneinkauf', 'name' => 'Hardware Komponenten Q1', 'type' => 'expense', 'date' => '2025-02-10', 'amount' => 3200.00],
            ['slug' => 'wareneinkauf', 'name' => 'Zubehör Q2', 'type' => 'expense', 'date' => '2025-05-20', 'amount' => 2800.00],
            ['slug' => 'wareneinkauf', 'name' => 'Lagerware Q3', 'type' => 'expense', 'date' => '2025-08-15', 'amount' => 4100.00],
            ['slug' => 'wareneinkauf', 'name' => 'Jahresschluss Einkauf', 'type' => 'expense', 'date' => '2025-11-25', 'amount' => 5600.00],

            // Ausgaben — Versicherungen
            ['slug' => 'versicherungen', 'name' => 'Betriebshaftpflicht', 'type' => 'expense', 'date' => '2025-01-10', 'amount' => 980.00],
            ['slug' => 'versicherungen', 'name' => 'Cyberversicherung', 'type' => 'expense', 'date' => '2025-07-10', 'amount' => 1200.00],

            // Ausgaben — Telefon & Internet
            ['slug' => 'telefon-internet', 'name' => 'Telekom Business Jan', 'type' => 'expense', 'date' => '2025-01-15', 'amount' => 180.00],
            ['slug' => 'telefon-internet', 'name' => 'Telekom Business Apr', 'type' => 'expense', 'date' => '2025-04-15', 'amount' => 180.00],
            ['slug' => 'telefon-internet', 'name' => 'Telekom Business Jul', 'type' => 'expense', 'date' => '2025-07-15', 'amount' => 180.00],
            ['slug' => 'telefon-internet', 'name' => 'Telekom Business Okt', 'type' => 'expense', 'date' => '2025-10-15', 'amount' => 180.00],

            // Investition — IT Hardware (geht in Investitions-Sektion)
            ['slug' => 'it-hardware', 'name' => 'MacBook Pro Entwickler', 'type' => 'expense', 'date' => '2025-02-05', 'amount' => 3800.00],
            ['slug' => 'it-hardware', 'name' => 'Server Rack Erweiterung', 'type' => 'expense', 'date' => '2025-06-20', 'amount' => 8500.00],
        ];

        foreach ($transactions as $data) {
            $categoryId = $categories[$data['slug']] ?? null;

            if (! $categoryId) {
                continue;
            }

            Transaction::create([
                'business_plan_id' => $businessPlanId,
                'category_id' => $categoryId,
                'currency_id' => $currencyId,
                'tax_id' => $taxId,
                'name' => $data['name'],
                'slug' => Str::slug($data['name'].'-'.uniqid()),
                'type' => $data['type'],
                'status' => 'completed',
                'date' => $data['date'],
                'amount' => $data['amount'],
                'total_amount' => $data['amount'],
                'payment_method' => 'transfer',
                'is_active' => true,
                'is_forecast' => false,
                'is_recurring' => false,
            ]);
        }
    }

    private function seedEmployees(int $businessPlanId): void
    {
        // SQLite FK workaround: employees migration references 'businessplans' instead of 'business_plans'
        DB::unprepared('PRAGMA foreign_keys = OFF');
        DB::table('employees')->where('business_plan_id', $businessPlanId)->delete();

        DB::table('employees')->insert([
            [
                'business_plan_id' => $businessPlanId,
                'job_title' => 'Senior Developer',
                'number_of_employees' => 2,
                'salary' => 4500.00,
                'date_of_hire' => '2025-01-01',
                'working_hours_per_week' => 40,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'business_plan_id' => $businessPlanId,
                'job_title' => 'Vertriebsmitarbeiter',
                'number_of_employees' => 1,
                'salary' => 3200.00,
                'date_of_hire' => '2025-04-01',
                'working_hours_per_week' => 40,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::unprepared('PRAGMA foreign_keys = ON');
    }

    private function seedLoans(int $businessPlanId): void
    {
        Loan::where('business_plan_id', $businessPlanId)->delete();

        Loan::create([
            'business_plan_id' => $businessPlanId,
            'name' => 'KfW Gründerkredit',
            'loan_amount' => 150000.00,
            'interest_rate' => 0.0475,
            'monthly_installment' => 1800.00,
            'start_date' => '2025-01-01',
            'end_date' => '2032-12-31',
            'description' => 'KfW Gründerkredit für Erstausstattung und Betriebsmittel',
        ]);
    }

    private function seedBankAccounts(int $businessPlanId): void
    {
        BankAccount::where('business_plan_id', $businessPlanId)->delete();

        $account = BankAccount::create([
            'business_plan_id' => $businessPlanId,
            'name' => 'Geschäftskonto Sparkasse',
            'order_index' => 1,
            'dispo_limit' => 10000.00,
        ]);

        $balances = [
            1 => 18500.00,
            2 => 22300.00,
            3 => 27800.00,
            4 => 31200.00,
            5 => 38600.00,
            6 => 42100.00,
            7 => 45800.00,
            8 => 43200.00,
            9 => 52700.00,
            10 => 59400.00,
            11 => 61800.00,
            12 => 68500.00,
        ];

        foreach ($balances as $month => $balance) {
            BankAccountBalance::create([
                'bank_account_id' => $account->id,
                'month' => $month,
                'year' => 2025,
                'balance' => $balance,
            ]);
        }
    }
}
