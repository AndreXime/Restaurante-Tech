import '../../globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import AppBody from '@/store/AppBody';

export const metadata: Metadata = {
    title: 'Restaurante Tech',
    description: 'O restaurante mais tecnologico do mundo',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR">
            <body>
                <AppBody demo>{children}</AppBody>
            </body>
        </html>
    );
}
