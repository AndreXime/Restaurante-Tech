'use client';

import { useDataStore } from '@/store/userStore';
import { SidebarNav } from '@/shared/components/SidebarNav';
import { useEffect, useRef } from 'react';
import { LoadingSpinner } from '@/shared/ui';

interface AppBodyProps {
    children: React.ReactNode;
    demo?: boolean;
}

export default function AppBody({ children, demo = false }: AppBodyProps) {
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            useDataStore.getState().loadInitialData(demo);
            initialized.current = true;
        }
    }, [demo]);

    const isLoading = useDataStore((state) => state.loading);

    if (isLoading) {
        return (
            <div className="flex h-screen bg-gray-100">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <SidebarNav />
            {children}
        </div>
    );
}
