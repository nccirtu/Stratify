import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

export interface FormDialogProps {
    buttonText: string;
    dialogTitle?: string;
    dialogDescription?: string;
    children: React.ReactNode;
}

export default function FormDialog({buttonText, dialogTitle, dialogDescription, children}: FormDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">{buttonText}</Button>
            </DialogTrigger>
            <DialogContent className="max-h-10/12 overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{dialogTitle || ''}</DialogTitle>
                    <DialogDescription>
                        {dialogDescription || ''}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}
