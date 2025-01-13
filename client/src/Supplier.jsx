import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Button, FormGroup, Input } from "reactstrap";
import { getSuppliers, getProductBysupplier } from './api/getApi';
import ProductTable from './ProductTable';

export default function Supplier() {
    const { data: supplierData } = useQuery({
        queryKey: ['suppliers'],
        queryFn: getSuppliers,
    });

    const [supplier, setSupplier] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [addedProducts, setAddedProducts] = useState([]);

    const { data: productData } = useQuery({
        queryKey: ['product', supplier],
        queryFn: () => getProductBysupplier(supplier),
        enabled: !!supplier,
    });

    useEffect(() => {
        if (supplierData && supplierData.length > 0) {
            setSupplier(supplierData[0].id);
        }
    }, [supplierData]);

    const handleSupplierChange = (event) => {
        setSupplier(event.target.value);
        setSelectedProduct(null);
    };

    const handleProductChange = (event) => {
        const productId = event.target.value;
        const product = productData.find((item) => item.id === parseInt(productId));
        setSelectedProduct(product);
    };

    const handleAddProduct = () => {
        if (selectedProduct) {
            const isAlreadyAdded = addedProducts.some((product) => product.id === selectedProduct.id);

            if (!isAlreadyAdded) {
                const productWithDefaults = {
                    ...selectedProduct,
                    quantity: 1,
                    cost: selectedProduct.cost,
                };
                setAddedProducts((prevProducts) => [...prevProducts, productWithDefaults]);
                setSelectedProduct(null);
            } else {
                alert("Product is already taken.");
            }
        }
    };

    const handleProductUpdate = (id, field, value) => {
        setAddedProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, [field]: value } : product
            )
        );
    };

    return (
        <>
            <div className='w-100 d-flex'>
                <div className='d-flex gap-3 align-items-baseline'>
                    <label htmlFor="supplier">Supplier</label>
                    <FormGroup>
                        <Input
                            id="supplierSelect"
                            name="supplierSelect"
                            className='rounded-0'
                            type="select"
                            placeholder="Select Supplier"
                            onChange={handleSupplierChange}
                            value={supplier || ""}
                        >
                            <option value="">Select Supplier</option>
                            {supplierData && supplierData.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                </div>
                <div className='d-flex gap-3 align-items-baseline ms-4'>
                    <label htmlFor="product">Product</label>
                    <FormGroup>
                        <Input
                            id="productSelect"
                            className='rounded-0'
                            name="productSelect"
                            type="select"
                            placeholder='Select Product'
                            onChange={handleProductChange}
                            value={selectedProduct?.id || ""}
                        >
                            <option value="">Select Product</option>
                            {productData && productData.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                </div>
                <div className='d-flex gap-3 align-items-baseline ms-4'>
                    <FormGroup>
                        <Button
                            color='primary'
                            className='rounded-0'
                            onClick={handleAddProduct}
                            disabled={!selectedProduct}
                        >
                            <span>+</span> Add Product
                        </Button>
                    </FormGroup>
                </div>
            </div>
            <ProductTable
                productData={addedProducts}
                onUpdate={handleProductUpdate}
                setProductData={setAddedProducts}
            />
        </>
    );
}
