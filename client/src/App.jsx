import React from 'react'
import Supplier from './Supplier'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';
export default function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Supplier />
    </QueryClientProvider>
  )
}
