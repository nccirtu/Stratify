import CreateBusinessPlanStepOne from '@/components/businessplan/form/CreateBusinessPlanStepOne';
import FormDialog from '@/components/common/formDialog';
import BusinessPlanCard from '@/components/dashboard/businessplan/businessplanCard';
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
                        children={<CreateBusinessPlanStepOne />}
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
