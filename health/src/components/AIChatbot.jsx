import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, User, MessageSquare } from 'lucide-react';

const SUGGESTIONS = [
  { text: '🥗 Low Glycemic Plan', query: 'Recommend a diabetes low glycemic plan' },
  { text: '❤️ DASH Hypertension Plan', query: 'What diet do you have for hypertension and blood pressure?' },
  { text: '💪 Mass Bulking Plan', query: 'Explain the mass bulking plan' },
  { text: '⚡ Shredded Cutting Plan', query: 'Give me details on the fat loss cutting diet' }
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am your VitaFuel AI Nutritionist. Tell me about your fitness goals or medical conditions (e.g., bulking, cutting, diabetes, hypertension) so I can recommend the perfect dietary program."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Trigger typing simulation
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getExpertResponse(text);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1200);
  };

  const getExpertResponse = (query) => {
    const q = query.toLowerCase();

    // Diabetes / Sugar
    if (q.includes('diabetes') || q.includes('sugar') || q.includes('glycemic') || q.includes('insulin') || q.includes('glucose') || q.includes('low gi')) {
      return "To optimize blood glucose levels and insulin sensitivity, we recommend the **Diabetes Friendly (Low GI) Plan**. This system replaces simple carbohydrates with high-viscosity soluble fibers (like cauliflower rice and chia seed pudding) to prevent rapid glucose spikes. Signature dishes include our **Sesame Ginger Tofu & Cauliflower Rice** and **Mediterranean Salmon Salad**.";
    }

    // Hypertension / Blood Pressure / DASH
    if (q.includes('hypertension') || q.includes('blood pressure') || q.includes('bp') || q.includes('sodium') || q.includes('salt') || q.includes('dash')) {
      return "For managing hypertension and vascular stiffness, we recommend the **Hypertension (DASH Plan)**. This diet is strictly sodium-controlled (less than 1,500mg daily) and rich in potassium, magnesium, and calcium to regulate vascular tension. Key dishes include our **Salt-Free Garlic Seared Salmon** and **Potassium-Rich Lentil Soup**.";
    }

    // Bulking / Hypertrophy / Muscle
    if (q.includes('bulk') || q.includes('bulking') || q.includes('muscle') || q.includes('protein') || q.includes('hypertrophy') || q.includes('gain size')) {
      return "For muscle hypertrophy and mass development, our **Mass Bulking Plan** is perfect. It supplies 3,200 kcal daily with a heavy protein profile (185g) and complex carbohydrates to replenish muscular glycogen. Featured meals are the **Teriyaki Steak & Rice** and **Powerhouse Oatmeal Bowl**.";
    }

    // Cutting / Fat Loss / Shredded
    if (q.includes('cut') || q.includes('cutting') || q.includes('shred') || q.includes('shredded') || q.includes('fat loss') || q.includes('burn fat') || q.includes('deficit')) {
      return "For fat loss while preserving lean body tissue, we suggest the **Shredded Cutting Plan**. Operating at a strategic deficit of 1,800 kcal, it carries a high protein-to-calorie ratio (160g protein) and high fiber content for satiety. Featured meals include the **Lemon Herb Chicken Salad** and **Cod Filet & Zucchini Noodles**.";
    }

    // Lean Gain / Composition
    if (q.includes('lean gain') || q.includes('lean mass') || q.includes('recomp') || q.includes('maintenance')) {
      return "If you are aiming to grow lean size slowly without adding body fat, the **Clean Lean Gain Plan** is recommended. It delivers 2,500 kcal with 170g of protein, focusing on clean complex carbohydrates and lean poultry. We suggest trying the **Turkey & Quinoa Bowl**.";
    }

    // General Greeting
    if (q.includes('hello') || q.includes('hi ') || q.includes('hey') || q.includes('greetings')) {
      return "Greetings! I am here to help you select a meal plan. Tell me: are you looking to **bulk**, **cut**, manage **diabetes**, or control **hypertension**?";
    }

    // Fallback response
    return "I can suggest tailored diet structures for **bulking**, **cutting**, **glycemic control (diabetes)**, or **blood pressure management (hypertension)**. What is your primary tracking requirement?";
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-gym-green hover:bg-primary text-secondary hover:text-primary transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center justify-center cursor-pointer group"
        aria-label="Open AI Nutritionist Chat"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
        ) : (
          <MessageSquare className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform animate-[pulse_2s_infinite]" />
        )}
      </button>

      {/* Chat Draw Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[75vh] z-50 glass-panel-heavy rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-border-green/80 text-left bg-dark-bg/95"
          >
            {/* Header */}
            <div className="p-4 border-b border-border-green/50 bg-[#09120b] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-secondary border border-border-green flex items-center justify-center">
                  <Bot className="w-5 h-5 text-gym-green" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-extrabold text-primary flex items-center gap-1.5">
                    VitaFuel AI Advisor
                    <Sparkles className="w-3.5 h-3.5 text-gym-green animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-gray-500 font-light flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gym-green animate-ping" />
                    Biochemical Expert Online
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg border border-border-green/50 hover:border-gym-green hover:bg-dark-bg text-gray-500 hover:text-primary transition-colors cursor-pointer"
                aria-label="Minimize chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 flex flex-col">
              {messages.map((msg, idx) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 max-w-[85%] ${
                      isBot ? 'self-start' : 'self-end flex-row-reverse'
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center border flex-shrink-0 ${
                        isBot
                          ? 'bg-secondary border-border-green text-gym-green'
                          : 'bg-primary border-border-green text-secondary'
                      }`}
                    >
                      {isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed font-light ${
                        isBot
                          ? 'bg-card-bg text-primary border border-border-green/60 rounded-tl-sm'
                          : 'bg-gym-green text-secondary font-semibold rounded-tr-sm'
                      }`}
                    >
                      {msg.text.split('\n').map((para, i) => (
                        <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                          {para.split('**').map((textChunk, chunkIdx) => {
                            // Simple markdown bold formatting **word**
                            if (chunkIdx % 2 === 1) {
                              return <strong key={chunkIdx} className="font-extrabold text-gym-green light:text-primary">{textChunk}</strong>;
                            }
                            return textChunk;
                          })}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-2.5 self-start max-w-[85%]">
                  <div className="w-7 h-7 rounded-lg bg-secondary border border-border-green text-gym-green flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-card-bg text-primary border border-border-green/60 rounded-tl-sm flex items-center gap-1.5">
                    <span className="dot animate-bounce w-1.5 h-1.5 bg-gym-green rounded-full" style={{ animationDelay: '0ms' }} />
                    <span className="dot animate-bounce w-1.5 h-1.5 bg-gym-green rounded-full" style={{ animationDelay: '150ms' }} />
                    <span className="dot animate-bounce w-1.5 h-1.5 bg-gym-green rounded-full" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 pb-3 flex flex-col gap-1.5 text-left">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider pl-1">Quick Prompts</span>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((sug, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => handleSend(sug.query)}
                      className="px-2.5 py-1.5 rounded-xl border border-border-green/70 hover:border-gym-green text-[10px] text-gray-400 hover:text-primary bg-card-bg/50 transition-colors cursor-pointer"
                    >
                      {sug.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-3 border-t border-border-green/50 bg-[#09120b] flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about high glucose, cutting diet..."
                className="flex-grow px-3 py-2 text-xs rounded-xl border border-border-green bg-dark-bg text-primary focus:border-gym-green focus:outline-none placeholder-gray-600 transition-colors"
                disabled={isTyping}
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-gym-green hover:bg-primary text-secondary hover:text-primary transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"
                disabled={isTyping}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
