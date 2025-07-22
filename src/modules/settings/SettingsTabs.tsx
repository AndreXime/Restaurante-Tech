import { Tabs, TabsContent, TabsList, TabsTrigger, Card, CardContent } from '@/shared/ui';
import { GeneralSettings } from './SettingsGeneral';
import { UserSettings } from './SettingsFuncionarios';
import { MenuSettings } from './SettingsMenu';
import { EstastisticaSettings } from './SettingsStatistics';

export function SettingsTabs() {
    return (
        <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-4 gap-3">
                <TabsTrigger value="general">Geral</TabsTrigger>
                <TabsTrigger value="users">Funcionarios</TabsTrigger>
                <TabsTrigger value="menu">Cardápio</TabsTrigger>
                <TabsTrigger value="estastistica">Estastistica</TabsTrigger>
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

            <TabsContent value="estastistica">
                <Card>
                    <CardContent className="p-4">
                        <EstastisticaSettings />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
