import { Link } from "@inertiajs/react";
import { PlusCircle, FileText } from "lucide-react";

import BusinessPlanController from '@/actions/App/Http/Controllers/BusinessPlanController';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';


export default function EmptyBusinessplanList() {
    return (
        <div className={'absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/10 backdrop-blur-[2px]'}>
            <Card>
                <CardContent className={'flex flex-col items-center justify-center gap-1 p-8'}>
                    <FileText className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Keine Businesspläne gefunden</h3>
                    <p className="mb-4 mt-2 text-sm text-muted-foreground">
                        Du hast noch keinen Businessplan erstellt. Fang heute damit an und setze deine Vision um.
                    </p>

                    <Button asChild>
                        <Link href={ BusinessPlanController.create()}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Erstelle jetzt deinen ersten Plan
                        </Link>
                    </Button>

                </CardContent>
            </Card>
        </div>

    );
}
