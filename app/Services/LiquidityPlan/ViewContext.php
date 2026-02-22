<?php

namespace App\Services\LiquidityPlan;

use Carbon\Carbon;

class ViewContext
{
    public const YEAR = 'year';

    public const MONTH = 'month';

    public const WEEK = 'week';

    private const MONTH_LABELS = [
        1 => 'Jan', 2 => 'Feb', 3 => 'Mär', 4 => 'Apr',
        5 => 'Mai', 6 => 'Jun', 7 => 'Jul', 8 => 'Aug',
        9 => 'Sep', 10 => 'Okt', 11 => 'Nov', 12 => 'Dez',
    ];

    private const DAY_LABELS = [1 => 'Mo', 2 => 'Di', 3 => 'Mi', 4 => 'Do', 5 => 'Fr', 6 => 'Sa', 7 => 'So'];

    public function __construct(
        public readonly string $view,
        public readonly int $year,
        public readonly ?int $month = null,
        public readonly ?int $isoWeek = null,
    ) {}

    /**
     * SQLite strftime expression used in GROUP BY to extract the period key from a date column.
     */
    public function sqlDateKey(): string
    {
        return match ($this->view) {
            self::MONTH => "CAST(strftime('%W', date) AS INTEGER)",
            self::WEEK => "CAST(strftime('%w', date) AS INTEGER)",
            default => "CAST(strftime('%m', date) AS INTEGER)",
        };
    }

    /**
     * Returns [start_date, end_date] strings for the WHERE filter on the date column.
     *
     * @return array{0: string, 1: string}
     */
    public function dateRange(): array
    {
        return match ($this->view) {
            self::MONTH => [
                sprintf('%04d-%02d-01', $this->year, $this->month),
                Carbon::create($this->year, $this->month, 1)->endOfMonth()->toDateString(),
            ],
            self::WEEK => $this->weekDateRange(),
            default => ["{$this->year}-01-01", "{$this->year}-12-31"],
        };
    }

    /**
     * All valid column keys for this view (used to initialize empty result arrays).
     *
     * @return int[]
     */
    public function columnKeys(): array
    {
        return match ($this->view) {
            self::MONTH => $this->isoWeeksInMonth(),
            self::WEEK => range(1, 7), // Mo=1 .. So=7
            default => range(1, 12),
        };
    }

    /**
     * Human-readable column labels in the same order as columnKeys().
     *
     * @return string[]
     */
    public function columnLabels(): array
    {
        return match ($this->view) {
            self::MONTH => array_map(fn (int $w) => "KW {$w}", $this->isoWeeksInMonth()),
            self::WEEK => array_values(self::DAY_LABELS),
            default => array_values(self::MONTH_LABELS),
        };
    }

    public function columnCount(): int
    {
        return count($this->columnKeys());
    }

    /**
     * Maps a raw SQLite strftime('%w') result (0=Sun) to Mo=1..So=7 for week view,
     * or passes through unchanged for year/month view.
     */
    public function normalizeKey(int $rawKey): int
    {
        if ($this->view === self::WEEK) {
            return $rawKey === 0 ? 7 : $rawKey;
        }

        return $rawKey;
    }

    /**
     * ISO week numbers available for the week-picker dropdown
     * (weeks that have at least one day in the selected month).
     *
     * @return int[]
     */
    public function availableWeeks(): array
    {
        $targetMonth = $this->month ?? (int) now()->format('m');

        return $this->isoWeeksForMonth($targetMonth);
    }

    /**
     * ISO week numbers that have at least one day in the given month of $this->year.
     *
     * @return int[]
     */
    private function isoWeeksInMonth(): array
    {
        return $this->isoWeeksForMonth($this->month ?? (int) now()->format('m'));
    }

    /**
     * @return int[]
     */
    private function isoWeeksForMonth(int $month): array
    {
        $start = Carbon::create($this->year, $month, 1);
        $end = $start->copy()->endOfMonth();
        $weeks = [];
        $day = $start->copy();

        while ($day->lte($end)) {
            $week = (int) $day->format('W');
            if (! in_array($week, $weeks, true)) {
                $weeks[] = $week;
            }
            $day->addDay();
        }

        sort($weeks);

        return $weeks;
    }

    /**
     * Returns [start, end] date strings for the current ISO week.
     *
     * @return array{0: string, 1: string}
     */
    private function weekDateRange(): array
    {
        $week = $this->isoWeek ?? (int) now()->format('W');
        $start = Carbon::now()->setISODate($this->year, $week)->startOfWeek()->toDateString();
        $end = Carbon::now()->setISODate($this->year, $week)->endOfWeek()->toDateString();

        return [$start, $end];
    }
}
