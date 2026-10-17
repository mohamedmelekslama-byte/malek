import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ShieldCheck, CreditCard, Lock, Users, CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import CouponInput from './CouponInput';
import PaymentForm from './PaymentForm';
import Toast from './Toast';
import { trackEvent } from '../analytics/track';

export default function CheckoutCart({ isOpen, onClose, selectedPlan }) {
  if (!selectedPlan) return null;
  const { cart, updateCart } = useCart();
  const { billingCycle, licenses, addons, paymentMethod, discount = 0 } = cart;
  const [isSuccess, setIsSuccess] = useState(false);
  const [showToast, setShowToast] = useState({ visible: false, message: '', type: '' });

  const handleClose = () => {
    updateCart({
      billingCycle: 'monthly',
      licenses: 1,
      addons: { consultation: false, delivery: false, wearables: false },
      paymentMethod: 'card',
      discount: 0
    });
    setIsSuccess(false);
    onClose();
  };

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && !isSuccess) handleClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, isSuccess, onClose]);

  if (!isOpen) return null;

  // Plan Prices (Dietary SaaS System base prices)
  const baseMonthlyPrice = 
    selectedPlan?.id === 'bulking' ? 39 : 
    selectedPlan?.id === 'cutting' ? 29 : 
    selectedPlan?.id === 'custom_cleanse' ? 49 : 
    selectedPlan?.id === 'custom_keto' ? 45 : 35;
  const annualDiscount = 0.2; // 20% off

  // Calculate pricing
  const basePricePerSeat = billingCycle === 'monthly'
    ? baseMonthlyPrice
    : Math.round(baseMonthlyPrice * 12 * (1 - annualDiscount));

  const totalBasePrice = basePricePerSeat * licenses;

  const addonPrices = {
    consultation: billingCycle === 'monthly' ? 49 : 39,
    delivery: billingCycle === 'monthly' ? 120 : 99,
    wearables: billingCycle === 'monthly' ? 9 : 7
  };

  const activeAddonsSum = 
    (addons.consultation ? addonPrices.consultation : 0) +
    (addons.delivery ? addonPrices.delivery : 0) +
    (addons.wearables ? addonPrices.wearables : 0);

  const totalCost = Math.round((totalBasePrice + activeAddonsSum) * (1 - discount / 100));

  const handleAddonClick = (key) => {
    updateCart({ addons: { ...addons, [key]: !addons[key] } });
    trackEvent('addon_toggle', { addon: key, enabled: !addons[key] });
  };

  const handleConfirm = async (paymentResult) => {
    // paymentResult contains success flag and any error info
    if (paymentResult.success) {
      setIsSuccess(true);
      trackEvent('checkout_success', { planId: selectedPlan?.id, billingCycle, licenses, addons });
      setShowToast({ visible: true, message: 'Payment successful! Subscription activated.', type: 'success' });
    } else {
      setShowToast({ visible: true, message: paymentResult.error || 'Payment failed.', type: 'error' });
      trackEvent('checkout_failure', { error: paymentResult.error });
    }
  };

  const handleSuccessClose = () => {
    setIsSuccess(false);
    handleClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        
        {/* Main Cart Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="relative w-full max-w-5xl bg-card-bg border border-border-green/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-full lg:h-[720px] max-h-full"
        >
          
          {/* Close Cart Button */}
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-dark-bg/50 hover:bg-dark-bg border border-border-green/40 text-gray-400 hover:text-primary transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Configuration Forms (60% width) */}
          <div className="lg:w-[60%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto border-r border-border-green/40 text-left">
            <div>
              <CouponInput onDiscountApplied={(discount) => {
                  updateCart({ discount });
                }} />
              {/* Header */}
              <div className="mb-8 pr-12">
                <span className="text-[10px] text-gym-green font-bold uppercase tracking-widest bg-gym-green/10 px-2.5 py-1 rounded border border-gym-green/20">
                  Cart Review
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-extrabold text-primary mt-2">
                  Configure Your Subscription
                </h2>
                <p className="text-xs text-gray-400 mt-1 font-light">
                  Tailor your licenses and biochemistry add-ons to perfect your plan.
                </p>
              </div>

              {/* Step 1: Billing Frequency Toggle */}
              <div className="mb-6 p-4 rounded-2xl bg-secondary/20 border border-border-green/40 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-semibold text-primary">Billing Interval</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Save 20% on annual commitments</p>
                </div>
                <div className="flex bg-dark-bg rounded-xl p-1 border border-border-green/50">
                  <button
                    type="button" onClick={() => updateCart({ billingCycle: 'monthly' })}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      billingCycle === 'monthly'
                        ? 'bg-gym-green text-secondary shadow-md'
                        : 'text-gray-400 hover:text-primary'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button" onClick={() => updateCart({ billingCycle: 'annual' })}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      billingCycle === 'annual'
                        ? 'bg-gym-green text-secondary shadow-md'
                        : 'text-gray-400 hover:text-primary'
                    }`}
                  >
                    Annual
                    <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded uppercase font-extrabold">
                      -20%
                    </span>
                  </button>
                </div>
              </div>

              {/* Step 2: License / User Count Selector */}
              <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-green/30 pb-6">
                <div>
                  <h4 className="text-sm font-semibold text-primary flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gym-green" />
                    Family Members / User Seats
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Extend the plan and macros tracking to your relatives or team.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button" onClick={() => updateCart({ licenses: Math.max(1, licenses - 1) })}
                    className="w-10 h-10 rounded-xl border border-border-green bg-dark-bg hover:border-gym-green text-primary font-bold text-lg flex items-center justify-center transition-all cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-display font-bold text-lg text-primary">
                    {licenses}
                  </span>
                  <button
                    type="button" onClick={() => updateCart({ licenses: Math.min(10, licenses + 1) })}
                    className="w-10 h-10 rounded-xl border border-border-green bg-dark-bg hover:border-gym-green text-primary font-bold text-lg flex items-center justify-center transition-all cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Step 3: Add-on Checkboxes */}
              <div className="mb-8">
                <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-4">
                  Available Add-Ons & Integration Features
                </h4>
                <div className="space-y-3">
                  {/* Addon 1 */}
                  <div
                    onClick={() => handleAddonClick('consultation')}
                    className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer ${
                      addons.consultation
                        ? 'border-gym-green bg-gym-green/5 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                        : 'border-border-green/50 bg-dark-bg/40 hover:border-border-green'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={addons.consultation}
                      onChange={() => {}} // Controlled by outer div click
                      className="mt-1 accent-gym-green w-4 h-4 rounded"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-primary">1-on-1 Clinical Biochemist Consultation</span>
                        <span className="text-xs font-bold text-gym-green">
                          +{addonPrices.consultation}/{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        Bi-weekly medical analysis and blood marker feedback to align nutrition with your health history.
                      </p>
                    </div>
                  </div>

                  {/* Addon 2 */}
                  <div
                    onClick={() => handleAddonClick('delivery')}
                    className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer ${
                      addons.delivery
                        ? 'border-gym-green bg-gym-green/5 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                        : 'border-border-green/50 bg-dark-bg/40 hover:border-border-green'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={addons.delivery}
                      onChange={() => {}}
                      className="mt-1 accent-gym-green w-4 h-4 rounded"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-primary">Biochem-Certified Meal Prep Delivery</span>
                        <span className="text-xs font-bold text-gym-green">
                          +{addonPrices.delivery}/{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        Have chef-prepared gourmet meals matching your active profile shipped fresh to your door weekly.
                      </p>
                    </div>
                  </div>

                  {/* Addon 3 */}
                  <div
                    onClick={() => handleAddonClick('wearables')}
                    className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer ${
                      addons.wearables
                        ? 'border-gym-green bg-gym-green/5 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                        : 'border-border-green/50 bg-dark-bg/40 hover:border-border-green'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={addons.wearables}
                      onChange={() => {}}
                      className="mt-1 accent-gym-green w-4 h-4 rounded"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-primary">Advanced Wearable Bio-Tracker Sync</span>
                        <span className="text-xs font-bold text-gym-green">
                          +{addonPrices.wearables}/{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        Automatic dynamic macro alterations syncing sleep, cardio load, and CGM glucose readouts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-border-green/35 flex flex-wrap gap-6 items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-gym-green" />
                <span>256-bit SSL Bank-Grade Encryption</span>
              </div>
              <div className="flex gap-4">
                <span className="font-semibold tracking-wider text-[10px] text-gray-400 border border-gray-700/50 px-2 py-0.5 rounded">
                  PCI-DSS COMPLIANT
                </span>
                <span className="font-semibold tracking-wider text-[10px] text-gray-400 border border-gray-700/50 px-2 py-0.5 rounded">
                  HIPAA SAFE
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout & Payment details (40% width) */}
          <div className="lg:w-[40%] bg-dark-bg/60 p-6 md:p-8 flex flex-col justify-between text-left overflow-y-auto">
            <div>
              {/* Plan Summary Card */}
              <div className="mb-6">
                <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3">Order Summary</h4>
                <div className="p-4 rounded-2xl bg-secondary/15 border border-border-green/40 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-primary">{selectedPlan?.name || 'VitaFuel Plan'}</span>
                    <span className="text-sm font-bold text-primary">
                      ${basePricePerSeat} <span className="text-gray-500 font-normal">/seat</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Licenses Assigned ({licenses})</span>
                    <span>${totalBasePrice}</span>
                  </div>
                  
                  {addons.consultation && (
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Biochemist Consultation</span>
                      <span>+${addonPrices.consultation}</span>
                    </div>
                  )}
                  {addons.delivery && (
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Gourmet Delivery</span>
                      <span>+${addonPrices.delivery}</span>
                    </div>
                  )}
                  {addons.wearables && (
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Bio-Tracker Integration</span>
                      <span>+${addonPrices.wearables}</span>
                    </div>
                  )}

                  <div className="border-t border-border-green/30 pt-3 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-primary">Total Price</span>
                    <span className="text-xl font-display font-extrabold text-gym-green">
                      ${totalCost}
                      <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wide ml-1">
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3">Payment Method</h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    type="button" onClick={() => updateCart({ paymentMethod: 'card' })}
                    className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-gym-green bg-card-bg text-primary shadow-inner'
                        : 'border-border-green/50 text-gray-400 bg-transparent hover:text-primary'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    Credit Card
                  </button>
                  <button
                    type="button" onClick={() => updateCart({ paymentMethod: 'paypal' })}
                    className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'paypal'
                        ? 'border-gym-green bg-card-bg text-primary shadow-inner'
                        : 'border-border-green/50 text-gray-400 bg-transparent hover:text-primary'
                    }`}
                  >
                    PayPal
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <PaymentForm
                    totalCost={totalCost}
                    onConfirm={handleConfirm}
                  />
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-border-green bg-dark-bg/40 text-center text-xs text-gray-400">
                    PayPal authorization modal will launch inside pop-up.
                  </div>
                )}
              </div>
            </div>

            {/* Security Badge & Toast */}
            <div className="pt-2 mt-4 border-t border-border-green/30 space-y-3">
              <p className="text-[10px] text-gray-500 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gym-green" />
                Payments processed securely by Stripe
              </p>
              {showToast.visible && <Toast type={showToast.type} message={showToast.message} onClose={() => setShowToast({ ...showToast, visible: false })} />}
            </div>

          </div>

        </motion.div>

        {/* Success Modal */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-md bg-card-bg border border-gym-green rounded-3xl p-8 text-center space-y-6 shadow-2xl relative"
              >
                {/* Visual Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gym-green/20 rounded-full blur-3xl pointer-events-none" />

                <div className="w-16 h-16 rounded-full bg-gym-green/10 border border-gym-green flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-gym-green animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-extrabold text-primary">
                    Subscription Activated!
                  </h3>
                  <p className="text-xs text-gray-400 font-light">
                    Your profile has been upgraded. Welcome to the VitaFuel ecosystem.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-secondary/20 border border-border-green/40 text-left space-y-2.5 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Plan Activated</span>
                    <strong className="text-primary">{selectedPlan?.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>User Licenses</span>
                    <strong className="text-primary">{licenses} Seat(s)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Billing Interval</span>
                    <strong className="text-primary uppercase">{billingCycle}</strong>
                  </div>
                  <div className="flex justify-between border-t border-border-green/30 pt-2 font-semibold text-gym-green">
                    <span>Charged Total</span>
                    <span>${totalCost}/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                </div>

                <button
                  onClick={handleSuccessClose}
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-gym-green text-secondary font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Go to Dashboard
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AnimatePresence>
  );
}
