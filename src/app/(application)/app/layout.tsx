import '../../globals.css';
import type { Metadata } from 'next';
import AppBody from '@/store/AppBody';

export const metadata: Metadata = {
    title: 'Restaurante Tech',
    description: 'O restaurante mais tecnologico do mundo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <body>
                <AppBody>{children}</AppBody>
            </body>
        </html>
    );
}
