'use client';
import { FoodCard } from './food-card';
import { useState } from 'react';
import { useDataStore } from '@/store/userStore';
import { useNavStore } from '@/store/navStore';

export function MenuGrid() {
    const [ActiveCategory, setActiveCategory] = useState('Todos');
    const searchItem = useNavStore((state) => state.searchItem);
    const Cardapio = useDataStore((state) => state.cardapio);

    // Primeiro filtra pela categoria e depois pelo input insensitive
    const activeItems = (
        ActiveCategory != 'Todos'
            ? Cardapio.pratos.filter((item) => item.category.includes(ActiveCategory))
            : Cardapio.pratos
    ).filter((item) => item.title.toLowerCase().includes(searchItem.toLowerCase()));

    return (
        <>
            <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                {Cardapio.categorias.map((category, index) => (
                    <div
                        onClick={() => setActiveCategory(category.label)}
                        key={index}
                        className={`flex flex-col items-center p-3 rounded-xl min-w-[100px] ${
                            category.label == ActiveCategory ? 'bg-green-50 text-green-600' : 'bg-white'
                        } border cursor-pointer hover:bg-green-50`}
                    >
                        <category.icon className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">{category.label}</span>
                        <span className="text-xs text-gray-500">{category.items}</span>
                    </div>
                ))}
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {activeItems.length == 0 && (
                        <h2 className="font-bold text-2xl text-center p-10 w-full col-span-full">
                            {ActiveCategory == 'Todos'
                                ? 'Você ainda não cadastrou nenhum prato, vá para aba de configuração cadastrar'
                                : 'Não foi encontrado nenhum prato com o filtro atual'}
                        </h2>
                    )}
                    {activeItems.map((item, index) => (
                        <FoodCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </>
    );
}
