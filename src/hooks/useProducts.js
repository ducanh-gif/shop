import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from "../firebase/productService";
import { icons } from 'lucide-react';

let cachedProducts = null;
let cachedCategories = null;

const useProducts = () => {
    const [products, setProducts] = useState(cachedProducts || []);
    const [categories, setCategories] = useState(cachedCategories || [
        { id: 'all', name: 'Tat ca' , icon:'Grid'}
    ]);
    const [loading, setLoading] = useState(!cachedProducts);
    const [error, setError] = useState(null);


    const loadData = async (forceRefresh = false) => {
        if (cachedProducts && !forceRefresh) {
            setProducts(cachedProducts);
            setCategories(cachedCategories);
            setLoading(false);
            return;
        }


        setLoading(true);
        setError(null);

        try {
            const [productsData, categoriesData] = await Promise.all([
                fetchProducts(),
                fetchCategories()
            ]);

            const allCategory = [
                { id: 'all', name: 'Tat ca', icon: 'Grid' },
                ...categoriesData,];

            setProducts(productsData);
            setCategories(allCategory);
            cachedProducts = productsData;
            cachedCategories = allCategory;
        } catch (err) {
            console.error("Error loading products or categories:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

useEffect(() => {
    loadData();
}, []);

const refresh = () => loadData(true);
const getProductById = (id) => {
    return products.find(product => product.id === id);
}

return { products, categories, loading, error, refresh, getProductById };
};
export default useProducts;
