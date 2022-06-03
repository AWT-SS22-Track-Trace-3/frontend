import React from "react"; import { useResolvedPath } from "react-router-dom";
import ProductListItem from "./ProductListItem";

const ProductList = (props) => {
    return (
        <div>
            {props.products.products.map((item, index) =>
                <ProductListItem item={item}></ProductListItem>
            )}
        </div>
    );
}

export default ProductList;