'use client';

import { useDataStore } from '@/store/userStore';
import { SidebarNav } from '@/components';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ReactNode, useEffect, useRef } from 'react';

interface AppBodyProps {
    children: ReactNode;
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

    return (
        <div className="flex h-screen bg-gray-100">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <SidebarNav />
                    {children}
                </>
            )}
        </div>
    );
}
