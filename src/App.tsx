import React, { useState } from "react";
import "./App.css";
import Barcode from "react-barcode";

type Product = {
  name: string;
  price: number;
  barcode: string;
};

const defaultProduct: Product = {
  name: "Sample Product",
  price: 19.99,
  barcode: "012345678912",
};

function App() {
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(product);

  const handleEdit = () => {
    setForm(product);
    setEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProduct(form);
    setEditing(false);
  };

  return (
    <div className="container">
      <h1>Product Tag Display</h1>
      <div className="product-tag">
        <div className="tag-content">
          <div className="product-name">{product.name}</div>
          <div className="product-price">${product.price.toFixed(2)}</div>
          <Barcode value={product.barcode} height={60} displayValue={false} />
          <div className="barcode-value">{product.barcode}</div>
        </div>
        <button className="edit-btn" onClick={handleEdit}>
          Edit
        </button>
      </div>
      {editing && (
        <div className="modal">
          <form className="edit-form" onSubmit={handleSave}>
            <label>
              Name:
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={form.price}
                step="0.01"
                min="0"
                onChange={(e) =>
                  setForm({ ...form, price: parseFloat(e.target.value) })
                }
                required
              />
            </label>
            <label>
              Barcode:
              <input
                type="text"
                value={form.barcode}
                pattern="^\d+$"
                onChange={(e) =>
                  setForm({ ...form, barcode: e.target.value })
                }
                required
              />
            </label>
            <div className="form-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;