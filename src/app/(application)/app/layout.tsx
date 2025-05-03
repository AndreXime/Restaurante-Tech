import '../../globals.css';
import { SidebarNav } from '@/components';
import { NavProvider } from '@/contexts/NavContext';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { DataProvider } from '@/contexts/DataContext';

export const metadata: Metadata = {
	title: 'Restaurante Tech',
	description: 'O restaurante mais tecnologico do mundo',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="pt-BR">
			<body>
				<NavProvider>
					<DataProvider>
						<div className="flex h-screen bg-gray-100">
							<SidebarNav />
							{children}
						</div>
					</DataProvider>
				</NavProvider>
			</body>
		</html>
	);
}
