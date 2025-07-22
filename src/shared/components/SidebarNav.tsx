'use client';
import {
    Menu,
    TableIcon as TableBar,
    Truck,
    Calculator,
    Settings,
    LogOut,
    ChefHat,
    CookingPot,
    X,
    LucideIcon,
    Plus,
    HelpCircle,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { possibleTabs, useNavStore } from '@/store/navStore';

const navItems: { icon: LucideIcon; label: possibleTabs }[] = [
    { icon: Menu, label: 'Cardápio' },
    { icon: TableBar, label: 'Serviços de Mesa' },
    { icon: ChefHat, label: 'Cozinha' },
    { icon: Plus, label: 'Criar Delivery/Retirada' },
    { icon: Truck, label: 'Entregas' },
    { icon: Calculator, label: 'Contabilidade' },
    { icon: Settings, label: 'Configurações' },
    { icon: HelpCircle, label: 'Como usar?' },
];

export function SidebarNav() {
    const setActiveTab = useNavStore((state) => state.setActiveTab);
    const activeTab = useNavStore((state) => state.activeTab);
    const mobileMenu = useNavStore((state) => state.mobileMenu);
    const toggleMobileMenu = useNavStore((state) => state.toggleMobileMenu);

    return (
        <>
            <div className="hidden lg:block w-65 p-4 border-r h-screen">
                <div className="flex items-center gap-2 mb-8">
                    <CookingPot className="w-8 h-8" />
                    <span className="font-semibold">Restaurante Tech</span>
                </div>
                <nav className="space-y-2">
                    {navItems.map((item, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            onClick={() => {
                                setActiveTab(item.label);
                            }}
                            className={`w-full justify-start hover:bg-green-200 ${
                                activeTab === item.label ? 'bg-green-50 text-green-600' : 'text-gray-600'
                            }`}
                        >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.label}
                        </Button>
                    ))}
                </nav>
            </div>

            {/* Sidebar overlay para telas pequenas */}
            {mobileMenu && (
                <div className="fixed inset-0 z-50 ">
                    <div
                        className="absolute top-0 left-0 w-full h-full bg-white p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between flex-row w-full mb-8">
                            <div className="flex items-center gap-2 ">
                                <CookingPot className="w-8 h-8" />
                                <span className="font-semibold">Restaurante Tech</span>
                            </div>
                            <X className="w-8 h-8" onClick={toggleMobileMenu} />
                        </div>
                        <nav className="space-y-2 flex flex-col h-full">
                            {navItems.map((item, index) => (
                                <Button
                                    key={index}
                                    onClick={() => {
                                        toggleMobileMenu();
                                        setActiveTab(item.label);
                                    }}
                                    variant="ghost"
                                    className={`w-full justify-start hover:bg-green-200 ${
                                        activeTab === item.label ? 'bg-green-50 text-green-600' : 'text-gray-600'
                                    }`}
                                >
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.label}
                                </Button>
                            ))}
                            <Button
                                variant="ghost"
                                className="w-full justify-start mt-auto text-gray-600 hover:bg-green-200"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Sair
                            </Button>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
