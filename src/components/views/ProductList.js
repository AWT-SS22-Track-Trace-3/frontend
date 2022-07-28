import React from "react";
import ProductListItem from "./ProductListItem";

const ProductList = (props) => {
    return (
        <div>
            {props.products.map((item, index) =>
                <ProductListItem item={item} key={index} reportHandler={props.reportHandler}></ProductListItem>
            )}
        </div>
    );
}

export default ProductList;