import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/shared/ui';
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { useDataStore } from '@/store/userStore';
import { removeCategoria, removeProduto } from './settingsActions';
import { useState } from 'react';
import { encontrarMenorIdDisponivel } from '@/shared/lib/utils';
import { showMessage } from '@/store/popupStore';
import { availableIcons } from '@/shared/lib/availableIcons';

export function MenuSettings() {
    const pratos = useDataStore((state) => state.cardapio.pratos);
    const categorias = useDataStore((state) => state.cardapio.categorias);
    const setCardapio = useDataStore((state) => state.setCardapio);

    console.log(pratos);
    const [dialogPrato, setDialogPrato] = useState(false);
    const [dialogCategoria, setDialogCategoria] = useState(false);

    const [tempPrato, setTempPrato] = useState<
        Omit<CardapioFoodType, 'imageBlob' | 'imageURL' | 'id'> & { imageFile?: File }
    >({
        imageFile: undefined,
        title: '',
        price: 0,
        discount: undefined,
        category: [],
        status: 'Ativo',
    });
    const [tempCategorias, setTempCategorias] = useState<Omit<CategoriesType, 'id' | 'qtdItems'>>({
        icon: '',
        label: '',
    });

    function addPrato() {
        if (!tempPrato.imageFile) return;
        const imageBlob = new Blob([tempPrato.imageFile], { type: tempPrato.imageFile.type });
        setCardapio((prev) => ({
            ...prev,
            pratos: [
                ...prev.pratos,
                {
                    id: encontrarMenorIdDisponivel(prev.pratos),
                    imageBlob: imageBlob,
                    imageURL: URL.createObjectURL(imageBlob),
                    title: tempPrato.title,
                    price: tempPrato.price,
                    discount: tempPrato.discount,
                    category: tempPrato.category,
                    status: tempPrato.status,
                },
            ],
        }));
        setDialogCategoria(false);
        showMessage('Produto adicionado com sucesso');
        setTempPrato({
            imageFile: undefined,
            title: '',
            price: 0,
            discount: undefined,
            category: [],
            status: 'Ativo',
        });
    }

    function addCategorias() {
        setCardapio((prev) => ({
            ...prev,
            categorias: [
                ...prev.categorias,
                { id: encontrarMenorIdDisponivel(prev.categorias), qtdItems: 0, ...tempCategorias },
            ],
        }));
        setDialogCategoria(false);
        showMessage('Categoria adicionada com sucesso');
        setTempCategorias({
            icon: '',
            label: '',
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Gerenciamento de Cardápio</h2>
            </div>

            <Tabs defaultValue="items">
                <div className="flex justify-between">
                    <TabsList>
                        <TabsTrigger value="items">Itens</TabsTrigger>
                        <TabsTrigger value="categories">Categorias</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="items">
                    <div className="flex justify-end mb-4">
                        <Button
                            className="bg-green-600 hover:bg-green-700 cursor-pointer"
                            onClick={() => setDialogPrato(true)}
                        >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Novo produto
                        </Button>
                    </div>
                    <div className="border rounded-md overflow-scroll">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left p-3">Imagem</th>
                                    <th className="text-left p-3">Nome</th>
                                    <th className="text-left p-3">Categoria</th>
                                    <th className="text-left p-3">Preço</th>
                                    <th className="text-left p-3">Status</th>
                                    <th className="text-right p-3">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pratos.map((item) => (
                                    <tr key={item.id} className="border-t">
                                        <td className="p-3">
                                            <img
                                                src={item.imageURL}
                                                alt={item.title}
                                                width={500}
                                                height={500}
                                                className="w-40 h-30"
                                            />
                                        </td>

                                        <td className="p-3">{item.title}</td>
                                        <td className="p-3">{item.category.join(', ')}</td>
                                        <td className="p-3">R${item.price.toFixed(2)}</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded-full ${
                                                    item.status === 'Ativo'
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-red-100 text-red-600'
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <div className="inline-flex flex-row items-center justify-end w-full gap-3">
                                                <Edit size={25} className="cursor-pointer" />
                                                <Trash
                                                    size={25}
                                                    className="text-red-500 cursor-pointer"
                                                    onClick={() => removeProduto(item.id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>

                <TabsContent value="categories">
                    <div className="flex justify-end mb-4">
                        <Button
                            className="bg-green-600 hover:bg-green-700 cursor-pointer"
                            onClick={() => setDialogCategoria(true)}
                        >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Nova Categoria
                        </Button>
                    </div>

                    <div className="border rounded-md">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left p-3">Icone</th>
                                    <th className="text-left p-3">Nome</th>
                                    <th className="text-left p-3">Itens</th>
                                    <th className="text-right p-3">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map((category) => (
                                    <tr key={category.id} className="border-t">
                                        <td className="p-3">
                                            <img src={category.icon} alt={category.label} className="h-6 w-6" />
                                        </td>
                                        <td className="p-3">{category.label}</td>
                                        <td className="p-3">{category.qtdItems} Itens</td>
                                        <td className="p-3 inline-flex flex-row items-end justify-end w-full gap-3">
                                            <Edit size={25} className="cursor-pointer" />
                                            <Trash
                                                size={25}
                                                className="text-red-500 cursor-pointer"
                                                onClick={() => removeCategoria(category.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>
            </Tabs>

            <Dialog open={dialogCategoria} onOpenChange={setDialogCategoria}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adicione uma categoria</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 pt-5">
                        <div className="flex justify-start items-start flex-col">
                            <div className="gap-4 grid w-full">
                                <div className="space-y-2 col-span-full md:col-span-1">
                                    <Label>Nome da categoria</Label>
                                    <Input
                                        onChange={(e) =>
                                            setTempCategorias((prev) => ({ ...prev, label: e.target.value }))
                                        }
                                    />
                                </div>
                                <div className="space-y-2 col-span-full md:col-span-1">
                                    <Label>Icone</Label>
                                    <Select
                                        onValueChange={(val) => setTempCategorias((prev) => ({ ...prev, icon: val }))}
                                    >
                                        <SelectTrigger id="currency" className="w-full">
                                            <SelectValue placeholder="Selecione um icone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableIcons.map((icon) => (
                                                <SelectItem key={icon} value={icon}>
                                                    <img src={icon} alt="" />
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full bg-green-600 hover:bg-green-700 text-white h-12 font-bold"
                            onClick={addCategorias}
                        >
                            Adicionar agora
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={dialogPrato} onOpenChange={setDialogPrato}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adicione um produto novo</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 pt-5">
                        <div className="flex justify-start items-start flex-col">
                            <div className="gap-4 grid w-full">
                                <div className="space-y-2 col-span-full md:col-span-1">
                                    <Label>Nome do produto</Label>
                                    <Input
                                        onChange={(e) => setTempPrato((prev) => ({ ...prev, title: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2 col-span-full md:col-span-1">
                                    <Label>Imagem do produto</Label>
                                    <Input
                                        type="file"
                                        onChange={(e) =>
                                            setTempPrato((prev) => ({ ...prev, imageFile: e.target.files?.[0] }))
                                        }
                                    />
                                </div>
                                <div className="space-y-2 col-span-full md:col-span-1">
                                    <Label>Preço do produto</Label>
                                    <Input
                                        type="number"
                                        onChange={(e) =>
                                            setTempPrato((prev) => ({ ...prev, price: Number(e.target.value) }))
                                        }
                                    />
                                </div>
                                <div className="space-y-2 col-span-full md:col-span-1">
                                    <Label>Desconto(Opcional)</Label>
                                    <Input
                                        type="number"
                                        onChange={(e) =>
                                            setTempPrato((prev) => ({ ...prev, discount: Number(e.target.value) }))
                                        }
                                    />
                                </div>
                                <div className="space-y-2 col-span-full md:col-span-1">
                                    <Label>Selecione categorias</Label>
                                    <Select
                                        onValueChange={(val) => setTempPrato((prev) => ({ ...prev, category: [val] }))}
                                    >
                                        <SelectTrigger id="currency" className="w-full">
                                            <SelectValue placeholder="Selecione um icone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categorias.map((cat) => (
                                                <SelectItem key={cat.label} value={cat.label}>
                                                    {cat.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full bg-green-600 hover:bg-green-700 text-white h-12 font-bold"
                            onClick={addPrato}
                        >
                            Adicionar agora
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
