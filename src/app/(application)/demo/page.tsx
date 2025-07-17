import type { Metadata } from 'next';
import AppBody from '@/store/AppBody';
import MenuPage from '@/components/pages';

export const metadata: Metadata = {
    title: 'Restaurante Tech',
    description: 'O restaurante mais tecnologico do mundo',
};

export default function RootPageDemo() {
    return (
        <AppBody demo>
            <MenuPage />
        </AppBody>
    );
}
