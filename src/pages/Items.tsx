import { AppLayout } from "@/components/layout/AppLayout";
import React, { useState, useEffect } from 'react';

interface Item {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemDescription, setNewItemDescription] = useState<string>('');
  const [newItemPrice, setNewItemPrice] = useState<string>('');
  const [newItemQuantity, setNewItemQuantity] = useState<string>('');
  const [nextItemId, setNextItemId] = useState<number>(1);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editedItemName, setEditedItemName] = useState<string>('');
  const [editedItemDescription, setEditedItemDescription] = useState<string>('');
  const [editedItemPrice, setEditedItemPrice] = useState<string>('');
  const [editedItemQuantity, setEditedItemQuantity] = useState<string>('');

  useEffect(() => {
    // You can load items from local storage or an API here
  }, []);

  useEffect(() => {
    // Save items to local storage or an API here
  }, [items]);

  const handleAddItem = () => {
    const price = parseFloat(newItemPrice);
    const quantity = parseInt(newItemQuantity);
    if (!newItemName || isNaN(price) || isNaN(quantity)) {
      alert('Please fill in all fields with valid data.');
      return;
    }

    const newItem: Item = {
      id: nextItemId,
      name: newItemName,
      description: newItemDescription,
      price: price,
      quantity: quantity,
    };

    setItems([...items, newItem]);
    setNextItemId(nextItemId + 1);
    setNewItemName('');
    setNewItemDescription('');
    setNewItemPrice('');
    setNewItemQuantity('');
  };

  const handleEditItem = (item: Item) => {
    setEditItemId(item.id);
    setEditedItemName(item.name);
    setEditedItemDescription(item.description || '');
    setEditedItemPrice(item.price.toString());
    setEditedItemQuantity(item.quantity.toString());
  };

  const handleSaveEdit = () => {
    if (editItemId === null) return;
    const price = parseFloat(editedItemPrice);
    const quantity = parseInt(editedItemQuantity);
    if (!editedItemName || isNaN(price) || isNaN(quantity)) {
      alert('Please fill in all fields with valid data.');
      return;
    }

    const updatedItems = items.map((item) =>
      item.id === editItemId
        ? {
            ...item,
            name: editedItemName,
            description: editedItemDescription,
            price: price,
            quantity: quantity,
          }
        : item
    );

    setItems(updatedItems);
    setEditItemId(null);
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-4">
        <h1 className="text-3xl font-bold">Items</h1>
        <p className="text-gray-600">Manage your inventory and services</p>

        <div className="border p-4 rounded-md shadow-sm">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Item Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <input
              type="text"
              placeholder="Description (Optional)"
              value={newItemDescription}
              onChange={(e) => setNewItemDescription(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <button onClick={handleAddItem} className="bg-cyan-500 text-white p-2 rounded">
              Add Item
            </button>
          </div>

          <ul>
            {items.map((item) => (
              <li key={item.id} className="border-b py-2">
                {editItemId === item.id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editedItemName}
                      onChange={(e) => setEditedItemName(e.target.value)}
                      className="border p-1 rounded"
                    />
                    <input
                      type="text"
                      value={editedItemDescription}
                      onChange={(e) => setEditedItemDescription(e.target.value)}
                      className="border p-1 rounded"
                    />
                    <input
                      type="number"
                      value={editedItemPrice}
                      onChange={(e) => setEditedItemPrice(e.target.value)}
                      className="border p-1 rounded"
                    />
                    <input
                      type="number"
                      value={editedItemQuantity}
                      onChange={(e) => setEditedItemQuantity(e.target.value)}
                      className="border p-1 rounded"
                    />
                    <button onClick={handleSaveEdit} className="bg-green-500 text-white p-1 rounded">Save</button>
                    <button onClick={() => setEditItemId(null)} className="bg-gray-300 p-1 rounded">Cancel</button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      {item.name} - ${item.price} ({item.quantity})
                    </div>
                    <div>
                      <button onClick={() => handleEditItem(item)} className="bg-yellow-500 text-black p-1 rounded mr-1">Edit</button>
                      <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
};

export default Items;