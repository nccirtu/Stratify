import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import { BusinessPlanExpandableCard } from '@/components/dashboard/businessplan/expandable-card';
import { Card, CardContent } from '@/components/ui/card';
import { App } from '@/wayfinder/types';

export default function BusinessplanGridView({
    businessplans,
}: {
    businessplans: App.Models.BusinessPlan[];
}) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Link href="/businessplans/create" className="block h-full">
                <Card className="border-primary bg-muted/50 flex h-full cursor-pointer flex-col items-center justify-center border-2 border-dashed  transition-colors hover:border-primary hover:bg-white dark:border-gray-700">
                    <CardContent className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Plus className="h-8 w-8" />
                        <span className="text-sm font-medium">
                            Neuen Businessplan erstellen
                        </span>
                    </CardContent>
                </Card>
            </Link>

            {businessplans.map((businessplan) => (
                <BusinessPlanExpandableCard
                    key={businessplan.id}
                    businessplan={businessplan}
                />
            ))}
        </div>
    );
}
