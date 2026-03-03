import { Head, Link, usePage } from '@inertiajs/react';

import HeroSection from '@/components/landingpage/hero-section';
import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import {  Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
    { label: 'Features', href: '#features' },
    { label: 'So funktioniert\'s', href: '#how-it-works' },
    { label: 'Preise', href: '#pricing' },
];

function Navbar({ canRegister }: { canRegister: boolean }) {
    const { auth } = usePage<SharedData>().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-lg"
                >
                    <span>Stratify</span>
                </Link>

                {/* Desktop landing nav */}
                <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="transition-colors hover:text-foreground"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop auth */}
                <div className="hidden items-center gap-3 md:flex">
                    {auth.user ? (
                        <Link href={dashboard()}>
                            <Button size="sm">Dashboard →</Button>
                        </Link>
                    ) : (
                        <>
                            <Link href={login()}>
                                <Button size="sm" variant="ghost">
                                    Anmelden
                                </Button>
                            </Link>
                            {canRegister && (
                                <Link href={register()}>
                                    <Button size="sm">Registrieren</Button>
                                </Link>
                            )}
                        </>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Menü öffnen"
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="border-t border-border/40 bg-background px-6 pb-4 md:hidden">
                    <nav className="flex flex-col gap-3 pt-3 text-sm">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-muted-foreground transition-colors hover:text-foreground"
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="mt-2 flex flex-col gap-2 border-t border-border/40 pt-3">
                            {auth.user ? (
                                <Link href={dashboard()}>
                                    <Button className="w-full" size="sm">
                                        Dashboard →
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={login()}>
                                        <Button
                                            className="w-full"
                                            size="sm"
                                            variant="outline"
                                        >
                                            Anmelden
                                        </Button>
                                    </Link>
                                    {canRegister && (
                                        <Link href={register()}>
                                            <Button
                                                className="w-full"
                                                size="sm"
                                            >
                                                Registrieren
                                            </Button>
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <>
            <Head title="Stratify – Weil jede Idee einen starken Plan braucht">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-background text-foreground">
                <Navbar canRegister={canRegister} />

                <main className="overflow-hidden pt-14">
                    <HeroSection canRegister={canRegister} />
                </main>
            </div>
        </>
    );
}
