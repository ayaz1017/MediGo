"use client";

import { useState } from "react";
import { MapPin, Plus, Trash2, Edit2, X } from "lucide-react";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      name: "Ayaz Khan",
      type: "Home",
      phone: "+91 9876543210",
      line1: "123, Tech Park, Link Road, Andheri West",
      city: "Mumbai, Maharashtra 400053",
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newAddr, setNewAddr] = useState({ name: "", type: "Home", phone: "", line1: "", city: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setAddresses([...addresses, { ...newAddr, id: Date.now().toString() }]);
    setShowForm(false);
    setNewAddr({ name: "", type: "Home", phone: "", line1: "", city: "" });
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Saved Addresses</h2>
        <button onClick={() => setShowForm(true)} className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-sm">
          <Plus size={18} />
          Add New Address
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="mb-6 p-4 border border-slate-200 rounded-xl bg-slate-50 relative animate-in fade-in zoom-in-95">
          <button type="button" onClick={() => setShowForm(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
          <h3 className="font-bold text-sm mb-4">Add a new address</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <input required placeholder="Full Name" value={newAddr.name} onChange={e => setNewAddr({...newAddr, name: e.target.value})} className="px-3 py-2 border rounded-lg outline-none focus:border-primary" />
            <input required placeholder="Phone Number" value={newAddr.phone} onChange={e => setNewAddr({...newAddr, phone: e.target.value})} className="px-3 py-2 border rounded-lg outline-none focus:border-primary" />
            <input required placeholder="Address Line 1" value={newAddr.line1} onChange={e => setNewAddr({...newAddr, line1: e.target.value})} className="px-3 py-2 border rounded-lg outline-none focus:border-primary sm:col-span-2" />
            <input required placeholder="City & Pincode" value={newAddr.city} onChange={e => setNewAddr({...newAddr, city: e.target.value})} className="px-3 py-2 border rounded-lg outline-none focus:border-primary" />
            <select value={newAddr.type} onChange={e => setNewAddr({...newAddr, type: e.target.value})} className="px-3 py-2 border rounded-lg outline-none focus:border-primary">
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" className="mt-4 bg-primary text-white px-5 py-2 rounded-lg font-bold text-sm">Save Address</button>
        </form>
      )}
      
      <div className="grid md:grid-cols-2 gap-4">
        {addresses.length === 0 ? (
          <p className="text-sm text-slate-500">No addresses saved yet.</p>
        ) : addresses.map(addr => (
          <div key={addr.id} className="border-2 border-slate-200 rounded-xl p-5 hover:border-primary/50 transition-colors relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-slate-900">{addr.name}</span>
              <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-medium">{addr.type}</span>
            </div>
            <p className="text-sm text-slate-600 mb-1">{addr.line1}</p>
            <p className="text-sm text-slate-600 font-medium mb-3">{addr.city}</p>
            <p className="text-sm text-slate-600">📞 {addr.phone}</p>
            
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-md transition-colors">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(addr.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
