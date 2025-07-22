import type { Metadata } from 'next';
import AppRoot from '@/shared/components/AppRoot';
import AppRouter from '@/shared/components/AppRouter';

export const metadata: Metadata = {
    title: 'Restaurante Tech',
    description: 'O restaurante mais tecnologico do mundo',
};

export default function RootPage() {
    return (
        <AppRoot>
            <AppRouter />
        </AppRoot>
    );
}
