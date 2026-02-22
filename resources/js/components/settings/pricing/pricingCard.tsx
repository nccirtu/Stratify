'use client';

import{
    Add01Icon,
    MinusSignIcon,
    Tick02Icon,
    UserStoryIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import NumberFlow from '@number-flow/react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

// Change Here
const plans = [
    {
        id: 'plus',
        name: 'Plus',
        description: 'solo',
        monthlyPrice: 8.99,
        yearlyPrice: 6.99,
        features: [
            '1TB of Space',
            '30 days of file recovery',
            '256-bit AES and SSL/TLS',
        ],
    },
    {
        id: 'standard',
        name: 'Standard',
        description: 'startup',
        monthlyPrice: 12.99,
        yearlyPrice: 9.99,
        features: [
            '1TB of Space',
            '30 days of file recovery',
            '256-bit AES and SSL/TLS',
        ],
    },
    {
        id: 'advanced',
        name: 'Advanced',
        description: 'teams',
        monthlyPrice: 24.99,
        yearlyPrice: 19.99,
        features: [
            '1TB of Space',
            '30 days of file recovery',
            '256-bit AES and SSL/TLS',
        ],
    },
];

const TRANSITION = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
    mass: 0.8,
};

function PricingCard() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
        'monthly',
    );
    const [selectedPlan, setSelectedPlan] = useState('standard');
    const [userCount, setUserCount] = useState(3);

    return (
        <div className="not-prose flex w-full max-w-[450px] flex-col gap-6 rounded-4xl border border-border bg-background p-5 px-4 shadow-sm transition-colors duration-300 sm:rounded-2xl sm:p-6">
            <div className="mb-2 flex flex-col gap-4">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Select a Plan
                </h1>

                <div className="flex h-10 w-full rounded-xl bg-muted p-1 ring-1 ring-border">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`relative h-full flex-1 rounded-lg text-base font-medium transition-colors duration-300 ${
                            billingCycle === 'monthly'
                                ? 'text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        {billingCycle === 'monthly' && (
                            <motion.div
                                layoutId="tab-bg"
                                className="absolute inset-0 rounded-lg bg-background shadow-sm ring-1 ring-border"
                                transition={TRANSITION}
                            />
                        )}
                        <span className="relative z-10">Monthly</span>
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`relative flex h-full flex-1 items-center justify-center gap-2 rounded-lg text-base font-medium transition-colors duration-300 ${
                            billingCycle === 'yearly'
                                ? 'text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        {billingCycle === 'yearly' && (
                            <motion.div
                                layoutId="tab-bg"
                                className="absolute inset-0 rounded-lg bg-background shadow-sm ring-1 ring-border"
                                transition={TRANSITION}
                            />
                        )}
                        <span className="relative z-10">Yearly</span>
                        <span className="relative z-10 rounded-full bg-primary px-1.5 py-0.5 text-xs font-black font-light tracking-tight whitespace-nowrap text-primary-foreground uppercase">
                            20% OFF
                        </span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {plans.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    const price =
                        billingCycle === 'monthly'
                            ? plan.monthlyPrice
                            : plan.yearlyPrice;

                    return (
                        <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id)}
                            className="relative cursor-pointer"
                        >
                            <div
                                className={`relative rounded-xl border border-foreground/10 bg-card transition-colors duration-300 ${
                                    isSelected
                                        ? 'z-10 border-2 border-primary'
                                        : ''
                                }`}
                            >
                                <div className="p-5">
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-4">
                                            <div className="mt-1 shrink-0">
                                                <div
                                                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                                        isSelected
                                                            ? 'border-primary'
                                                            : 'border-muted-foreground/15'
                                                    }`}
                                                >
                                                    <AnimatePresence
                                                        mode="wait"
                                                        initial={false}
                                                    >
                                                        {isSelected && (
                                                            <motion.div
                                                                initial={{
                                                                    scale: 0,
                                                                }}
                                                                animate={{
                                                                    scale: 1,
                                                                }}
                                                                exit={{
                                                                    scale: 0,
                                                                }}
                                                                className="h-4 w-4 rounded-full bg-primary"
                                                                transition={{
                                                                    type: 'spring',
                                                                    stiffness: 300,
                                                                    damping: 25,
                                                                    duration: 0.2,
                                                                }}
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg leading-tight font-medium text-foreground">
                                                    {plan.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground lowercase">
                                                    {plan.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-medium text-foreground">
                                                <NumberFlow
                                                    value={price}
                                                    format={{
                                                        style: 'currency',
                                                        currency: 'USD',
                                                    }}
                                                />
                                            </div>
                                            <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground/60">
                                                {billingCycle === 'monthly'
                                                    ? 'Month'
                                                    : 'Year'}
                                            </div>
                                        </div>
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {isSelected && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: 'auto',
                                                    opacity: 1,
                                                }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{
                                                    duration: 0.4,
                                                    ease: [0.32, 0.72, 0, 1],
                                                }}
                                                className="w-full overflow-hidden"
                                            >
                                                <div className="flex flex-col gap-6 pt-6">
                                                    <div className="flex flex-col gap-3.5">
                                                        {plan.features.map(
                                                            (feature, idx) => (
                                                                <motion.div
                                                                    initial={{
                                                                        opacity: 0,
                                                                        y: 5,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        y: 0,
                                                                    }}
                                                                    transition={{
                                                                        delay:
                                                                            idx *
                                                                            0.05,
                                                                        duration: 0.3,
                                                                    }}
                                                                    key={idx}
                                                                    className="flex items-center gap-3 text-sm text-foreground/80"
                                                                >
                                                                    <HugeiconsIcon
                                                                        icon={
                                                                            Tick02Icon
                                                                        }
                                                                        size={
                                                                            16
                                                                        }
                                                                        className="text-primary"
                                                                    />
                                                                    {feature}
                                                                </motion.div>
                                                            ),
                                                        )}
                                                    </div>

                                                    <div className="h-px bg-muted" />

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted">
                                                                <HugeiconsIcon
                                                                    icon={
                                                                        UserStoryIcon
                                                                    }
                                                                    size={30}
                                                                    className="text-muted-foreground"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-base leading-none font-medium text-foreground">
                                                                    Users
                                                                </span>
                                                                <span className="mt-0.5 text-sm text-muted-foreground">
                                                                    Starting at{' '}
                                                                    {userCount}{' '}
                                                                    users
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-4 rounded-xl border border-border bg-muted p-1.5">
                                                            <button
                                                                onClick={(
                                                                    e,
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    setUserCount(
                                                                        Math.max(
                                                                            1,
                                                                            userCount -
                                                                                1,
                                                                        ),
                                                                    );
                                                                }}
                                                                className="rounded-lg p-1.5 text-muted-foreground/60 transition-all hover:bg-background hover:text-foreground hover:shadow-sm active:scale-95"
                                                            >
                                                                <HugeiconsIcon
                                                                    icon={
                                                                        MinusSignIcon
                                                                    }
                                                                    size={14}
                                                                />
                                                            </button>
                                                            <span className="w-4 text-center text-sm text-foreground/80 tabular-nums">
                                                                <NumberFlow
                                                                    value={
                                                                        userCount
                                                                    }
                                                                />
                                                            </span>
                                                            <button
                                                                onClick={(
                                                                    e,
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    setUserCount(
                                                                        userCount +
                                                                            1,
                                                                    );
                                                                }}
                                                                className="rounded-lg p-1.5 text-muted-foreground/60 transition-all hover:bg-background hover:text-foreground hover:shadow-sm active:scale-95"
                                                            >
                                                                <HugeiconsIcon
                                                                    icon={
                                                                        Add01Icon
                                                                    }
                                                                    size={16}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PricingCard;
