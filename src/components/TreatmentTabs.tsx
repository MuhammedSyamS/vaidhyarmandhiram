import React, { useState, useEffect } from 'react';

function useLang() {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    const update = () => setLang(document.documentElement.getAttribute('data-lang') || 'en');
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
    return () => obs.disconnect();
  }, []);
  return lang;
}

const categories = [
  { id: 'panchakarma', label: 'Panchakarma (Detox)', ml: 'പഞ്ചകർമ്മം (ശുദ്ധീകരണം)' },
  { id: 'localized-basti', label: 'Localized Basti', ml: 'ലോക്കലൈസ്ഡ് ബസ്തി' },
  { id: 'sudation-scrub', label: 'Sudation & Scrubbing', ml: 'സ്വേദനവും സ്ക്രബ്ബിംഗും' },
  { id: 'eye-ear-care', label: 'Eye & Ear Care', ml: 'കണ്ണ് & ചെവി പരിചരണം' },
];

const treatments = {
  'panchakarma': [
    {
      name: 'Vamana',
      subtitle: 'Therapeutic vomiting',
      dosha: 'Kapha Balancing',
      desc: 'Therapeutic vomiting process carefully administered to eliminate excess Kapha dosha, clearing toxins from the respiratory and gastrointestinal tracts.',
      benefits: ['Clears respiratory congestion', 'Improves digestive capacity', 'Detoxifies stomach tissue']
    },
    {
      name: 'Virechana',
      subtitle: 'Purgation therapy',
      dosha: 'Pitta Balancing',
      desc: 'Therapeutic purgation targeting the liver and small intestine to cleanse deep-seated Pitta toxins, purifying blood and skin tissue.',
      benefits: ['Purifies blood of heat toxins', 'Improves complex skin conditions', 'Reduces excess body heat']
    },
    {
      name: 'Basti',
      subtitle: 'Medicated enemas',
      dosha: 'Vata Balancing',
      desc: 'The mother of all treatments, utilizing medicated oils and herbal decoctions via enema to balance Vata, lubricate the colon, and relieve joint issues.',
      benefits: ['Relieves lower back stiffness', 'Balances nervous system', 'Lubricates joints & colon']
    },
    {
      name: 'Nasya',
      subtitle: 'Nasal administration of herbs/oils',
      dosha: 'Head & Neck Wellness',
      desc: 'Nasal administration of medicated oils or herbal drops. Highly effective for cleansing sinus passages, improving memory, and soothing mental tension.',
      benefits: ['Clears nasal & sinus passages', 'Relieves headaches & migraines', 'Enhances mental clarity & memory']
    },
    {
      name: 'Raktamokshana',
      subtitle: 'Traditional bloodletting',
      dosha: 'Pitta Balancing (Rarely Used)',
      desc: 'Classical and controlled bloodletting therapy used under highly specific conditions to remove blood-borne toxins and relieve severe Pitta disorders.',
      benefits: ['Purifies localized blood', 'Relieves chronic skin issues', 'Reduces severe heat build-up']
    },
    {
      name: 'Abhyanga',
      subtitle: 'Full-body massage',
      dosha: 'Dosha-Specific Wellness',
      desc: 'Rhythmic, gentle full-body massage using Dosha-specific warm medicated oils. Formulated to improve blood circulation, lubricate joints, and build immunity.',
      benefits: ['Improves blood circulation', 'Deeply relaxes muscles', 'Strengthens nervous system']
    },
    {
      name: 'Shirodhara',
      subtitle: 'Forehead oil flow',
      dosha: 'Stress & Mental Clarity',
      desc: 'A continuous, soothing stream of warm medicated oil, buttermilk, or herbal decoction poured gently over the forehead. Excellent for stress and mental clarity.',
      benefits: ['Deeply calms nervous system', 'Improves sleep quality & insomnia', 'Relieves mental anxiety & fatigue']
    },
    {
      name: 'Pizhichil',
      subtitle: 'Royal Treatment',
      dosha: 'Oleation & Sudation Combined',
      desc: 'A "Royal Treatment" where warm medicated oil is squeezed from a cloth over the entire body (combines Snehana and Swedana).',
      benefits: ['Rejuvenates body tissues', 'Relieves joint stiffness & arthritis', 'Prevents muscular aging & pain']
    },
    {
      name: 'Takradhara',
      subtitle: 'Medicated buttermilk flow',
      dosha: 'Cooling & Skin Care',
      desc: 'Similar to Shirodhara, but uses medicated buttermilk; specifically used for cooling and skin conditions like psoriasis.',
      benefits: ['Cools body and mind', 'Relieves psoriasis and eczema', 'Reduces hair fall & graying']
    }
  ],
  'localized-basti': [
    {
      name: 'Kati Basti',
      subtitle: 'Pooling for the lower back',
      dosha: 'Lumbar Region Support',
      desc: 'A customized reservoir of warm medicated oil is pooled on the lower back (lumbar region) using a ring of herbal dough. Nourishes spinal tissues and relieves compression.',
      benefits: ['Relieves sciatica & back pain', 'Nourishes lumbar spine', 'Lubricates spinal discs']
    },
    {
      name: 'Greeva Basti',
      subtitle: 'Pooling for the neck',
      dosha: 'Cervical Spine Support',
      desc: 'Warm medicated oil is retained over the back of the neck and cervical spine. Deeply relieves cervical stiffness, muscle spasms, and compression.',
      benefits: ['Relieves neck pain and stiffness', 'Treats cervical spondylosis', 'Nourishes upper spine']
    },
    {
      name: 'Janu Basti',
      subtitle: 'Pooling for the knees',
      dosha: 'Knee & Joint Support',
      desc: 'Pooling warm medicated oil over the knee joints. Highly effective for joint pain, knee arthritis, and nourishing cartilage.',
      benefits: ['Lubricates knee joint', 'Improves joint flexibility', 'Prevents joint degeneration']
    },
    {
      name: 'Uro Basti',
      subtitle: 'Pooling for the chest/heart',
      dosha: 'Chest & Heart Support',
      desc: 'Retaining warm medicated oil over the chest and heart region. Highly supportive for physical chest muscles, lungs, and emotional healing.',
      benefits: ['Strengthens cardiac muscles', 'Supports lung capacity', 'Provides emotional healing']
    }
  ],
  'sudation-scrub': [
    {
      name: 'Kizhi (Pinda Sweda)',
      subtitle: 'Warm herbal bolus massage',
      dosha: 'Pain Relief & Sweat Therapy',
      desc: 'Use of warm herbal boluses (poultices) filled with leaves, powders, or medicated rice to massage the body. Combines heat, oil, and herbal pressure.',
      benefits: ['Relieves chronic joint pain', 'Reduces muscle spasms', 'Improves muscle tone']
    },
    {
      name: 'Udvartana',
      subtitle: 'Herbal powder scrub',
      dosha: 'Weight & Skin Texture',
      desc: 'A dry massage using herbal powders. It is primarily used for weight management and improving skin texture.',
      benefits: ['Promotes weight loss', 'Exfoliates & tones skin', 'Reduces cellulite buildup']
    },
    {
      name: 'Upanaha',
      subtitle: 'Medicinal poultice bandaging',
      dosha: 'Swelling & Inflammation',
      desc: 'Application of a medicinal paste covered with leaves and bandaged securely to reduce localized swelling or pain.',
      benefits: ['Reduces localized swelling', 'Alleviates chronic joint pain', 'Improves blood flow']
    }
  ],
  'eye-ear-care': [
    {
      name: 'Netra Tarpana',
      subtitle: 'Pooling of ghee over eyes',
      dosha: 'Eye Care & Strain Relief',
      desc: 'Pooling of medicated ghee over the eyes to improve vision, reduce computer eye strain, and relieve dryness.',
      benefits: ['Relieves computer eye strain', 'Improves dry eye syndrome', 'Strengthens optic nerves']
    },
    {
      name: 'Karna Purana',
      subtitle: 'Medicated ear bath',
      dosha: 'Ear Care & Vata Relief',
      desc: 'Dropping warm medicated oil into the ears to treat earaches or Vata-related issues like tinnitus.',
      benefits: ['Reduces tinnitus & earache', 'Cleanses ear canal', 'Calms jaws and neck tension']
    }
  ]
};

