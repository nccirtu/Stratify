import BusinessPlanCard from '@/components/custom-components/businessplan/businessplanCard';
import { App } from '@/wayfinder/types';
export default function BusinessplanGridView({ businessplans}: {businessplans: App.Models.BusinessPlan[]}) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {businessplans.map((businessplan) => (
                <BusinessPlanCard key={businessplan.id} businessplan={businessplan} />
            ))}
        </div>
    );
}
