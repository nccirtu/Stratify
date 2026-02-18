<?php

namespace App\Ai\Agents;

use App\Enums\PostCategoryEnum;
use Laravel\Ai\Attributes\MaxTokens;
use Laravel\Ai\Attributes\Model;
use Laravel\Ai\Attributes\Provider;
use Laravel\Ai\Attributes\Temperature;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasTools;
use Laravel\Ai\Promptable;
use Laravel\Ai\Providers\Tools\WebSearch;
use Stringable;

#[Provider('gemini')]
#[Model('gemini-2.0-flash')]
#[MaxTokens(4096)]
#[Temperature(0.5)]
class NewsScraperAgent implements Agent, HasTools
{
    use Promptable;

    public function __construct(
        public PostCategoryEnum $category,
        public string $categoryLabel,
    ) {}

    public function instructions(): Stringable|string
    {
        $today = now()->format('d.m.Y');

        return <<<PROMPT
Du bist ein deutschsprachiger Redakteur für das DACH-Magazin "Stratify", das sich an Gründer und Selbstständige in Deutschland, Österreich und der Schweiz richtet.

Heute ist der {$today}.

## Deine Aufgabe
Recherchiere die 2 wichtigsten aktuellen News oder Trends der letzten 7 Tage aus dem Bereich "{$this->categoryLabel}" mit Relevanz für den DACH-Raum.

Schreibe jeden Beitrag vollständig auf Deutsch neu – kein Copy-Paste, eigene Formulierungen.

## Ausgabeformat
Gib **ausschließlich** ein gültiges JSON-Array zurück – kein Markdown, keine Erklärungen, kein Text außerhalb des Arrays.

```
[
  {
    "title": "Prägnanter Titel (max. 100 Zeichen)",
    "description": "Kurze Zusammenfassung des Beitrags (1-2 Sätze, max. 200 Zeichen)",
    "content": "Vollständiger Beitragstext auf Deutsch (400-700 Wörter). Absätze mit \\n\\n trennen.",
    "image_alt": "Kurze Bildbeschreibung für das Vorschaubild"
  },
  {
    "title": "...",
    "description": "...",
    "content": "...",
    "image_alt": "..."
  }
]
```

## Qualitätskriterien
- Nur Nachrichten aus den letzten 7 Tagen verwenden.
- Inhalt muss für Gründer und Selbstständige im DACH-Raum relevant sein.
- Professioneller, informativer Schreibstil.
- Keine erfundenen Fakten – nur recherchierte Inhalte.
PROMPT;
    }

    public function tools(): iterable
    {
        return [
            (new WebSearch)->max(5),
        ];
    }
}