export default function TreatmentTabs() {
  const lang = useLang();
  const ml = lang === 'ml';
  const [activeTab, setActiveTab] = useState('panchakarma');
  const [selectedTreatment, setSelectedTreatment] = useState<any | null>(null);

  return (
    <div className="space-y-16">
      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar md:flex-wrap md:justify-center gap-2 md:gap-4 border-b border-accent-gold/20 pb-4 snap-x">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-6 py-3 text-lg transition-all duration-300 relative whitespace-nowrap snap-center flex items-center gap-2 rounded-t-lg ${
              activeTab === cat.id 
                ? 'text-primary-dark font-bold bg-accent-gold/10 border-b-2 border-accent-gold' 
                : 'text-text-muted hover:text-primary hover:bg-primary-dark/5'
            }`}
          >
            <span>{ml ? cat.ml : cat.label}</span>
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="min-h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments[activeTab as keyof typeof treatments].map((item, index) => (
            <div 
              key={index}
              className="bg-white p-8 shadow-md border-t-2 border-primary-dark/10 hover:border-accent-gold transition-all duration-300 space-y-4 group flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 rounded-lg"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] font-sans uppercase tracking-widest bg-accent-gold/10 text-accent-gold font-bold px-2.5 py-1 rounded-full">
                    {item.dosha}
                  </span>
                </div>
                <h3 className="text-2xl text-primary-dark group-hover:text-accent-gold transition-colors duration-300">{item.name}</h3>
                <p className="text-xs font-sans text-text-muted">{item.subtitle}</p>
                <p className="text-text-muted font-sans text-sm leading-relaxed line-clamp-3">{item.desc}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-accent-gold/10 mt-4">
                <span className="text-xs font-sans uppercase tracking-widest text-earth">{ml ? 'ഹോസ്പിറ്റൽ തെറാപ്പി' : 'Hospital Therapy'}</span>
                <button 
                  onClick={() => setSelectedTreatment(item)}
                  className="text-primary font-bold text-sm hover:text-accent-gold transition-colors duration-300 flex items-center gap-1"
                >
                  {ml ? 'വിശദാംശങ്ങൾ ➔' : 'Details & Benefits ➔'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sequence of Treatment Timeline Section */}
      <div className="bg-primary-dark/5 p-8 md:p-12 rounded-2xl border border-accent-gold/20 space-y-8 mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-accent-gold font-sans uppercase tracking-[0.2em] text-xs font-bold block">{ml ? 'ചികിത്സാ പ്രോട്ടോക്കോൾ' : 'Treatment Protocol'}</span>
          <h3 className="text-3xl md:text-4xl text-primary-dark">{ml ? 'ചികിത്സയുടെ ക്രമം' : 'The Sequence of Treatment'}</h3>
          <p className="text-text-muted font-sans text-sm">
            {ml ? 'ഫലപ്രദമാകാൻ, ക്ലാസിക്കൽ ആയുർവേദ കർമ്മങ്ങൾ കൃത്യമായ ഒരു മൂന്ന്-ഘട്ട പ്രോട്ടോക്കോൾ പിന്തുടരുന്നു:' : 'To be highly effective, classical Ayurvedic karmas follow a precise, scientifically structured three-stage protocol:'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative mt-12">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-accent-gold/20 -translate-y-1/2 z-0" />

          {/* Step 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-accent-gold flex flex-col items-center text-center relative z-10 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-accent-gold text-primary-dark text-xl flex items-center justify-center font-bold">1</div>
            <h4 className="text-2xl text-primary-dark">{ml ? 'പൂർവ്വകർമ്മ' : 'Purvakarma'}</h4>
            <span className="text-xs font-sans uppercase tracking-widest text-earth font-bold">{ml ? 'തയ്യാറെടുപ്പ് ഘട്ടം' : 'Preparatory Stage'}</span>
            <p className="text-text-muted font-sans text-sm leading-relaxed">
              Preparing the body via <strong>Snehana</strong> (oleation) and <strong>Swedana</strong> (fomentation/sweating) to loosen deep-seated toxins and guide them to primary channels.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-primary-dark flex flex-col items-center text-center relative z-10 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-primary-dark text-background-parchment text-xl flex items-center justify-center font-bold">2</div>
            <h4 className="text-2xl text-primary-dark">{ml ? 'പ്രധാന കർമ്മ' : 'Pradhana Karma'}</h4>
            <span className="text-xs font-sans uppercase tracking-widest text-earth font-bold">{ml ? 'ശുദ്ധീകരണ ഘട്ടം' : 'Elimination Stage'}</span>
            <p className="text-text-muted font-sans text-sm leading-relaxed">
              The actual elimination of toxins (<strong>Panchakarma</strong>) using the five specialized cleansing actions to flush out deep cellular wastes based on your primary dosha imbalance.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-accent-gold flex flex-col items-center text-center relative z-10 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-accent-gold text-primary-dark text-xl flex items-center justify-center font-bold">3</div>
            <h4 className="text-2xl text-primary-dark">{ml ? 'പശ്ചാത് കർമ്മ' : 'Paschat Karma'}</h4>
            <span className="text-xs font-sans uppercase tracking-widest text-earth font-bold">{ml ? 'ചികിത്സാനന്തര പരിചരണം' : 'Post-Treatment Care'}</span>
            <p className="text-text-muted font-sans text-sm leading-relaxed">
              Post-treatment rehabilitation, including <strong>Samsarjana Krama</strong> (gradual reintroduction of diet) to rekindle the digestive fire (<strong>Agni</strong>) and build vitality.
            </p>
          </div>
        </div>
      </div>

      {/* Pure CSS Modal Dialog */}
      {selectedTreatment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-background-parchment max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl border border-accent-gold/30 flex flex-col relative transform transition-transform duration-300 scale-100">
            {/* Decorative gold line */}
            <div className="h-2 bg-accent-gold w-full" />
            
            <button 
              onClick={() => setSelectedTreatment(null)}
              className="absolute top-4 right-4 text-text-muted hover:text-primary-dark transition-colors text-2xl"
            >
              ✕
            </button>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-sans uppercase tracking-widest bg-accent-gold/10 text-accent-gold font-bold px-2.5 py-1 rounded-full inline-block">
                  {selectedTreatment.dosha}
                </span>
                <h4 className="text-3xl text-primary-dark font-bold pt-2">
                  {selectedTreatment.name}
                </h4>
                <p className="text-xs font-sans text-text-muted">
                  {selectedTreatment.subtitle}
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-sans uppercase tracking-widest font-bold text-primary-dark">{ml ? 'ചികിത്സാ വിവരണം' : 'Therapeutic Description'}</h5>
                <p className="text-text-muted font-sans leading-relaxed text-sm">
                  {selectedTreatment.desc}
                </p>
              </div>

              {selectedTreatment.benefits && (
                <div className="space-y-3">
                  <h5 className="text-xs font-sans uppercase tracking-widest font-bold text-primary-dark">{ml ? 'പ്രധാന ആരോഗ്യ ഗുണങ്ങൾ' : 'Key Health Benefits'}</h5>
                  <ul className="grid grid-cols-1 gap-2">
                    {selectedTreatment.benefits.map((b: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-muted font-sans">
                        <svg class="text-accent-gold w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-6 border-t border-accent-gold/10 flex gap-4">
                <button
                  onClick={() => setSelectedTreatment(null)}
                  className="flex-1 px-4 py-2 border border-primary-dark text-primary-dark font-sans text-sm rounded-lg hover:bg-primary-dark/5 transition-colors"
                >
                  {ml ? 'അടയ്ക്കുക' : 'Close Window'}
                </button>
                <a
                  href="/appointment"
                  className="flex-1 px-4 py-2 bg-primary-dark text-background-parchment text-center font-sans text-sm rounded-lg hover:bg-primary-dark-hover transition-colors font-bold flex items-center justify-center"
                >
                  {ml ? 'ചികിത്സ ബുക്ക് ചെയ്യൂ' : 'Book Treatment'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
