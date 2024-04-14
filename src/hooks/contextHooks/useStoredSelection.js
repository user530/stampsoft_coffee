import { useAppContext } from '../context/AppContext';

export const useStoredSelection = () => {
    const { state } = useAppContext();

    if(!state) return null;
    
    const { cart } = state;

    if(!cart) return null;

    const { product } = cart;

    if(!product) return null;

    const { categoryId, productId, sizeId } = product;

    if(
        !categoryId || isNaN(Number(categoryId))
        || !productId || isNaN(Number(productId))
        || !sizeId || isNaN(Number(sizeId))
    ) return null;

    return product;
}