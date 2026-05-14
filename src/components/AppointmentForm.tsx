import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { actions } from 'astro:actions';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AppointmentForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(event.currentTarget);
    const { data, error } = await actions.bookAppointment(formData);

    if (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } else {
      setStatus('success');
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
        <h2 className="text-3xl font-serif font-bold text-primary-dark">Appointment Requested</h2>
        <p className="text-text-muted text-lg max-w-md mx-auto">
          Thank you for choosing Vaidyarmandhiram. Our team will contact you shortly to confirm your preferred time slot.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="btn-primary"
        >
          Book Another
        </button>
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
              pattern="[0-9]{10}"
              className="w-full px-4 py-3 border border-accent-gold/20 focus:border-primary outline-none transition-colors font-sans"
              placeholder="10-digit mobile number"
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
            <label htmlFor="doctor" className="text-sm font-sans font-bold uppercase tracking-widest text-earth">Select Doctor</label>
            <select 
              id="doctor" 
              name="doctor" 
              className="w-full px-4 py-3 border border-accent-gold/20 focus:border-primary outline-none transition-colors font-sans bg-white"
            >
              <option value="dr-sathar">Dr. P. Abdul Sathar Gurukkal</option>
              <option value="dr-physician-1">Dr. Senior Physician</option>
              <option value="dr-physician-2">Dr. Ayurvedic Consultant</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="treatment" className="text-sm font-sans font-bold uppercase tracking-widest text-earth">Treatment Type</label>
            <select 
              id="treatment" 
              name="treatment" 
              className="w-full px-4 py-3 border border-accent-gold/20 focus:border-primary outline-none transition-colors font-sans bg-white"
            >
              <option value="consultation">General Consultation</option>
              <option value="panchakarma">Panchakarma Detox</option>
              <option value="spine-joint">Spine & Joint Care</option>
              <option value="skin-care">Skin Care</option>
              <option value="rejuvenation">Rejuvenation Therapy</option>
            </select>
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
          <label className="text-sm font-sans font-bold uppercase tracking-widest text-earth">Preferred Time Slot</label>
          <div className="flex flex-wrap gap-4">
            {['Morning', 'Afternoon', 'Evening'].map(slot => (
              <label key={slot} className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="timeSlot" value={slot.toLowerCase()} className="hidden peer" defaultChecked={slot === 'Morning'} />
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
