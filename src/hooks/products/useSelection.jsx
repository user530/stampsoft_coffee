import React from 'react';

export const useSelection = (initialCategory) => {
    const [selectedCategory, setSelectedCategory] = React.useState(initialCategory || '');    
    const [categoryProducts, setCategoryProducts] = React.useState(selectedCategory.products || []);
    
    return {
        selectedCategory,
        setSelectedCategory,
        categoryProducts,
        setCategoryProducts
    }
}