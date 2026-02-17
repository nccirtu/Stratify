import FormDialog from '@/components/common/formDialog';
import BusinessPlanCard from '@/components/custom-components/businessplan/businessplanCard';
import QuickCreateBusinessplanForm from '@/components/forms/businessplan/quickCreateBusinessplan';
import { Card, CardContent } from '@/components/ui/card';
import { App } from '@/wayfinder/types';
export default function BusinessplanGridView({
    businessplans,
}: {
    businessplans: App.Models.BusinessPlan[];
}) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card
                className={
                    'flex h-48 items-center justify-center border-dashed dark:border-gray-700'
                }
            >
                <CardContent>
                    <FormDialog
                        buttonText={'Neuen Businessplan erstellen'}
                        children={<QuickCreateBusinessplanForm />}
                    />
                </CardContent>
            </Card>

            {businessplans.map((businessplan) => (
                <BusinessPlanCard
                    key={businessplan.id}
                    businessplan={businessplan}
                />
            ))}
        </div>
    );
}
