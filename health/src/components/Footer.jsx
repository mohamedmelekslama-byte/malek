import React from 'react';
import { Dumbbell, Camera, Send, Share2, ArrowUpRight, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border-green/50 bg-dark-bg pt-16 pb-12 relative overflow-hidden">
      <div className="absolute top-1/2 right-10 w-[250px] h-[250px] bg-[#002602]/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-border-green/35">
          
          {/* Brand Info (4 Columns) */}
          <div className="md:col-span-5 flex flex-col items-start text-left space-y-4">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-secondary border border-border-green flex items-center justify-center group-hover:border-gym-green transition-colors">
                <Dumbbell className="w-4.5 h-4.5 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-display text-lg tracking-wider text-primary font-bold">
                VITA<span className="text-gym-green">FUEL</span>
              </span>
            </a>
            <p className="text-gray-400 text-xs md:text-sm font-light max-w-sm leading-relaxed">
              Clinical precision meets athletic performance. We design bespoke, chef-curated nutrition systems tailored to dynamic workout plans and chronic health conditions.
            </p>
            {/* Socials */}
            <div className="flex gap-3.5 pt-2">
              {[Camera, Send, Share2, Globe].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-border-green/80 hover:border-gym-green flex items-center justify-center text-gray-400 hover:text-primary transition-all duration-300 bg-card-bg"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section (3 Columns) */}
          <div className="md:col-span-3 flex flex-col items-start text-left space-y-4">
            <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest">Navigation</h4>
            <div className="flex flex-col space-y-2.5">
              <a href="#home" className="text-gray-300 hover:text-gym-green text-sm transition-colors">Home</a>
              <a href="#features" className="text-gray-300 hover:text-gym-green text-sm transition-colors">Features</a>
              <a href="#plans" className="text-gray-300 hover:text-gym-green text-sm transition-colors">Diet Plans</a>
              <a href="#testimonials" className="text-gray-300 hover:text-gym-green text-sm transition-colors">Success Stories</a>
            </div>
          </div>

          {/* Newsletter (4 Columns) */}
          <div className="md:col-span-4 flex flex-col items-start text-left space-y-4">
            <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest">Newsletter</h4>
            <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
              Subscribe to receive biochemical nutrition updates, macro tips, and seasonal recipes.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="w-full flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg border border-border-green focus:border-gym-green focus:outline-none text-xs md:text-sm text-primary placeholder-gray-500 bg-card-bg transition-colors"
                required
              />
              <button
                type="submit"
                className="px-4 py-3 rounded-lg bg-primary text-secondary hover:bg-gym-green hover:text-primary font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-1 cursor-pointer"
              >
                Join <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} VitaFuel Inc. All rights reserved. Designed for elite compliance.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contact Support</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
