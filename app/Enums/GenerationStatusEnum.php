<?php

namespace App\Enums;

enum GenerationStatusEnum: string
{
    case PENDING = 'pending';
    case GENERATING = 'generating';
    case COMPLETED = 'completed';
    case FAILED = 'failed';
    case CANCELLED = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::PENDING => 'Ausstehend',
            self::GENERATING => 'Wird generiert',
            self::COMPLETED => 'Abgeschlossen',
            self::FAILED => 'Fehlgeschlagen',
            self::CANCELLED => 'Abgebrochen',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::PENDING => 'gray',
            self::GENERATING => 'warning',
            self::COMPLETED => 'success',
            self::FAILED => 'danger',
            self::CANCELLED => 'gray',
        };
    }
}
