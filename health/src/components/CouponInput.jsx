import React, { useState } from 'react';

const validateCoupon = (code) => {
  const coupons = {
    SAVE10: 10,
    SAVE20: 20,
    HEALTH5: 5,
  };
  return coupons[code.toUpperCase()] || 0;
};

export default function CouponInput({ onDiscountApplied }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const applyCoupon = (e) => {
    e.preventDefault();
    const discount = validateCoupon(code.trim());
    if (discount > 0) {
      onDiscountApplied(discount);
      setMessage(`Coupon applied: ${discount}% off`);
    } else {
      setMessage('Invalid coupon code');
    }
  };

  return (
    <div className="mb-4 p-3 bg-secondary/30 rounded-xl border border-border-green/50">
      <form onSubmit={applyCoupon} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter coupon code (e.g. SAVE20)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 px-3 py-2 text-xs bg-dark-bg border border-border-green/40 rounded-lg text-gray-200 focus:outline-none focus:border-gym-green"
        />
        <button
          type="submit"
          className="px-4 py-2 text-xs font-bold bg-gym-green text-secondary rounded-lg hover:bg-gym-green/90 transition-colors"
        >
          Apply
        </button>
      </form>
      {message && (
        <p className={`text-[11px] mt-2 ${message.includes('applied') ? 'text-gym-green' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
