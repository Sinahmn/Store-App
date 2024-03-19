const shortenText = text => {
    return text.split(" ").slice(0, 3).join(" ");
};


const createQueryObject = (currentQuery, newQuery) => {
    if (newQuery.category === "all") {
        const { category, ...rest } = currentQuery;
        return rest;
    }
    if (newQuery.search === "") {
        const { search, ...rest } = currentQuery;
        return rest;
    }
    return {
        ...currentQuery,
        ...newQuery
    }

};


const searchProducts = (products, search) => {
    if (!search) return products;
    const searchProducts = products.filter(p => p.title.toLowerCase().includes(search));
    return searchProducts;
};

const filterProducts = (products, category) => {
    if (!category) return products;
    const filteredProducts = products.filter(p => p.category === category);
    return filteredProducts;
};


const categories = [
    { id: 1, type: "All" },
    { id: 2, type: "Electronics" },
    { id: 3, type: "Jewelery" },
    { id: 4, type: "Men's Clothing" },
    { id: 5, type: "Women's Clothing" },
];



const productQuantity = (state, id) => {
    const index = state.selectedItems.findIndex(i => i.id === id);
    if (index === -1) return 0;
    else { return state.selectedItems[index].quantity }
};



const sumPrice = products => {
    return products.reduce((acc, cur) =>
        acc + cur.price * cur.quantity.toFixed(2), 0).toFixed(2);
};
const sumQuantity = products => {
    return products.reduce((acc, cur) =>
        acc + cur.quantity, 0);
};



export {
    shortenText, categories, createQueryObject,
    searchProducts, filterProducts, productQuantity, sumPrice, sumQuantity
};