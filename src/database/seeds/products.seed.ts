import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

export default class CreateProducts implements Seeder{
    public async run(dataSource: DataSource): Promise<void> {
        const productRepository = dataSource.getRepository(Product)

        const productsData = [
            { name: "Arroz", price: 5000, description: "1 kilogramo de arroz blanco." },
            { name: "Frijoles", price: 6000, description: "1 kilogramo de frijoles rojos." },
            { name: "Aceite", price: 12000, description: "Botella de 1 litro de aceite vegetal." },
            { name: "Azúcar", price: 4000, description: "1 kilogramo de azúcar blanca." },
            { name: "Sal", price: 1500, description: "500 gramos de sal refinada." },
            { name: "Leche", price: 3500, description: "1 litro de leche entera." },
            { name: "Huevos", price: 15000, description: "Docena de huevos frescos." },
            { name: "Pan", price: 3000, description: "Bolsa de pan tajado." },
            { name: "Pasta", price: 4500, description: "500 gramos de pasta de trigo." },
            { name: "Harina de trigo", price: 3000, description: "1 kilogramo de harina de trigo." },
            { name: "Lentejas", price: 5500, description: "1 kilogramo de lentejas." },
            { name: "Café", price: 12000, description: "250 gramos de café molido." },
            { name: "Queso", price: 10000, description: "500 gramos de queso fresco." },
            { name: "Carne de res", price: 25000, description: "1 kilogramo de carne de res." },
            { name: "Pollo", price: 18000, description: "1 kilogramo de pechuga de pollo." },
            { name: "Papas", price: 4000, description: "1 kilogramo de papas." },
            { name: "Cebolla", price: 3000, description: "1 kilogramo de cebolla cabezona." },
            { name: "Tomate", price: 3500, description: "1 kilogramo de tomate rojo." },
            { name: "Plátano", price: 2000, description: "1 kilogramo de plátano." },
            { name: "Banano", price: 2500, description: "1 kilogramo de banano." }
        ];

        for (const product of productsData){
            const roleExist = await productRepository.findOneBy({name:product.name})
            if(!roleExist){
                const newProduct = productRepository.create(product)
                await productRepository.save(newProduct)
            }
        } 
        console.log('Seed Products loaded');
    }
    
}