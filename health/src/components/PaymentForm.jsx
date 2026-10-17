import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';

export default function PaymentForm({ totalCost, onConfirm }) {
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      // Simulate success if fields filled, or basic validation
      if (cardNumber.length >= 12) {
        onConfirm({ success: true });
      } else {
        onConfirm({ success: false, error: 'Please enter a valid card number.' });
      }
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label className="block text-[11px] text-gray-400 font-semibold mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          required
          placeholder="John Doe"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-dark-bg border border-border-green/40 rounded-lg text-gray-200 focus:outline-none focus:border-gym-green"
        />
      </div>

      <div>
        <label className="block text-[11px] text-gray-400 font-semibold mb-1">
          Card Number
        </label>
        <div className="relative">
          <input
            type="text"
            required
            maxLength={19}
            placeholder="4532 •••• •••• 8892"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full px-3 py-2 pl-9 text-xs bg-dark-bg border border-border-green/40 rounded-lg text-gray-200 focus:outline-none focus:border-gym-green"
          />
          <CreditCard className="w-4 h-4 text-gray-500 absolute left-2.5 top-2.5" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] text-gray-400 font-semibold mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            required
            placeholder="MM/YY"
            maxLength={5}
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-dark-bg border border-border-green/40 rounded-lg text-gray-200 focus:outline-none focus:border-gym-green"
          />
        </div>
        <div>
          <label className="block text-[11px] text-gray-400 font-semibold mb-1">
            CVC / CVV
          </label>
          <input
            type="password"
            required
            maxLength={4}
            placeholder="123"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-dark-bg border border-border-green/40 rounded-lg text-gray-200 focus:outline-none focus:border-gym-green"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full py-3 mt-4 bg-gym-green text-secondary font-bold rounded-xl shadow-lg hover:bg-gym-green/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        <Lock className="w-4 h-4" />
        {isProcessing ? 'Processing Payment...' : `Pay $${totalCost}`}
      </button>
    </form>
  );
}
