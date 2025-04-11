import type { ReactNode } from 'react';
import '../app/globals.css';

import { SidebarNav } from '../components/layout/sidebar-nav';
import type { Metadata } from 'next';
import { NavProvider } from '@/contexts/NavContext';

export const metadata: Metadata = {
	title: 'Restaurante Tech',
	description: 'O restaurante mais tecnologico do mundo',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="pt-BR">
			<body>
				<NavProvider>
					<div className="flex h-screen bg-gray-100">
						<SidebarNav />
						<div className="flex-1 flex flex-col overflow-hidden">
							<div className="flex-1 flex overflow-hidden">
								<main className="flex-1 overflow-auto">{children}</main>
							</div>
						</div>
					</div>
				</NavProvider>
			</body>
		</html>
	);
}
