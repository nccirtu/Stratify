import { Badge } from '@/components/ui/badge';
import {
    Card, CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { App } from '@/wayfinder/types';


export default function BusinessPlanCard({ businessplan }: { businessplan: App.Models.BusinessPlan }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{businessplan.name}</CardTitle>
                <CardDescription>{businessplan.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Badge variant={
                    businessplan.status === 'draft' ? 'default' :
                    businessplan.status === 'in_progress' ? 'secondary' :
                    businessplan.status === 'completed' ? 'outline' : 'default'
                }>
                    {businessplan.status}
                </Badge>
            </CardContent>
        </Card>
    );
}
