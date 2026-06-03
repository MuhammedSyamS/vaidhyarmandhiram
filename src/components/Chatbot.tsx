import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, ArrowRight } from 'lucide-react';

type Message = {
  id: string;
  type: 'bot' | 'user';
  text: string;
  action?: {
    label: string;
    href: string;
  };
};

const SYMPTOM_RULES = [
  {
    keywords: ['back', 'neck', 'joint', 'knee', 'spine', 'bone', 'muscle', 'pain', 'arthritis', 'sciatica', 'spondylosis'],
    category: 'Spine, Joint & Ortho',
    slug: 'spine-joint-ortho',
    response: 'It sounds like you might be experiencing musculoskeletal issues. We offer specialized therapies like Kizhi and Pizhichil for joint and spine care.'
  },
  {
    keywords: ['stress', 'anxiety', 'sleep', 'insomnia', 'depression', 'headache', 'migraine', 'tired', 'fatigue'],
    category: 'Stress Management',
    slug: 'lifestyle-metabolic',
    response: 'Stress and sleep issues can deeply affect your well-being. Shirodhara and our relaxation therapies are highly effective for this.'
  },
  {
    keywords: ['skin', 'hair', 'acne', 'psoriasis', 'eczema', 'dandruff', 'glow', 'beauty', 'allergy'],
    category: 'Skin, Hair & Beauty',
    slug: 'skin-hair-beauty',
    response: 'For skin and hair concerns, Ayurvedic blood purification (Raktamokshana) and herbal lepams can provide lasting natural results.'
  },
  {
    keywords: ['digestion', 'stomach', 'gas', 'acidity', 'constipation', 'ulcer', 'piles', 'fistula', 'anorectal', 'weight', 'obesity'],
    category: 'Anorectal & Digestive',
    slug: 'anorectal-digestive',
    response: 'Digestive and metabolic issues are the root of many ailments in Ayurveda. We have specialized detox (Panchakarma) and dietary protocols to help.'
  },
  {
    keywords: ['women', 'period', 'pcos', 'pcod', 'menopause', 'fertility', 'pregnancy', 'uterus'],
    category: "Women's Health",
    slug: 'womens-health',
    response: 'Our "She Care" division specializes in gynecological health, offering gentle, holistic treatments for women of all ages.'
  },
  {
    keywords: ['detox', 'cleanse', 'panchakarma', 'immunity', 'rejuvenation', 'weakness'],
    category: 'Panchakarma (Detox)',
    slug: 'panchakarma',
    response: 'Panchakarma is the ultimate mind-body detox. It cleanses toxins and completely rejuvenates your system.'
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'bot',
      text: 'Namaskaram! 🙏 I am VM, your Ayurvedic assistant. Please describe your symptoms or health concerns, and I will suggest the right treatment for you.'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Process rule-based logic
    setTimeout(() => {
      analyzeSymptom(userMessage.text);
    }, 600);
  };

  const analyzeSymptom = (text: string) => {
    const lowerText = text.toLowerCase();
    let matchedRule = null;
    let maxMatches = 0;

    for (const rule of SYMPTOM_RULES) {
      const matchCount = rule.keywords.filter(kw => lowerText.includes(kw)).length;
      if (matchCount > maxMatches) {
        maxMatches = matchCount;
        matchedRule = rule;
      }
    }

    if (matchedRule) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        text: matchedRule.response,
        action: {
          label: `Book ${matchedRule.category}`,
          href: `/appointment?treatment=${matchedRule.slug}`
        }
      }]);
    } else {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        text: "I see. Ayurveda treats the root cause of every ailment. I recommend a General Consultation so our doctors can diagnose your specific dosha imbalance.",
        action: {
          label: 'Book Consultation',
          href: '/appointment?treatment=consultation'
        }
      }]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-[85px] sm:right-[95px] z-[9998] bg-primary text-background-parchment p-3.5 rounded-full shadow-xl hover:bg-primary-dark hover:scale-110 transition-all duration-300 flex items-center justify-center group ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="absolute right-16 bg-primary-dark text-background-parchment text-xs font-sans font-bold py-1.5 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md border border-accent-gold/20">
          Symptom Checker
        </span>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 sm:right-24 z-[9999] w-[90vw] sm:w-[380px] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-accent-gold/20"
          >
            {/* Header */}
            <div className="bg-primary-dark p-4 flex items-center justify-between text-background-parchment">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-gold/20 rounded-full flex items-center justify-center text-accent-gold">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold font-serif text-lg leading-tight text-white">VM Assistant</h3>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background-cream/30">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col max-w-[85%] ${msg.type === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                  <div className={`p-3 rounded-2xl text-sm font-sans leading-relaxed ${
                    msg.type === 'user' 
                      ? 'bg-primary-dark text-white rounded-br-sm' 
                      : 'bg-white border border-accent-gold/20 text-primary-dark rounded-bl-sm shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.action && (
                    <a 
                      href={msg.action.href}
                      className="mt-2 text-xs font-bold bg-accent-gold text-white px-4 py-2 rounded-full inline-flex items-center gap-1 hover:bg-accent-gold/90 transition-colors shadow-sm"
                    >
                      {msg.action.label}
                      <ArrowRight size={12} />
                    </a>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-accent-gold/10">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="E.g., I have severe back pain..."
                  className="w-full pl-4 pr-12 py-3 bg-background-cream/50 border border-accent-gold/20 rounded-full text-sm font-sans focus:outline-none focus:border-primary-dark transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 w-8 h-8 bg-primary-dark text-white rounded-full flex items-center justify-center hover:bg-primary disabled:opacity-50 disabled:hover:bg-primary-dark transition-colors"
                >
                  <Send size={14} className="-ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
