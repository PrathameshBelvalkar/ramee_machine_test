import React from 'react';
import { Button, Table, Input } from 'reactstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveInvoice } from './api/postApi';
import InvoicesTable from './InvoicesTable';
import { toast } from 'react-toastify';

export default function ProductTable({ productData, onUpdate, setProductData }) {
    const queryClient = useQueryClient();
    const calculateTotal = (product) => {
        const quantity = parseInt(product.quantity, 10) || 0;
        const cost = parseFloat(product.cost) || 0;
        const gst = 0.18 * cost * quantity;
        return cost * quantity + gst;
    };

    const calculateGrandTotal = () =>
        productData.reduce((sum, product) => sum + calculateTotal(product), 0);

    const saveInvoiceMutation = useMutation({
        mutationFn: saveInvoice,
        onSuccess: (data) => {
            setProductData([]);
            queryClient.invalidateQueries(['invoice']);
            // alert('Invoice saved successfully!');
            toast.success('Invoice saved successfully!');
        },
        onError: (error) => {
            console.error(error);
            // alert('Failed to save invoice. Please try again.');
            toast.error('Failed to save invoice. Please try again.');
        },
    });

    const handleSaveInvoice = () => {
        saveInvoiceMutation.mutate(productData);
    };

    return (
        <>
            <div className='mt-2'>
                <Table bordered className='table-responsive'>
                    <thead className='table-secondary'>
                        <tr>
                            <th>Code</th>
                            <th>Product Name</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Cost Price</th>
                            <th>GST (18%)</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map((product) => (
                            <tr key={product.id}>
                                <td className='fw-bold'>#{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.size}</td>
                                <td>
                                    <Input
                                        type='number'
                                        value={product.quantity}
                                        min='1'
                                        onChange={(e) =>
                                            onUpdate(product.id, 'quantity', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <Input
                                        type='number'
                                        value={product.cost}
                                        min='0'
                                        step='0.01'
                                        onChange={(e) =>
                                            onUpdate(product.id, 'cost', e.target.value)
                                        }
                                    />
                                </td>
                                <td>{(0.18 * product.cost * product.quantity).toFixed(2)}</td>
                                <td>{calculateTotal(product).toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="5">

                            </td>
                            <td className="bg-secondary-subtle text-end fw-bold">
                                Grand Total
                            </td>
                            <td className="bg-secondary-subtle fw-bold">
                                {calculateGrandTotal().toFixed(2)}
                            </td>
                        </tr>

                    </tbody>
                </Table>

                <div className='d-flex justify-content-end'>
                    <Button
                        className='bg-body-secondary border-black btn fw-bold text-dark'
                        onClick={handleSaveInvoice}
                        disabled={saveInvoiceMutation.isLoading || productData.length === 0}
                    >
                        {saveInvoiceMutation.isLoading ? 'Saving...' : 'Save & View Invoice'}
                    </Button>
                </div>
            </div>
            {/* <div>
                <InvoicesTable />
            </div> */}
        </>
    );
}
