<?php

namespace Database\Seeders;

use App\Models\Branches;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BranchesSeeder extends Seeder
{
    /**
     * @var array<int, array{name: string, description: string}>
     */
    protected array $branches = [
        ['name' => 'IT & Softwareentwicklung', 'description' => 'Softwareentwicklung, IT-Dienstleistungen, Cloud-Computing und Systemintegration'],
        ['name' => 'E-Commerce & Online-Handel', 'description' => 'Online-Shops, Marktplätze, Dropshipping und digitale Handelsplattformen'],
        ['name' => 'Gesundheitswesen & Medizin', 'description' => 'Arztpraxen, Kliniken, Pflegedienste, Medizintechnik und Gesundheitsdienstleistungen'],
        ['name' => 'Gastronomie & Lebensmittel', 'description' => 'Restaurants, Cafés, Catering, Lebensmittelproduktion und -handel'],
        ['name' => 'Handwerk & Baugewerbe', 'description' => 'Bau, Renovierung, Elektrik, Sanitär und handwerkliche Dienstleistungen'],
        ['name' => 'Einzelhandel', 'description' => 'Stationärer Handel, Fachgeschäfte und Ladengeschäfte'],
        ['name' => 'Beratung & Consulting', 'description' => 'Unternehmensberatung, Managementberatung und strategische Beratung'],
        ['name' => 'Marketing & Werbung', 'description' => 'Werbeagenturen, Online-Marketing, Social Media und Markenentwicklung'],
        ['name' => 'Bildung & Coaching', 'description' => 'Nachhilfe, Weiterbildung, Coaching, Schulungen und E-Learning'],
        ['name' => 'Finanzdienstleistungen', 'description' => 'Finanzberatung, Versicherungen, Buchhaltung und Steuerberatung'],
        ['name' => 'Immobilien', 'description' => 'Immobilienvermittlung, Hausverwaltung und Immobilienentwicklung'],
        ['name' => 'Logistik & Transport', 'description' => 'Spedition, Kurierdienste, Lagerhaltung und Lieferketten'],
        ['name' => 'Energie & Umwelt', 'description' => 'Erneuerbare Energien, Umwelttechnik, Nachhaltigkeit und Recycling'],
        ['name' => 'Tourismus & Reisen', 'description' => 'Reisebüros, Hotels, Ferienwohnungen und Erlebnistourismus'],
        ['name' => 'Fitness & Sport', 'description' => 'Fitnessstudios, Personal Training, Sportartikel und Sportveranstaltungen'],
        ['name' => 'Mode & Textilien', 'description' => 'Bekleidung, Accessoires, Textildesign und Modehandel'],
        ['name' => 'Medien & Verlagswesen', 'description' => 'Verlage, Journalismus, Content-Produktion und Mediendienstleistungen'],
        ['name' => 'Landwirtschaft', 'description' => 'Ackerbau, Viehzucht, ökologische Landwirtschaft und Agrarhandel'],
        ['name' => 'Automobil & Mobilität', 'description' => 'Autohandel, Werkstätten, Fahrzeugvermietung und Mobilitätslösungen'],
        ['name' => 'Kreativwirtschaft & Design', 'description' => 'Grafikdesign, Fotografie, Film, Kunst und kreative Dienstleistungen'],
        ['name' => 'Recht & Rechtsberatung', 'description' => 'Anwaltskanzleien, Rechtsberatung und juristische Dienstleistungen'],
        ['name' => 'Personalwesen & Recruiting', 'description' => 'Personalvermittlung, HR-Beratung und Zeitarbeit'],
        ['name' => 'Telekommunikation', 'description' => 'Mobilfunk, Internetdienste und Kommunikationstechnologie'],
        ['name' => 'Schönheit & Wellness', 'description' => 'Kosmetikstudios, Friseursalons, Spas und Wellnessdienstleistungen'],
        ['name' => 'Sicherheit & Facility Management', 'description' => 'Sicherheitsdienste, Gebäudemanagement und Reinigungsservices'],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->branches as $branch) {
            Branches::query()->updateOrCreate(
                ['slug' => Str::slug($branch['name'])],
                [
                    'name' => $branch['name'],
                    'description' => $branch['description'],
                    'is_active' => true,
                ],
            );
        }
    }
}
