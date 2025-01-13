import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductAllInvoice } from './api/getApi';
import { Table } from 'reactstrap';

export default function InvoicesTable() {
    const { data: invoiceData, isLoading, isError } = useQuery({
        queryKey: ['invoice'],
        queryFn: getProductAllInvoice,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching invoices</div>;
    }

    return (
        <div className="mt-4">
            <h4>Invoices List</h4>
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Product Name</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th>Supplier</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceData?.data?.map((invoice) => (
                        <>
                            {
                                invoice.data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{invoice.invoice_id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.size}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.cost}</td>
                                        <td>{item.supplier.name}</td>
                                    </tr>
                                ))
                            }
                        </>
                    ))}
                </tbody>
            </Table>
        </div >
    );
}
