'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { GeneralSettings } from './general-settings';
import { UserSettings } from './user-settings';
import { MenuSettings } from './menu-settings';

export function SettingsTabs() {
	return (
		<Tabs defaultValue="general">
			<TabsList className="mb-4">
				<TabsTrigger value="general">Geral</TabsTrigger>
				<TabsTrigger value="users">Usuários</TabsTrigger>
				<TabsTrigger value="menu">Cardápio</TabsTrigger>
			</TabsList>

			<TabsContent value="general">
				<Card>
					<CardContent className="p-4">
						<GeneralSettings />
					</CardContent>
				</Card>
			</TabsContent>

			<TabsContent value="users">
				<Card>
					<CardContent className="p-4">
						<UserSettings />
					</CardContent>
				</Card>
			</TabsContent>

			<TabsContent value="menu">
				<Card>
					<CardContent className="p-4">
						<MenuSettings />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
