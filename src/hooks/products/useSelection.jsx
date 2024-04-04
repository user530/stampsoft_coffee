import React from 'react';

export const useSelection = (initialCategory) => {
    const [selectedCategory, setSelectedCategory] = React.useState(initialCategory || '');    
    const [categoryProducts, setCategoryProducts] = React.useState(selectedCategory.products || []);

    React.useEffect(
        () => {
            setCategoryProducts(selectedCategory.products)
        },
        [selectedCategory]
    )
    
    return {
        selectedCategory,
        setSelectedCategory,
        categoryProducts,
    }
}