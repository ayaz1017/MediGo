"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  MapPin, 
  CreditCard, 
  Banknote, 
  Plus, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Upload, 
  FileText, 
  Lock,
  Truck,
  Check
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCartStore();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMode, setPaymentMode] = useState<"Online" | "COD">("Online");
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [rxUploaded, setRxUploaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      name: "Ayaz Khan",
      type: "Home",
      phone: "+91 9876543210",
      line1: "Flat 402, Sunshine Heights, Link Road",
      locality: "Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400053"
    },
    {
      id: "addr-2",
      name: "Ayaz Khan",
      type: "Office",
      phone: "+91 9876543210",
      line1: "Floor 6, Tech Innovation Centre, BKC",
      locality: "Bandra East",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400051"
    }
  ]);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: "",
    phone: "",
    line1: "",
    locality: "",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "",
    type: "Home"
  });

  const subtotal = cartTotal();
  const deliveryFee = subtotal >= 499 ? 0 : 50;
  const onlineDiscount = paymentMode === "Online" ? Math.round(subtotal * 0.05) : 0;
  const total = Math.max(0, subtotal + deliveryFee - onlineDiscount);
  const hasPrescriptionItems = items.some((item) => item.medicine.prescriptionRequired);

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.name || !newAddr.phone || !newAddr.line1 || !newAddr.pincode) {
      toast.error("Please fill in all required address fields");
      return;
    }
    const created = {
      id: `addr-${Date.now()}`,
      ...newAddr
    };
    setAddresses([...addresses, created]);
    setSelectedAddressIndex(addresses.length);
    setShowAddressForm(false);
    toast.success("New delivery address added!");
  };

  const handlePlaceOrder = () => {
    if (hasPrescriptionItems && !rxUploaded) {
      toast.error("Please attach a prescription for Schedule H medicines or confirm teleconsultation");
      setStep(2);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast.success("Order confirmed successfully!");
      router.push("/order-success");
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-2">No items to checkout</h2>
          <p className="text-slate-500 text-sm mb-6">Your cart is empty. Add medicines first to proceed to checkout.</p>
          <Link href="/medicines" className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm">
            Browse Medicines
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Stepper Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative max-w-xl mx-auto px-4">
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-0 rounded-full" />
            <div 
              className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-primary -z-0 rounded-full transition-all duration-300"
              style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "90%" }}
            />
            
            {[
              { num: 1, label: "Delivery Address" },
              { num: 2, label: "Order & Rx Review" },
              { num: 3, label: "Secure Payment" }
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-1.5 relative z-10 bg-slate-50 px-2">
                <button
                  type="button"
                  onClick={() => step > s.num && setStep(s.num as any)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-xs ${
                    step > s.num
                      ? "bg-primary text-white cursor-pointer"
                      : step === s.num
                      ? "bg-slate-900 text-white ring-4 ring-primary/20"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step > s.num ? <Check size={16} /> : s.num}
                </button>
                <span className={`text-[11px] font-bold ${step >= s.num ? "text-slate-900" : "text-slate-400"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 1: Address */}
            {step === 1 && (
              <motion.div 
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 sm:p-10"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                      <MapPin className="text-primary" /> Select Delivery Address
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">Choose where you want your medicines delivered</p>
                  </div>
                  {!showAddressForm && (
                    <button 
                      onClick={() => setShowAddressForm(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-green-50 px-3 py-1.5 rounded-xl border border-green-200 hover:bg-green-100 transition"
                    >
                      <Plus size={15} /> Add New
                    </button>
                  )}
                </div>

                {/* New Address Form */}
                {showAddressForm && (
                  <form onSubmit={handleAddNewAddress} className="mb-6 p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                    <h3 className="font-bold text-sm text-slate-800">Add New Delivery Location</h3>
                    <div className="grid sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-semibold text-slate-600 block mb-1">Full Name *</label>
                        <input 
                          type="text" 
                          required
                          value={newAddr.name}
                          onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-primary"
                          placeholder="e.g. Ayaz Khan"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-600 block mb-1">Mobile Number *</label>
                        <input 
                          type="tel" 
                          required
                          maxLength={10}
                          value={newAddr.phone}
                          onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-primary"
                          placeholder="10-digit mobile number"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="font-semibold text-slate-600 block mb-1">Flat, House no., Building, Street *</label>
                        <input 
                          type="text" 
                          required
                          value={newAddr.line1}
                          onChange={(e) => setNewAddr({ ...newAddr, line1: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-primary"
                          placeholder="House/Flat number and road details"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-600 block mb-1">Area / Locality *</label>
                        <input 
                          type="text" 
                          required
                          value={newAddr.locality}
                          onChange={(e) => setNewAddr({ ...newAddr, locality: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-primary"
                          placeholder="e.g. Andheri West"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-600 block mb-1">Pincode *</label>
                        <input 
                          type="text" 
                          required
                          maxLength={6}
                          value={newAddr.pincode}
                          onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-primary"
                          placeholder="6-digit pincode"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end pt-2">
                      <button 
                        type="button" 
                        onClick={() => setShowAddressForm(false)}
                        className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-300 transition"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-5 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dark transition"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                {/* Address Cards */}
                <div className="space-y-3 mb-8">
                  {addresses.map((addr, idx) => (
                    <label 
                      key={addr.id}
                      className={`flex items-start gap-4 p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedAddressIndex === idx
                          ? "border-primary bg-green-50/40 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="deliveryAddress"
                        checked={selectedAddressIndex === idx}
                        onChange={() => setSelectedAddressIndex(idx)}
                        className="mt-1 text-primary focus:ring-primary w-4 h-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-slate-900 text-sm sm:text-base">{addr.name}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                            {addr.type}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {addr.line1}, {addr.locality}, {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                        </p>
                        <p className="text-xs text-slate-500 font-semibold mt-1">
                          📞 Mobile: {addr.phone}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-primary text-white py-3.5 rounded-2xl font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  Continue to Order Review <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {/* Step 2: Order Review & Rx */}
            {step === 2 && (
              <motion.div 
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 sm:p-10"
              >
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="text-primary" /> Review Order Items
                </h2>
                <p className="text-xs text-slate-500 mb-6">Verify medicines and attach prescription if required</p>

                {/* Selected Address Preview */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-primary shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 font-semibold block">Delivering To</span>
                      <p className="text-xs sm:text-sm font-bold text-slate-800">
                        {addresses[selectedAddressIndex]?.name} • {addresses[selectedAddressIndex]?.line1}, {addresses[selectedAddressIndex]?.city} ({addresses[selectedAddressIndex]?.pincode})
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setStep(1)} 
                    className="text-xs font-bold text-primary hover:underline shrink-0"
                  >
                    Change
                  </button>
                </div>

                {/* Items Summary */}
                <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 mb-6 overflow-hidden">
                  {items.map((item) => (
                    <div key={item.medicine.id} className="p-3 sm:p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl shrink-0 flex items-center justify-center p-1">
                          {item.medicine.imageUrl ? (
                            <img src={item.medicine.imageUrl} alt={item.medicine.name} className="w-full h-full object-contain" />
                          ) : (
                            <FileText size={16} className="text-slate-400" />
                          )}
                        </div>
                        <div className="truncate">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{item.medicine.name}</h4>
                          <span className="text-[11px] text-slate-400">Qty: {item.quantity} × ₹{item.medicine.price}</span>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-slate-900 shrink-0">
                        ₹{item.medicine.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Prescription Required Upload Box */}
                {hasPrescriptionItems && (
                  <div className="p-5 bg-amber-50/70 border-2 border-dashed border-amber-300 rounded-2xl mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Upload size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-amber-900 mb-1">
                          Prescription Attachment Required (Schedule H Items)
                        </h4>
                        <p className="text-xs text-amber-800 leading-relaxed mb-3">
                          Indian drug regulations require a valid prescription for antibiotics and prescription-only medicines.
                        </p>

                        {rxUploaded ? (
                          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-green-300">
                            <Check size={14} className="stroke-[3]" /> Prescription Attached Successfully (Dr_Rx_Verified.pdf)
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setRxUploaded(true);
                                toast.success("Prescription attached successfully!");
                              }}
                              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
                            >
                              <Upload size={14} /> Upload Doctor Prescription
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setRxUploaded(true);
                                toast.info("Free Doctor Teleconsultation arranged after order placement.");
                              }}
                              className="px-4 py-2 bg-white border border-amber-300 text-amber-900 rounded-xl text-xs font-bold hover:bg-amber-50 transition"
                            >
                              Consult Doctor For Free
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => setStep(1)}
                    className="px-6 py-3.5 bg-slate-100 text-slate-700 rounded-2xl font-bold text-xs sm:text-sm hover:bg-slate-200 transition"
                  >
                    Back to Address
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="flex-1 bg-primary text-white py-3.5 rounded-2xl font-bold hover:bg-primary-dark transition flex items-center justify-center gap-2 shadow-md text-xs sm:text-sm"
                  >
                    Continue to Payment (₹{total}) <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div 
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 sm:p-10"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                      <Lock className="text-primary" /> Select Payment Method
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">256-Bit SSL Encrypted & Certified Gateway</p>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-4 mb-8">
                  {/* Online UPI / Cards */}
                  <label 
                    className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMode === "Online"
                        ? "border-primary bg-green-50/40 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="paymentOption"
                      checked={paymentMode === "Online"}
                      onChange={() => setPaymentMode("Online")}
                      className="mt-1 text-primary focus:ring-primary w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard size={18} className="text-primary" />
                        <span className="font-black text-slate-900 text-sm sm:text-base">
                          UPI, Debit / Credit Cards, Net Banking
                        </span>
                        <span className="text-[10px] font-black uppercase text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-300">
                          RECOMMENDED
                        </span>
                      </div>
                      <p className="text-xs text-green-700 font-bold mb-3">
                        ⚡ Instant 5% extra online payment discount applied automatically!
                      </p>

                      {/* Payment Logos Strip */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="p-1 bg-white border border-slate-200 rounded-md shadow-2xs inline-flex items-center">
                          <img src="/products/PhonePay.jpg" alt="PhonePe" className="h-5 w-auto object-contain" />
                        </span>
                        <span className="p-1 bg-white border border-slate-200 rounded-md shadow-2xs inline-flex items-center">
                          <img src="/products/gpay.jpg" alt="Google Pay" className="h-5 w-auto object-contain" />
                        </span>
                        <span className="p-1 bg-white border border-slate-200 rounded-md shadow-2xs inline-flex items-center">
                          <img src="/products/bhim.png" alt="BHIM UPI" className="h-4 w-auto object-contain" />
                        </span>
                        <span className="p-1 bg-black border border-slate-800 rounded-md shadow-2xs inline-flex items-center">
                          <img src="/products/cred.png" alt="CRED" className="h-4 w-auto object-contain" />
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label 
                    className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMode === "COD"
                        ? "border-primary bg-green-50/40 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="paymentOption"
                      checked={paymentMode === "COD"}
                      onChange={() => setPaymentMode("COD")}
                      className="mt-1 text-primary focus:ring-primary w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Banknote size={18} className="text-slate-600" />
                        <span className="font-black text-slate-900 text-sm sm:text-base">
                          Cash on Delivery (COD)
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Pay cash or scan delivery agent UPI QR code when package arrives at your doorstep.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Final Order Amount Breakdown */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 mb-8 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Charges</span>
                    <span>{deliveryFee === 0 ? <strong className="text-green-600">FREE</strong> : `₹${deliveryFee}`}</span>
                  </div>
                  {onlineDiscount > 0 && (
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>Online Payment 5% Discount</span>
                      <span>-₹{onlineDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 font-black text-base sm:text-lg text-slate-900">
                    <span>Final Amount to Pay</span>
                    <span className="text-primary text-xl sm:text-2xl">₹{total}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => setStep(2)}
                    className="px-6 py-3.5 bg-slate-100 text-slate-700 rounded-2xl font-bold text-xs sm:text-sm hover:bg-slate-200 transition"
                  >
                    Back to Review
                  </button>
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 bg-primary text-white py-3.5 rounded-2xl font-bold hover:bg-primary-dark transition flex items-center justify-center gap-2 shadow-lg active:scale-95 text-sm sm:text-base disabled:opacity-75"
                  >
                    {isProcessing ? (
                      <span>Processing Order...</span>
                    ) : (
                      <span>{paymentMode === "Online" ? `Pay ₹${total} via UPI / Card` : `Place COD Order (₹${total})`}</span>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
