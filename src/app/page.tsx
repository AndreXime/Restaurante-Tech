import { Utensils } from 'lucide-react';
import Link from 'next/link';

export default async function ClientApp() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <main className="container mx-auto px-4 py-16 max-w-5xl">
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-4">
                        <Utensils className="h-12 w-12 text-orange-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Restaurante Tech</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Selecione uma versão para usar</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Demo Card */}
                    <Link
                        href="demo"
                        className="relative h-75 rounded-xl shadow-lg transition-all duration-300 overflow-hidden group hover:scale-105"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 p-6 flex flex-col justify-between">
                            <div className="text-left">
                                <h2 className="text-3xl font-bold text-white mb-2">Demonstração</h2>
                                <p className="text-white/90">
                                    Experimente a plataforma com dados ficticios e veja todas as funcionalidades
                                </p>
                            </div>
                            <div className="bg-white/20 p-4 rounded-lg text-white text-left mt-3">
                                <p className="font-medium">Inclui:</p>
                                <ul className="mt-2 space-y-1">
                                    <li>• Dados prontos para visualizar o dashboard</li>
                                    <li>• Alterações não são salvas</li>
                                </ul>
                            </div>
                        </div>
                    </Link>

                    {/* Normal Card */}
                    <Link
                        href="app"
                        className="relative h-75 rounded-xl shadow-lg transition-all duration-300 overflow-hidden group hover:scale-105"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 p-6 flex flex-col justify-between">
                            <div className="text-left">
                                <h2 className="text-3xl font-bold text-white mb-2">Aplicação real</h2>
                                <p className="text-white/90">
                                    Começe com um dashboard limpo para contruir com a cara do seu restaurante
                                </p>
                            </div>
                            <div className="bg-white/20 p-4 rounded-lg text-white text-left mt-3">
                                <p className="font-medium">Inclui:</p>
                                <ul className="mt-2 space-y-1">
                                    <li>• Customize com os dados do seu restaurante</li>
                                    <li>• Salve todos os dados locamente</li>
                                </ul>
                            </div>
                        </div>
                    </Link>
                </div>
            </main>

            <footer className="py-6 text-center text-gray-500">
                <p>© 2025 Restaurante Tech. Todos direitos reservados.</p>
            </footer>
        </div>
    );
}
