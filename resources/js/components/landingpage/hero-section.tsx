import { Link, usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import {
    renderCanvas,
    ShineBorder,
    TypeWriter,
} from '@/components/landingpage/components/hero-designali';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';

const planningTopics = [
    'Businessplan',
    'Finanzplanung',
    'Marktanalyse',
    'Liquiditätsplan',
    'KI-Generierung',
    'Wettbewerbsanalyse',
];

export default function HeroSection({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        renderCanvas();
    }, []);

    return (
        <section id="home" className="relative">
            {/* Subtle grid background */}
            <div className="absolute inset-0 top-[400px] -z-10 h-[400px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-[size:3rem_3rem] opacity-20 max-md:hidden dark:bg-[linear-gradient(to_right,#a8a29e_1px,transparent_1px),linear-gradient(to_bottom,#a8a29e_1px,transparent_1px)]" />

            <div className="flex flex-col items-center justify-center px-6 text-center">
                {/* Badge */}
                <div className="mt-10 mb-6 sm:justify-center md:mt-40 md:mb-4">
                    <div className="relative flex items-center rounded-full border bg-popover px-3 py-1 text-xs text-primary/60">
                        Neu: KI-gestützte Businessplan-Generierung
                        <a
                            href="#how-it-works"
                            className="ml-1 flex items-center font-semibold hover:text-primary"
                        >
                            Mehr erfahren →
                        </a>
                    </div>
                </div>

                {/* Headline card */}
                <div className="mx-auto max-w-5xl">
                    <div className="relative mx-auto h-full border bg-background [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)] p-6 py-12">
                        <Plus
                            strokeWidth={4}
                            className="absolute -top-5 -left-5 h-10 w-10 text-primary/40"
                        />
                        <Plus
                            strokeWidth={4}
                            className="absolute -bottom-5 -left-5 h-10 w-10 text-primary/40"
                        />
                        <Plus
                            strokeWidth={4}
                            className="absolute -top-5 -right-5 h-10 w-10 text-primary/40"
                        />
                        <Plus
                            strokeWidth={4}
                            className="absolute -right-5 -bottom-5 h-10 w-10 text-primary/40"
                        />

                        <h2 className="flex flex-col items-center text-center text-3xl font-semibold leading-none tracking-tight md:text-7xl">
                            <span className="text-primary">Stratify.</span>
                            <span className="mt-2 text-foreground">
                                Weil jede Idee einen
                            </span>
                            <span className="text-primary">
                                starken Plan braucht.
                            </span>
                        </h2>

                        <div className="mt-4 flex items-center justify-center gap-1">
                            <span className="relative flex h-3 w-3 items-center justify-center">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                            </span>
                            <p className="text-xs text-green-500">
                                Jetzt verfügbar
                            </p>
                        </div>
                    </div>

                    {/* Subheadline */}
                    <p className="mt-8 text-xl text-foreground/80 md:text-2xl">
                        Erstelle deinen Businessplan einfach und professionell –
                    </p>
                    <p className="py-2 text-primary/60">
                        mit KI-Unterstützung für{' '}
                        <span className="font-semibold text-primary">
                            <TypeWriter strings={planningTopics} />
                        </span>
                        .
                    </p>

                    {/* CTA buttons */}
                    <div className="mt-6 flex items-center justify-center gap-3">
                        {auth.user ? (
                            <Link href={dashboard()}>
                                <ShineBorder
                                    borderWidth={3}
                                    className="h-auto w-auto cursor-pointer border bg-white/5 p-2 backdrop-blur-md dark:bg-black/5"
                                    color={['#6366f1', '#8b5cf6', '#a78bfa']}
                                >
                                    <Button className="w-full rounded-xl">
                                        Zum Dashboard →
                                    </Button>
                                </ShineBorder>
                            </Link>
                        ) : (
                            <>
                                {canRegister && (
                                    <Link href={register()}>
                                        <ShineBorder
                                            borderWidth={3}
                                            className="h-auto w-auto cursor-pointer border bg-white/5 p-2 backdrop-blur-md dark:bg-black/5"
                                            color={[
                                                '#6366f1',
                                                '#8b5cf6',
                                                '#a78bfa',
                                            ]}
                                        >
                                            <Button className="w-full rounded-xl">
                                                Jetzt kostenlos starten
                                            </Button>
                                        </ShineBorder>
                                    </Link>
                                )}
                                <Link href={login()}>
                                    <Button
                                        className="rounded-xl"
                                        variant="outline"
                                    >
                                        Anmelden
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Canvas particle animation */}
            <canvas
                className="pointer-events-none absolute inset-0 mx-auto"
                id="canvas"
            />
        </section>
    );
}
