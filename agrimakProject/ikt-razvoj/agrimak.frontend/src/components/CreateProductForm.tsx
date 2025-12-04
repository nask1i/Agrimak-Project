import React, { useState } from "react";
import { Product, Category } from "../types";
import { AppStore } from "../utils/store";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function CreateProductForm() {
  const [product, setProduct] = useState<Product>({
    id: 0,
    title: "",
    description: "",
    image: "",
    price: 0,
    category: Category.AllProducts,
    unit: "",
    stock: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "price") {
      let val = value.replace(/^0+(?=\d)/, "");
      setProduct((prev) => ({ ...prev, price: val === "" ? 0 : Number(val) }));
    } else if (name === "stock") {
      let val = value.replace(/^0+(?=\d)/, "");
      setProduct((prev) => ({ ...prev, stock: val === "" ? 0 : Number(val) }));
    } else if (name === "category") {
      setProduct((prev) => ({ ...prev, category: Number(value) as Category }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const { id, ...productData } = product;
    AppStore.createProduct(productData);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Create Product
      </Typography>
      <Box
        component="form"
        sx={{ display: "grid", gap: 2, maxWidth: 500 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField label="Title" name="title" value={product.title} onChange={handleChange} required />
        <TextField label="Description" name="description" value={product.description} onChange={handleChange} multiline rows={3} required />
        <TextField label="Image URL" name="image" value={product.image} onChange={handleChange} required />
        <TextField label="Price" name="price" type="text" value={product.price === 0 ? "" : String(product.price)} onChange={handleChange} inputProps={{ inputMode: "decimal", pattern: "^\\d*(\\.\\d{0,2})?$", min: 0, step: 0.01 }} required />
        <TextField label="Category" name="category" select value={product.category} onChange={handleChange} SelectProps={{ native: true }} required>
          {Object.entries(Category).filter(([, val]) => typeof val === "number").map(([key, val]) => (
            <option key={val} value={val}>{key}</option>
          ))}
        </TextField>
        <TextField label="Unit" name="unit" select value={product.unit} onChange={handleChange} SelectProps={{ native: true }} required>
          <option value=" ">Select unit</option>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="mg">mg</option>
          <option value="L">L</option>
          <option value="ml">ml</option>
          <option value="pcs">pcs</option>
          <option value="box">box</option>
          <option value="other">other</option>
        </TextField>
        <TextField label="Stock" name="stock" type="text" value={product.stock === 0 ? "" : String(product.stock)} onChange={handleChange} inputProps={{ inputMode: "numeric", pattern: "^\\d*$", min: 0, step: 1 }} required />
        <Button variant="contained" color="primary" type="submit">Create</Button>
      </Box>
    </>
  );
}
