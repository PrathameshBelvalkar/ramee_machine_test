export const saveInvoice = async (data) => {
  const response = await fetch("http://localhost:8000/api/save-invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log(result);

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to save invoice");
  }
  return result;
};
