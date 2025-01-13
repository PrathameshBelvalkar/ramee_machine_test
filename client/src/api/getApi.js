export const getSuppliers = async () => {
  const response = await fetch("http://localhost:8000/api/get-supplier", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.data;
};
export const getProductBysupplier = async (id) => {
  const response = await fetch(
    "http://localhost:8000/api/get-product-by-supplier/" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data.data;
};
export const getProductAllInvoice = async (id) => {
  const response = await fetch("http://localhost:8000/api/get-invoice", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
