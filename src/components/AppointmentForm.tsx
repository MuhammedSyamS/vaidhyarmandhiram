import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { actions } from 'astro:actions';
import { CheckCircle2, AlertCircle, Loader2, MessageSquare } from 'lucide-react';

export default function AppointmentForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [waLink, setWaLink] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('General Consultation');
  const [customTreatment, setCustomTreatment] = useState('');

  React.useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const treatmentParam = params.get('treatment');
      if (treatmentParam) {
        const mapping: Record<string, string> = {
          'panchakarma': 'Panchakarma (Detox)',
          'localized-basti': 'Localized Basti',
          'sudation-scrub': 'Sudation & Scrubbing',
          'eye-ear-care': 'Eye & Ear Care',
          'special-treatments': 'Special Treatments',
          'anorectal-digestive': 'Anorectal & Digestive',
          'spine-joint-ortho': 'Spine, Joint & Ortho',
          'spine-joint': 'Spine, Joint & Ortho',
          'lifestyle-metabolic': 'Lifestyle & Metabolic',
          'womens-health': "Women's Health",
          'skin-hair-beauty': 'Skin, Hair & Beauty',
          'skin-care': 'Skin, Hair & Beauty',
          'specialized-children': 'Specialized & Children',
          'rejuvenation': 'Specialized & Children'
        };
        const key = treatmentParam.toLowerCase().trim();
        const mappedValue = mapping[key] || treatmentParam;
        
        setCustomTreatment(mappedValue);
        setSelectedTreatment(mappedValue);
      }
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    
    try {
      const formData = new FormData(event.currentTarget);
      const { data, error } = await actions.bookAppointment(formData);

      if (error) {
        setStatus('error');
        setErrorMessage(JSON.stringify(error) || 'Server error occurred.');
      } else {
        const name = formData.get('name') as string;
        const phone = formData.get('phone') as string;
        const treatment = formData.get('treatment') as string;
        const date = formData.get('date') as string;
        const timeSlot = formData.get('timeSlot') as string;

        const email = formData.get('email') as string;
        const symptoms = formData.get('symptoms') as string;

        const text = `*New Appointment Request* 📅
*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Treatment:* ${treatment}
*Date:* ${date}
*Time Slot:* ${timeSlot}
${symptoms ? `*Symptoms/Notes:* ${symptoms}` : ''}`;

        const link = `https://wa.me/918593821553?text=${encodeURIComponent(text)}`;
        setWaLink(link);
        setStatus('success');
        
        // Auto-redirect to WhatsApp
        window.location.href = link;
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Network or server error: ' + (err.message || 'Unknown error'));
    }
  }

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 shadow-xl border-t-4 border-primary text-center space-y-6"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <CheckCircle2 size={48} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-primary-dark">Appointment Requested</h2>
        <p className="text-text-muted text-lg max-w-md mx-auto">
          Your request has been recorded. To instantly confirm with our team, please send your details via WhatsApp.
        </p>
        <div className="flex flex-col gap-4 items-center mt-6">
          <a 
            href={waLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full max-w-xs flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-6 rounded font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <MessageSquare size={20} />
            Send via WhatsApp
          </a>
          <button 
            onClick={() => { setStatus('idle'); setWaLink(''); }}
            className="text-text-muted text-sm hover:text-primary transition-colors mt-2"
          >
            Book Another Appointment
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 shadow-xl border-t-4 border-accent-gold">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-sans font-bold uppercase tracking-widest text-earth">Full Name</label>
            <input 
              required
              type="text" 
              id="name" 
              name="name" 
              className="w-full px-4 py-3 border border-accent-gold/20 focus:border-primary outline-none transition-colors font-sans"
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-sans font-bold uppercase tracking-widest text-earth">Phone Number</label>
            <input 
              required
              type="tel" 
              id="phone" 
              name="phone" 
              className="w-full px-4 py-3 border border-accent-gold/20 focus:border-primary outline-none transition-colors font-sans"
              placeholder="Your mobile number"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-sans font-bold uppercase tracking-widest text-earth">Email Address</label>
            <input 
              required
              type="email" 
              id="email" 
              name="email" 
              className="w-full px-4 py-3 border border-accent-gold/20 focus:border-primary outline-none transition-colors font-sans"
              placeholder="yourname@example.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-sans font-bold uppercase tracking-widest text-earth">Preferred Date</label>
            <input 
              required
              type="date" 
              id="date" 
              name="date" 
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-accent-gold/20 focus:border-primary outline-none transition-colors font-sans"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="treatment" className="text-sm font-sans font-bold uppercase tracking-widest text-earth">Treatment Type</label>
          <select 
            id="treatment" 
            name="treatment"
            value={selectedTreatment}
            onChange={(e) => setSelectedTreatment(e.target.value)}
            className="w-full px-4 py-3 border border-accent-gold/20 focus:border-primary outline-none transition-colors font-sans bg-white"
          >
            {customTreatment && ![
              'consultation', 'General Consultation', 'panchakarma', 'spine-joint', 'skin-care', 'rejuvenation',
              'Special Treatments', 'Panchakarma (Detox)', 'Localized Basti', 'Sudation & Scrubbing', 'Eye & Ear Care',
              'Anorectal & Digestive', 'Spine, Joint & Ortho', 'Lifestyle & Metabolic', 'Women\'s Health', 'Skin, Hair & Beauty', 'Specialized & Children'
            ].includes(customTreatment) && (
              <option value={customTreatment}>{customTreatment}</option>
            )}
            <option value="General Consultation">General Consultation</option>
            <option value="Special Treatments">Special Treatments</option>
            <option value="Panchakarma (Detox)">Panchakarma (Detox)</option>
            <option value="Localized Basti">Localized Basti</option>
            <option value="Sudation & Scrubbing">Sudation & Scrubbing</option>
            <option value="Eye & Ear Care">Eye & Ear Care</option>
            <option value="Anorectal & Digestive">Anorectal & Digestive</option>
            <option value="Spine, Joint & Ortho">Spine, Joint & Ortho</option>
            <option value="Lifestyle & Metabolic">Lifestyle & Metabolic</option>
            <option value="Women's Health">Women's Health</option>
            <option value="Skin, Hair & Beauty">Skin, Hair & Beauty</option>
            <option value="Specialized & Children">Specialized & Children</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-sans font-bold uppercase tracking-widest text-earth">Preferred Time Slot</label>
          <div className="flex flex-wrap gap-4">
            {['Morning', 'Afternoon', 'Evening'].map(slot => (
              <label key={slot} className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="timeSlot" value={slot} className="hidden peer" defaultChecked={slot === 'Morning'} />
                <div className="px-6 py-2 border border-accent-gold/20 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all font-sans">
                  {slot}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="symptoms" className="text-sm font-sans font-bold uppercase tracking-widest text-earth">Symptoms or Notes</label>
          <textarea 
            id="symptoms" 
            name="symptoms" 
            rows={4}
            className="w-full px-4 py-3 border border-accent-gold/20 focus:border-primary outline-none transition-colors font-sans resize-none"
            placeholder="Please describe your health concerns..."
          ></textarea>
        </div>

        <AnimatePresence>
          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded border border-red-100"
            >
              <AlertCircle size={20} />
              <p>{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          disabled={status === 'loading'}
          type="submit" 
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Processing...
            </>
          ) : (
            'Confirm Booking Request'
          )}
        </button>
      </form>
    </div>
  );
}
