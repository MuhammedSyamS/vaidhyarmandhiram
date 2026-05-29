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
  { id: 'special-treatments', label: 'Special Treatments', ml: 'പ്രത്യേക ചികിത്സകൾ' },
  { id: 'panchakarma', label: 'Panchakarma (Detox)', ml: 'പഞ്ചകർമ്മം (ശുദ്ധീകരണം)' },
  { id: 'localized-basti', label: 'Localized Basti', ml: 'ലോക്കലൈസ്ഡ് ബസ്തി' },
  { id: 'sudation-scrub', label: 'Sudation & Scrubbing', ml: 'സ്വേദനവും സ്ക്രബ്ബിംഗും' },
  { id: 'eye-ear-care', label: 'Eye & Ear Care', ml: 'കണ്ണ് & ചെവി പരിചരണം' },
];

const treatments: Record<string, any[]> = {
  'panchakarma': [
    {
      name: 'Vamana',
      subtitle: 'Therapeutic vomiting',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/vamana_virechana_detox.png',
      dosha: 'Kapha Balancing',
      desc: 'Therapeutic vomiting process carefully administered to eliminate excess Kapha dosha, clearing toxins from the respiratory and gastrointestinal tracts.',
      benefits: ['Clears respiratory congestion', 'Improves digestive capacity', 'Detoxifies stomach tissue']
    },
    {
      name: 'Virechana',
      subtitle: 'Purgation therapy',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/vamana_virechana_detox.png',
      dosha: 'Pitta Balancing',
      desc: 'Therapeutic purgation targeting the liver and small intestine to cleanse deep-seated Pitta toxins, purifying blood and skin tissue.',
      benefits: ['Purifies blood of heat toxins', 'Improves complex skin conditions', 'Reduces excess body heat']
    },
    {
      name: 'Basti',
      subtitle: 'Medicated enemas',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/basti_enema.png',
      dosha: 'Vata Balancing',
      desc: 'The mother of all treatments, utilizing medicated oils and herbal decoctions via enema to balance Vata, lubricate the colon, and relieve joint issues.',
      benefits: ['Relieves lower back stiffness', 'Balances nervous system', 'Lubricates joints & colon']
    },
    {
      name: 'Nasya',
      subtitle: 'Nasal administration of herbs/oils',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/nasya_therapy.png',
      dosha: 'Head & Neck Wellness',
      desc: 'Nasal administration of medicated oils or herbal drops. Highly effective for cleansing sinus passages, improving memory, and soothing mental tension.',
      benefits: ['Clears nasal & sinus passages', 'Relieves headaches & migraines', 'Enhances mental clarity & memory']
    },
    {
      name: 'Raktamokshana',
      subtitle: 'Traditional bloodletting',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/raktamokshana.png',
      dosha: 'Pitta Balancing (Rarely Used)',
      desc: 'Classical and controlled bloodletting therapy used under highly specific conditions to remove blood-borne toxins and relieve severe Pitta disorders.',
      benefits: ['Purifies localized blood', 'Relieves chronic skin issues', 'Reduces severe heat build-up']
    },
    {
      name: 'Abhyanga',
      subtitle: 'Full-body massage',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/abhyanga_massage.png',
      dosha: 'Dosha-Specific Wellness',
      desc: 'Rhythmic, gentle full-body massage using Dosha-specific warm medicated oils. Formulated to improve blood circulation, lubricate joints, and build immunity.',
      benefits: ['Improves blood circulation', 'Deeply relaxes muscles', 'Strengthens nervous system']
    },
    {
      name: 'Shirodhara',
      subtitle: 'Forehead oil flow',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/shirodhara_oil.png',
      dosha: 'Stress & Mental Clarity',
      desc: 'A continuous, soothing stream of warm medicated oil, buttermilk, or herbal decoction poured gently over the forehead. Excellent for stress and mental clarity.',
      benefits: ['Deeply calms nervous system', 'Improves sleep quality & insomnia', 'Relieves mental anxiety & fatigue']
    },
    {
      name: 'Pizhichil',
      subtitle: 'Royal Treatment',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/pizhichil_therapy.png',
      dosha: 'Oleation & Sudation Combined',
      desc: 'A "Royal Treatment" where warm medicated oil is squeezed from a cloth over the entire body (combines Snehana and Swedana).',
      benefits: ['Rejuvenates body tissues', 'Relieves joint stiffness & arthritis', 'Prevents muscular aging & pain']
    },
    {
      name: 'Takradhara',
      subtitle: 'Medicated buttermilk flow',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/shirodhara_oil.png',
      dosha: 'Cooling & Skin Care',
      desc: 'Similar to Shirodhara, but uses medicated buttermilk; specifically used for cooling and skin conditions like psoriasis.',
      benefits: ['Cools body and mind', 'Relieves psoriasis and eczema', 'Reduces hair fall & graying']
    }
  ],
  'localized-basti': [
    {
      name: 'Kati Basti',
      subtitle: 'Pooling for the lower back',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/basti_enema.png',
      dosha: 'Lumbar Region Support',
      desc: 'A customized reservoir of warm medicated oil is pooled on the lower back (lumbar region) using a ring of herbal dough. Nourishes spinal tissues and relieves compression.',
      benefits: ['Relieves sciatica & back pain', 'Nourishes lumbar spine', 'Lubricates spinal discs']
    },
    {
      name: 'Greeva Basti',
      subtitle: 'Pooling for the neck',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/basti_enema.png',
      dosha: 'Cervical Spine Support',
      desc: 'Warm medicated oil is retained over the back of the neck and cervical spine. Deeply relieves cervical stiffness, muscle spasms, and compression.',
      benefits: ['Relieves neck pain and stiffness', 'Treats cervical spondylosis', 'Nourishes upper spine']
    },
    {
      name: 'Janu Basti',
      subtitle: 'Pooling for the knees',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/basti_enema.png',
      dosha: 'Knee & Joint Support',
      desc: 'Pooling warm medicated oil over the knee joints. Highly effective for joint pain, knee arthritis, and nourishing cartilage.',
      benefits: ['Lubricates knee joint', 'Improves joint flexibility', 'Prevents joint degeneration']
    },
    {
      name: 'Uro Basti',
      subtitle: 'Pooling for the chest/heart',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/basti_enema.png',
      dosha: 'Chest & Heart Support',
      desc: 'Retaining warm medicated oil over the chest and heart region. Highly supportive for physical chest muscles, lungs, and emotional healing.',
      benefits: ['Strengthens cardiac muscles', 'Supports lung capacity', 'Provides emotional healing']
    }
  ],
  'sudation-scrub': [
    {
      name: 'Kizhi (Pinda Sweda)',
      subtitle: 'Warm herbal bolus massage',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/kizhi_poultice.png',
      dosha: 'Pain Relief & Sweat Therapy',
      desc: 'Use of warm herbal boluses (poultices) filled with leaves, powders, or medicated rice to massage the body. Combines heat, oil, and herbal pressure.',
      benefits: ['Relieves chronic joint pain', 'Reduces muscle spasms', 'Improves muscle tone']
    },
    {
      name: 'Udvartana',
      subtitle: 'Herbal powder scrub',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/udvartana_scrub.png',
      dosha: 'Weight & Skin Texture',
      desc: 'A dry massage using herbal powders. It is primarily used for weight management and improving skin texture.',
      benefits: ['Promotes weight loss', 'Exfoliates & tones skin', 'Reduces cellulite buildup']
    },
    {
      name: 'Upanaha',
      subtitle: 'Medicinal poultice bandaging',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/kizhi_poultice.png',
      dosha: 'Swelling & Inflammation',
      desc: 'Application of a medicinal paste covered with leaves and bandaged securely to reduce localized swelling or pain.',
      benefits: ['Reduces localized swelling', 'Alleviates chronic joint pain', 'Improves blood flow']
    }
  ],
  'eye-ear-care': [
    {
      name: 'Netra Tarpana',
      subtitle: 'Pooling of ghee over eyes',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/netra_tarpana_eye.png',
      dosha: 'Eye Care & Strain Relief',
      desc: 'Pooling of medicated ghee over the eyes to improve vision, reduce computer eye strain, and relieve dryness.',
      benefits: ['Relieves computer eye strain', 'Improves dry eye syndrome', 'Strengthens optic nerves']
    },
    {
      name: 'Karna Purana',
      subtitle: 'Medicated ear bath',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/karna_purana_ear.png',
      dosha: 'Ear Care & Vata Relief',
      desc: 'Dropping warm medicated oil into the ears to treat earaches or Vata-related issues like tinnitus.',
      benefits: ['Reduces tinnitus & earache', 'Cleanses ear canal', 'Calms jaws and neck tension']
    }
  ],
  'special-treatments': [
    {
      name: 'Piles (Arsha)',
      subtitle: 'Anorectal disorder',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/anorectal_care.png',
      dosha: 'Digestive & Rectal Care',
      desc: 'Ayurvedic management of hemorrhoids using herbal formulations, Kshara application, and dietary protocols to shrink piles and relieve pain.',
      benefits: ['Reduces bleeding & pain', 'Shrinks hemorrhoidal tissue', 'Prevents recurrence with diet']
    },
    {
      name: 'Fissure',
      subtitle: 'Anal fissure healing',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/anorectal_care.png',
      dosha: 'Anorectal Care',
      desc: 'Treatment of anal fissures using soothing medicated oils, Kshara Sutra, and internal Ayurvedic medications to heal the tear and relieve spasm.',
      benefits: ['Heals anal fissures', 'Relieves pain during bowel movement', 'Reduces anal sphincter spasm']
    },
    {
      name: 'Fistula (Bhagandara)',
      subtitle: 'Fistula-in-ano treatment',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/anorectal_care.png',
      dosha: 'Surgical & Herbal Care',
      desc: 'Classical Kshara Sutra therapy — a proven para-surgical Ayurvedic procedure for fistula-in-ano with minimal recurrence rate.',
      benefits: ['Treats fistula without major surgery', 'Minimal recurrence rate', 'Faster healing with herbal protocol']
    },
    {
      name: 'IBS (Irritable Bowel Syndrome)',
      subtitle: 'Gut health management',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/anorectal_care.png',
      dosha: 'Digestive Balancing',
      desc: 'Comprehensive treatment of IBS using Panchakarma, herbal formulations, and gut-healing dietary changes to restore digestive balance.',
      benefits: ['Reduces bloating & cramps', 'Regulates bowel movements', 'Heals intestinal lining']
    },
    {
      name: 'Psoriasis',
      subtitle: 'Chronic skin disorder',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/shirodhara_oil.png',
      dosha: 'Skin & Blood Purification',
      desc: 'Deep-acting Ayurvedic protocol for psoriasis including Panchakarma, blood purifying herbs, and Takradhara to reduce plaques and inflammation.',
      benefits: ['Reduces skin plaques', 'Decreases itching & inflammation', 'Long-term remission achievable']
    },
    {
      name: 'Allergy',
      subtitle: 'Allergic conditions',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/nasya_therapy.png',
      dosha: 'Immune Balancing',
      desc: 'Treatment of respiratory, skin, and food allergies using Rasayana herbs, Nasya therapy, and immune modulating Ayurvedic protocols.',
      benefits: ['Strengthens immune response', 'Reduces allergic reaction severity', 'Long-term desensitization']
    },
    {
      name: 'Kidney Stone',
      subtitle: 'Renal calculi management',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/kidney_stone_care.png',
      dosha: 'Urinary & Renal Care',
      desc: 'Herbal diuretic formulations to dissolve and flush small kidney stones combined with dietary protocol to prevent new stone formation.',
      benefits: ['Dissolves small kidney stones', 'Reduces urinary tract inflammation', 'Prevents stone recurrence']
    },
    {
      name: 'Sciatica',
      subtitle: 'Sciatic nerve pain',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/basti_enema.png',
      dosha: 'Vata & Nerve Balancing',
      desc: 'Treatment of sciatic nerve pain using Kati Basti, Basti enema therapy, and Kizhi. Highly effective for radiating pain from the lower back to the leg.',
      benefits: ['Relieves radiating nerve pain', 'Reduces lumbar disc pressure', 'Restores walking comfort']
    },
    {
      name: 'Cervical Spondylitis',
      subtitle: 'Cervical spine inflammation',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/basti_enema.png',
      dosha: 'Cervical Spine Support',
      desc: 'Anti-inflammatory herbal therapies and Greeva Basti to reduce inflammation of the cervical vertebrae and restore neck mobility.',
      benefits: ['Reduces cervical inflammation', 'Restores neck mobility', 'Relieves radiating arm pain']
    },
    {
      name: 'Cervical Spondylosis',
      subtitle: 'Cervical spine degeneration',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/basti_enema.png',
      dosha: 'Cervical Spine Support',
      desc: 'Greeva Basti combined with internal medicated oils to nourish and regenerate degenerated cervical spinal discs and relieve compression.',
      benefits: ['Nourishes spinal discs', 'Slows disc degeneration', 'Relieves neck & arm numbness']
    },
    {
      name: 'Bone Alignment',
      subtitle: 'Skeletal alignment therapy',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/spine-joint.jpg',
      dosha: 'Musculoskeletal Care',
      desc: 'Specialized Marma therapy and manual bone alignment techniques combined with strengthening herbal oils to correct postural imbalances.',
      benefits: ['Corrects postural deviations', 'Relieves joint misalignment pain', 'Strengthens supporting muscles']
    },
    {
      name: 'Fracture Management',
      subtitle: 'Post-fracture healing',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/spine-joint.jpg',
      dosha: 'Bone Strengthening',
      desc: 'Accelerated bone healing using Asthi-vriddhikar (bone-strengthening) herbs, medicated casts, and calcium-rich Ayurvedic preparations.',
      benefits: ['Accelerates bone healing', 'Strengthens bone density', 'Reduces post-fracture stiffness']
    },
    {
      name: 'Scoliosis',
      subtitle: 'Spinal curvature correction',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/basti_enema.png',
      dosha: 'Spinal & Postural Care',
      desc: 'Therapeutic Yoga, specialized spinal therapies, Kati Basti, and herbal oils to manage and improve spinal curvature in scoliosis.',
      benefits: ['Improves spinal curvature', 'Relieves associated back pain', 'Strengthens paraspinal muscles']
    },
    {
      name: 'Frozen Shoulder',
      subtitle: 'Adhesive capsulitis',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/basti_enema.png',
      dosha: 'Shoulder Joint Care',
      desc: 'Amsana Basti, deep-penetrating medicated oils, and targeted physiotherapy-combined Ayurvedic treatment to restore shoulder mobility.',
      benefits: ['Restores shoulder range of motion', 'Reduces shoulder joint stiffness', 'Relieves chronic shoulder pain']
    },
    {
      name: 'Diabetic Care',
      subtitle: 'Diabetes management',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/metabolic_care.png',
      dosha: 'Metabolic Balancing',
      desc: 'Comprehensive Ayurvedic management of Type 2 diabetes using Meha-hara herbs, Panchakarma detox, and strict dietary counseling.',
      benefits: ['Regulates blood sugar levels', 'Improves insulin sensitivity', 'Prevents diabetic complications']
    },
    {
      name: 'Diabetic Neuropathy',
      subtitle: 'Nerve damage from diabetes',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/basti_enema.png',
      dosha: 'Nerve & Metabolic Care',
      desc: 'Specialized nerve-rejuvenating treatments using Basti therapy and Medhya Rasayana herbs to repair and protect nerve endings damaged by diabetes.',
      benefits: ['Reduces tingling & burning sensation', 'Improves nerve conduction', 'Protects remaining nerve tissue']
    },
    {
      name: 'Cholesterol Care',
      subtitle: 'Lipid management',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/vamana_virechana_detox.png',
      dosha: 'Cardiovascular & Lipid Care',
      desc: 'Medohar (fat-reducing) herbs, Virechana therapy, and dietary protocol to reduce bad cholesterol (LDL) and improve cardiovascular health.',
      benefits: ['Reduces LDL cholesterol', 'Improves HDL levels', 'Prevents arterial plaque buildup']
    },
    {
      name: 'Fatty Liver',
      subtitle: 'Hepatic fat management',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/vamana_virechana_detox.png',
      dosha: 'Liver & Digestive Care',
      desc: 'Liver-cleansing herbal formulations and Virechana to detoxify the liver, reduce fat accumulation, and restore healthy hepatic function.',
      benefits: ['Reduces liver fat accumulation', 'Restores healthy liver enzymes', 'Improves digestion & metabolism']
    },
    {
      name: 'BP Care',
      subtitle: 'Blood pressure management',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/shirodhara_oil.png',
      dosha: 'Cardiovascular Care',
      desc: 'Shirodhara, stress-reduction protocols, heart-balancing herbs (Sarpagandha, Arjuna) and dietary counseling for managing hypertension naturally.',
      benefits: ['Reduces systolic & diastolic BP', 'Calms the nervous system', 'Reduces stress-induced hypertension']
    },
    {
      name: 'Paediatric Section',
      subtitle: 'Children\'s Ayurvedic care',
      dosha: 'Kaumarabhritya (Child Care)',
      desc: 'Specialized gentle Ayurvedic treatments for children — Abhyanga, Nasya, and Bala Rasayana herbs for growth, immunity, and pediatric ailments.',
      benefits: ['Boosts childhood immunity', 'Improves growth & development', 'Treats pediatric respiratory issues']
    },
    {
      name: 'Chicken Pox Care',
      subtitle: 'Post-viral recovery',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/psoriasis_dermatology.png',
      dosha: 'Skin & Immune Recovery',
      desc: 'Ayurvedic management of chicken pox and post-viral recovery using blood-purifying herbs, cooling treatments, and scar-preventing skin protocols.',
      benefits: ['Reduces viral spread & severity', 'Prevents post-pox scarring', 'Accelerates full recovery']
    },
    {
      name: 'Infertility (Men & Women)',
      subtitle: 'Fertility enhancement',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/womens_health.png',
      dosha: 'Reproductive Wellness',
      desc: 'Deep Shukra and Artava Dhatu nourishing protocol using Vajikarana Rasayana herbs, Panchakarma, and targeted fertility treatments for both partners.',
      benefits: ['Improves sperm quality & count', 'Regulates ovulation in women', 'Enhances overall reproductive health']
    },
    {
      name: 'Sexual Related Issues',
      subtitle: 'Sexual health & wellness',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/womens_health.png',
      dosha: 'Vajikarana (Reproductive)',
      desc: 'Confidential Vajikarana (aphrodisiac) therapy using classical herbs and treatments to restore sexual vitality, stamina, and hormonal balance.',
      benefits: ['Restores sexual vitality', 'Balances reproductive hormones', 'Improves stamina & confidence']
    },
    {
      name: 'Libido Enhancement',
      subtitle: 'Desire & vitality restoration',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/basti_enema.png',
      dosha: 'Vajikarana (Reproductive)',
      desc: 'Tailored herbal Rasayana and Basti therapy to restore natural libido, address hormonal imbalances, and rejuvenate reproductive tissue.',
      benefits: ['Naturally restores libido', 'Balances sex hormones', 'Rejuvenates reproductive tissues']
    },
    {
      name: 'Migraine',
      subtitle: 'Chronic headache management',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/nasya_therapy.png',
      dosha: 'Pitta & Vata Balancing',
      desc: 'Nasya therapy, Shirodhara, and Pitta-pacifying internal medications to reduce migraine frequency, intensity, and associated sensitivity.',
      benefits: ['Reduces migraine frequency', 'Relieves throbbing head pain', 'Reduces light & sound sensitivity']
    },
    {
      name: 'PCOD & PCOS',
      subtitle: 'Hormonal imbalance in women',
      dosha: 'Women\'s Hormonal Care',
      desc: 'Hormonal balancing treatments using Stanya and Artava vriddhikar herbs, Virechana, Uttara Basti, and strict dietary counseling for PCOD/PCOS management.',
      benefits: ['Regulates menstrual cycles', 'Reduces ovarian cysts', 'Balances hormonal levels naturally']
    },
    {
      name: 'Endometriosis',
      subtitle: 'Uterine tissue management',
      dosha: 'Women\'s Reproductive Care',
      desc: 'Classical Ayurvedic management of endometriosis using Uttara Basti, anti-inflammatory herbs, and Vata-Pitta balancing protocols.',
      benefits: ['Reduces endometrial tissue growth', 'Relieves severe menstrual pain', 'Improves fertility outcomes']
    },
    {
      name: 'White Discharge (Leucorrhoea)',
      subtitle: 'Vaginal discharge treatment',
      dosha: 'Women\'s Gynaecological Care',
      desc: 'Treatment of abnormal vaginal discharge using Kapha-Pitta balancing herbs, Yoni Pichu, and Uttara Basti to restore healthy vaginal flora.',
      benefits: ['Reduces abnormal discharge', 'Restores healthy vaginal pH', 'Prevents recurrent infections']
    },
    {
      name: 'Cosmetology',
      subtitle: 'Beauty & skin enhancement',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/psoriasis_dermatology.png',
      dosha: 'Skin Radiance & Beauty',
      desc: 'Natural Ayurvedic cosmetology treatments using herbal face packs, Mukhaabhyanga, and Varnya (complexion-enhancing) herbs for glowing skin.',
      benefits: ['Improves skin radiance & glow', 'Reduces dark spots & blemishes', 'Anti-aging & skin firming']
    },
    {
      name: 'Dermatology',
      subtitle: 'Skin disease treatment',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/psoriasis_dermatology.png',
      dosha: 'Skin & Blood Purification',
      desc: 'Treatment of chronic skin diseases like eczema, urticaria, and contact dermatitis using Panchakarma blood purification and herbal protocols.',
      benefits: ['Treats chronic skin diseases', 'Purifies blood of skin toxins', 'Prevents skin disease recurrence']
    },
    {
      name: 'Nethra Chikithsa',
      subtitle: 'Classical eye care',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/netra_tarpana_eye.png',
      dosha: 'Eye Care (Netra)',
      desc: 'Specialized Ayurvedic eye therapies including Netra Tarpana, Anjana, and Pindi to strengthen vision, treat eye diseases, and reduce strain.',
      benefits: ['Strengthens eyesight', 'Treats dry eyes & strain', 'Manages early-stage eye conditions']
    },
    {
      name: 'Karna Chikithsa',
      subtitle: 'Classical ear care',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/karna_purana_ear.png',
      dosha: 'Ear Care (Karna)',
      desc: 'Ayurvedic ear care using Karna Purana (medicated oil ear drops), Dhoopana, and herbal fumigation to treat earaches, tinnitus, and hearing issues.',
      benefits: ['Relieves ear pain & tinnitus', 'Improves hearing function', 'Clears ear canal blockages']
    },
    {
      name: 'Dandruff Treatment',
      subtitle: 'Scalp & hair care',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/shirodhara_oil.png',
      dosha: 'Hair & Scalp Care',
      desc: 'Medicated Shirobhyanga, Takradhara, and anti-fungal herbal hair packs to eliminate dandruff, nourish the scalp, and strengthen hair roots.',
      benefits: ['Eliminates dandruff completely', 'Nourishes scalp & hair follicles', 'Prevents hair loss from dandruff']
    },
    {
      name: 'De-Tan Treatment',
      subtitle: 'Skin brightening therapy',
      dosha: 'Skin Care & Brightening',
      desc: 'Herbal Ubtan and Varnya herb combinations to remove sun tan, brighten skin tone, and restore the skin\'s natural luminosity.',
      benefits: ['Removes sun tan effectively', 'Brightens & evens skin tone', 'Reduces UV-induced pigmentation']
    },
    {
      name: 'Rejuvenation Therapy',
      subtitle: 'Rasayana anti-aging',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/abhyanga_massage.png',
      dosha: 'Anti-Aging & Vitality',
      desc: 'Comprehensive Rasayana (rejuvenation) programme using classical anti-aging herbs, Panchakarma, Abhyanga, and Rasayana dietary protocols.',
      benefits: ['Slows cellular aging process', 'Rejuvenates body & mind completely', 'Boosts vitality, immunity & longevity']
    },
    {
      name: 'Weight Loss Treatment',
      subtitle: 'Medohar (fat reduction)',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/udvartana_scrub.png',
      dosha: 'Weight & Metabolism',
      desc: 'Kapha-balancing Panchakarma with Udvartana, Medohar herbs, and strict dietary counseling for sustainable, healthy weight loss.',
      benefits: ['Reduces excess body fat', 'Boosts metabolism naturally', 'Prevents weight regain with lifestyle changes']
    },
    {
      name: 'Weight Gain Treatment',
      subtitle: 'Brimhana (nourishing) therapy',
      image: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/udvartana_scrub.png',
      dosha: 'Nourishing & Strengthening',
      desc: 'Brimhana (nourishing) protocol using Ashwagandha, Shatavari, medicated ghee, and muscle-building herbal preparations for healthy weight gain.',
      benefits: ['Promotes healthy muscle mass gain', 'Improves nutrient absorption', 'Strengthens body tissues (Dhatus)']
    },
  ]
};

// Group special treatments into sub-categories for display
const specialTreatmentGroups = [
  {
    groupName: 'Anorectal & Digestive',
    groupMl: 'ദഹനസംബന്ധമായ',
    ids: ['Piles (Arsha)', 'Fissure', 'Fistula (Bhagandara)', 'IBS (Irritable Bowel Syndrome)']
  },
  {
    groupName: 'Spine, Joint & Ortho',
    groupMl: 'അസ്ഥി & സന്ധി',
    ids: ['Sciatica', 'Cervical Spondylitis', 'Cervical Spondylosis', 'Bone Alignment', 'Fracture Management', 'Scoliosis', 'Frozen Shoulder']
  },
  {
    groupName: 'Lifestyle & Metabolic',
    groupMl: 'ജീവിതശൈലി',
    ids: ['Diabetic Care', 'Diabetic Neuropathy', 'Cholesterol Care', 'Fatty Liver', 'BP Care', 'Weight Loss Treatment', 'Weight Gain Treatment']
  },
  {
    groupName: 'Women\'s Health',
    groupMl: 'സ്ത്രീരോഗങ്ങൾ',
    ids: ['PCOD & PCOS', 'Endometriosis', 'White Discharge (Leucorrhoea)', 'Infertility (Men & Women)', 'Sexual Related Issues', 'Libido Enhancement']
  },
  {
    groupName: 'Skin, Hair & Beauty',
    groupMl: 'ചർമ്മ & കേശം',
    ids: ['Psoriasis', 'Allergy', 'Cosmetology', 'Dermatology', 'Dandruff Treatment', 'De-Tan Treatment']
  },
  {
    groupName: 'Specialized & Children',
    groupMl: 'ബാലരോഗം & മറ്റ്',
    ids: ['Kidney Stone', 'Migraine', 'Paediatric Section', 'Chicken Pox Care', 'Rejuvenation Therapy', 'Nethra Chikithsa', 'Karna Chikithsa']
  },
];

function TreatmentIllustration({ name, fallback }: { name: string; fallback: string }) {
  const baseClass = "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105";
  
  if (name === 'Piles (Arsha)') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-red-50 to-primary-dark/10 flex items-center justify-center relative overflow-hidden transition-all duration-700 group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-accent-gold drop-shadow-md">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
          <path d="M50,15 C58,35 68,45 68,60 C68,75 58,80 50,80 C42,80 32,75 32,60 C32,45 42,35 50,15 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50,30 C54,42 60,50 60,60 C60,70 54,72 50,72 C46,72 40,70 40,60 C40,50 46,42 50,30 Z" fill="currentColor" className="text-primary-dark opacity-20" />
          <circle cx="50" cy="65" r="4" fill="currentColor" className="text-accent-gold animate-pulse" />
          <circle cx="45" cy="55" r="2" fill="currentColor" className="text-primary-dark" />
          <circle cx="55" cy="55" r="2" fill="currentColor" className="text-primary-dark" />
          <path d="M50,80 C50,80 55,75 58,78 C60,80 57,83 50,80" fill="currentColor" className="text-earth" />
          <path d="M50,80 C50,80 45,75 42,78 C40,80 43,83 50,80" fill="currentColor" className="text-earth" />
        </svg>
      </div>
    );
  }
  
  if (name === 'Fissure') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-amber-50 to-primary-dark/10 flex items-center justify-center relative overflow-hidden transition-all duration-700 group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-accent-gold drop-shadow-md">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
          <path d="M35,30 Q45,50 35,70" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M65,30 Q55,50 65,70" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="40" y1="38" x2="60" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 1" />
          <line x1="38" y1="50" x2="62" y2="50" stroke="currentColor" strokeWidth="2" />
          <line x1="40" y1="62" x2="60" y2="58" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 1" />
          <circle cx="50" cy="50" r="6" fill="currentColor" className="text-primary-dark opacity-10 animate-ping" />
          <circle cx="50" cy="50" r="3" fill="currentColor" className="text-earth" />
        </svg>
      </div>
    );
  }

  if (name === 'Fistula (Bhagandara)') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-orange-50 to-primary-dark/10 flex items-center justify-center relative overflow-hidden transition-all duration-700 group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-accent-gold drop-shadow-md">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
          <path d="M30,50 C40,30 60,30 70,50 C60,70 40,70 30,50 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" className="opacity-60" />
          <path d="M50,20 C65,20 65,80 50,80 C35,80 35,20 50,20" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="20" r="3" fill="currentColor" className="text-earth" />
          <circle cx="50" cy="50" r="4" fill="currentColor" className="text-primary-dark animate-pulse" />
          <path d="M50,80 L52,85 L48,85 Z" fill="currentColor" className="text-earth" />
        </svg>
      </div>
    );
  }

  if (name === 'IBS (Irritable Bowel Syndrome)') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-primary-dark/10 flex items-center justify-center relative overflow-hidden transition-all duration-700 group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-accent-gold drop-shadow-md">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
          <path d="M30,35 C30,30 45,28 50,33 C55,28 70,30 70,35 C70,42 60,45 50,42 C40,45 30,42 30,35 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M30,35 C20,35 22,55 35,55 C40,55 45,50 50,55 C55,50 60,55 65,55 C78,55 80,35 70,35" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M35,55 C35,65 45,68 50,62 C55,68 65,65 65,55" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50,62 L50,75" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="45" r="8" fill="currentColor" className="text-primary-dark opacity-10 animate-pulse" />
          <circle cx="50" cy="45" r="4" fill="currentColor" className="text-earth" />
        </svg>
      </div>
    );
  }

  if (name === 'PCOD & PCOS') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-pink-50 to-primary-dark/10 flex items-center justify-center relative overflow-hidden transition-all duration-700 group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-accent-gold drop-shadow-md">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
          <path d="M50,25 C30,25 25,45 25,50 C25,65 40,75 50,75 C60,75 75,65 75,50 C75,45 70,25 50,25 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50,38 C46,48 40,52 50,62 C60,52 54,48 50,38 Z" fill="currentColor" className="text-primary-dark opacity-20" />
          <circle cx="50" cy="52" r="3" fill="currentColor" className="text-earth" />
          <circle cx="28" cy="45" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="72" cy="45" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="28" cy="45" r="2" fill="currentColor" className="text-accent-gold animate-ping" />
          <circle cx="72" cy="45" r="2" fill="currentColor" className="text-accent-gold animate-ping" />
        </svg>
      </div>
    );
  }

  if (name === 'Endometriosis') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-rose-50 to-primary-dark/10 flex items-center justify-center relative overflow-hidden transition-all duration-700 group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-accent-gold drop-shadow-md">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
          <path d="M50,30 Q30,40 30,55 Q30,70 50,75 Q70,70 70,55 Q70,40 50,30" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M45,45 C45,45 50,42 55,45 C55,45 52,55 45,45" fill="currentColor" className="text-primary-dark opacity-30" />
          <path d="M55,55 C55,55 50,58 45,55 C45,55 48,45 55,55" fill="currentColor" className="text-earth opacity-80" />
          <circle cx="50" cy="50" r="4" fill="currentColor" className="text-accent-gold animate-pulse" />
        </svg>
      </div>
    );
  }

  if (name === 'White Discharge (Leucorrhoea)') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-teal-50 to-primary-dark/10 flex items-center justify-center relative overflow-hidden transition-all duration-700 group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-accent-gold drop-shadow-md">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
          <path d="M50,25 Q65,45 50,75 Q35,45 50,25 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="5" fill="currentColor" className="text-primary-dark opacity-20" />
          <circle cx="50" cy="50" r="2" fill="currentColor" className="text-earth" />
          <path d="M40,75 Q50,70 60,75" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M45,80 Q50,77 55,80" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (name === 'Paediatric Section') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-primary-dark/10 flex items-center justify-center relative overflow-hidden transition-all duration-700 group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-accent-gold drop-shadow-md">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
          <path d="M50,75 L50,40" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50,55 Q35,45 35,35 Q50,42 50,55" fill="currentColor" className="text-primary-dark opacity-35" />
          <path d="M50,48 Q65,38 65,28 Q50,35 50,48" fill="currentColor" className="text-earth" />
          <circle cx="50" cy="75" r="4" fill="currentColor" className="text-accent-gold" />
          <circle cx="30" cy="30" r="8" fill="currentColor" className="text-accent-gold opacity-10 animate-pulse" />
        </svg>
      </div>
    );
  }

  if (name === 'De-Tan Treatment') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-primary-dark/10 flex items-center justify-center relative overflow-hidden transition-all duration-700 group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-accent-gold drop-shadow-md">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
          <path d="M50,30 L50,20 M50,70 L50,80 M30,50 L20,50 M70,50 L80,50 M36,36 L28,28 M64,64 L72,72 M36,64 L28,72 M64,36 L72,28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-60" />
          <path d="M50,35 C42,35 35,42 35,50 C35,58 42,65 50,65" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50,35 C58,35 65,42 65,50 C65,58 58,65 50,65" fill="currentColor" className="text-primary-dark opacity-20" />
          <circle cx="50" cy="50" r="4" fill="currentColor" className="text-accent-gold animate-ping" />
          <circle cx="50" cy="50" r="2" fill="currentColor" className="text-earth" />
        </svg>
      </div>
    );
  }

  return (
    <img 
      src={fallback || 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/treatment-room-1.jpg'} 
      alt={name} 
      className={baseClass} 
    />
  );
}

export default function TreatmentTabs() {
  const lang = useLang();
  const ml = lang === 'ml';
  const [activeTab, setActiveTab] = useState('special-treatments');
  const [selectedTreatment, setSelectedTreatment] = useState<any | null>(null);
  const [activeGroup, setActiveGroup] = useState('Anorectal & Digestive');

  // Handle URL syncing after hydration to prevent SSR mismatch
  useEffect(() => {
    // 1. Initial sync from URL on mount
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    const groupParam = params.get('group');
    const hash = window.location.hash.replace('#', '');
    const id = tabParam || hash;

    if (id && categories.some(cat => cat.id === id)) {
      setActiveTab(id);
    }
    if (groupParam && specialTreatmentGroups.some(g => g.groupName === groupParam)) {
      setActiveGroup(groupParam);
    }
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      const groupParam = params.get('group');
      const hash = window.location.hash.replace('#', '');
      const id = tabParam || hash;

      if (id && categories.some(cat => cat.id === id)) {
        setActiveTab(id);
      } else {
        setActiveTab('special-treatments');
      }

      if (groupParam && specialTreatmentGroups.some(g => g.groupName === groupParam)) {
        setActiveGroup(groupParam);
      } else {
        setActiveGroup('Anorectal & Digestive');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabClick = (id: string) => {
    // Update state immediately — do NOT rely on URL round-trip
    setActiveTab(id);
    if (id !== 'special-treatments') {
      // Don't reset group when switching tabs back to special
    }
    const params = new URLSearchParams(window.location.search);
    params.set('tab', id);
    if (id !== 'special-treatments') {
      params.delete('group');
    }
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  const handleGroupClick = (groupName: string) => {
    setActiveGroup(groupName);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', 'special-treatments');
    params.set('group', groupName);
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  const isSpecial = activeTab === 'special-treatments';

  const filteredSpecialTreatments = isSpecial
    ? (treatments['special-treatments'] as any[]).filter(t =>
        specialTreatmentGroups.find(g => g.groupName === activeGroup)?.ids.includes(t.name)
      )
    : [];

  return (
    <div className="space-y-10">
      {/* Main Category Tabs */}
      <div className="relative z-50 flex overflow-x-auto no-scrollbar md:flex-wrap md:justify-center gap-2 md:gap-4 border-b border-accent-gold/20 pb-4 snap-x">
        {categories.map(cat => (
          <button
            type="button"
            key={cat.id}
            onClick={() => handleTabClick(cat.id)}
            className={`px-5 py-3 text-base transition-all duration-300 relative whitespace-nowrap snap-center flex items-center gap-2 rounded-t-lg cursor-pointer ${
              activeTab === cat.id
                ? 'text-primary-dark font-bold bg-accent-gold/10 border-b-2 border-accent-gold'
                : 'text-text-muted hover:text-primary hover:bg-primary-dark/5'
            }`}
          >
            <span>{ml ? cat.ml : cat.label}</span>
          </button>
        ))}
      </div>

      {/* Sub-category tabs for Special Treatments */}
      {isSpecial && (
        <div className="relative z-10 flex overflow-x-auto no-scrollbar gap-2 justify-start md:justify-center px-4 md:px-0 snap-x">
          {specialTreatmentGroups.map(group => (
            <button
              type="button"
              key={group.groupName}
              onClick={() => handleGroupClick(group.groupName)}
              className={`flex items-center justify-center px-4 py-2 md:px-6 md:py-2.5 text-sm md:text-base rounded-full border transition-all duration-300 flex-shrink-0 snap-center whitespace-nowrap cursor-pointer ${
                activeGroup === group.groupName
                  ? 'bg-primary-dark text-background-parchment border-primary-dark font-bold shadow-lg'
                  : 'bg-white text-text-muted border-accent-gold/20 hover:border-accent-gold hover:text-primary-dark hover:bg-accent-gold/5'
              }`}
            >
              {ml ? group.groupMl : group.groupName}
            </button>
          ))}
        </div>
      )}

      {/* Content Grid */}
      <div className="min-h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(isSpecial ? filteredSpecialTreatments : treatments[activeTab as keyof typeof treatments]).map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow-md border-t-2 border-primary-dark/10 hover:border-accent-gold transition-all duration-300 group flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 rounded-lg"
            >
              <div className="space-y-3 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="text-[10px] font-sans uppercase tracking-widest bg-accent-gold/10 text-accent-gold font-bold px-2.5 py-1 rounded-full border border-accent-gold/20">
                    {item.dosha}
                  </span>
                </div>
                <h3 className="text-xl text-primary-dark group-hover:text-accent-gold transition-colors duration-300 font-bold">{item.name}</h3>
                <p className="text-xs font-sans text-text-muted italic">{item.subtitle}</p>
                <p className="text-text-muted font-sans text-sm leading-relaxed line-clamp-3 mb-2">{item.desc}</p>
                
                <div className="mt-auto pt-4 border-t border-accent-gold/10 flex justify-between items-center">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-earth">{ml ? 'ഹോസ്പിറ്റൽ തെറാപ്പി' : 'Hospital Therapy'}</span>
                  <button
                    onClick={() => setSelectedTreatment(item)}
                    className="text-primary font-bold text-sm hover:text-accent-gold transition-colors duration-300 flex items-center gap-1"
                  >
                    {ml ? 'വിശദാംശങ്ങൾ ➔' : 'Details ➔'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Treatment Protocol Timeline — only for non-special tabs */}
      {!isSpecial && (
        <div className="bg-primary-dark/5 p-8 md:p-12 rounded-2xl border border-accent-gold/20 space-y-8 mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-accent-gold font-sans uppercase tracking-[0.2em] text-xs font-bold block">{ml ? 'ചികിത്സാ പ്രോട്ടോക്കോൾ' : 'Treatment Protocol'}</span>
            <h3 className="text-3xl md:text-4xl text-primary-dark">{ml ? 'ചികിത്സയുടെ ക്രമം' : 'The Sequence of Treatment'}</h3>
            <p className="text-text-muted font-sans text-sm">
              {ml ? 'ഫലപ്രദമാകാൻ, ക്ലാസിക്കൽ ആയുർവേദ കർമ്മങ്ങൾ കൃത്യമായ ഒരു മൂന്ന്-ഘട്ട പ്രോട്ടോക്കോൾ പിന്തുടരുന്നു:' : 'To be highly effective, classical Ayurvedic karmas follow a precise, scientifically structured three-stage protocol:'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative mt-12">
            <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-accent-gold/20 -translate-y-1/2 z-0" />

            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-accent-gold flex flex-col items-center text-center relative z-10 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-accent-gold text-primary-dark text-xl flex items-center justify-center font-bold">1</div>
              <h4 className="text-2xl text-primary-dark">{ml ? 'പൂർവ്വകർമ്മ' : 'Purvakarma'}</h4>
              <span className="text-xs font-sans uppercase tracking-widest text-earth font-bold">{ml ? 'തയ്യാറെടുപ്പ് ഘട്ടം' : 'Preparatory Stage'}</span>
              <p className="text-text-muted font-sans text-sm leading-relaxed">
                {ml 
                 ? <span>ശരീരത്തിലെ വിഷാംശങ്ങളെ പുറംതള്ളാൻ <strong>സ്നേഹനം</strong> (ഓയിൽ മസാജ്), <strong>സ്വേദനം</strong> (വിയർപ്പിക്കൽ) എന്നീ പ്രക്രിയകളിലൂടെ ശരീരത്തെ തയ്യാറാക്കുന്നു.</span>
                 : <span>Preparing the body via <strong>Snehana</strong> (oleation) and <strong>Swedana</strong> (fomentation/sweating) to loosen deep-seated toxins and guide them to primary channels.</span>}
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-primary-dark flex flex-col items-center text-center relative z-10 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary-dark text-background-parchment text-xl flex items-center justify-center font-bold">2</div>
              <h4 className="text-2xl text-primary-dark">{ml ? 'പ്രധാന കർമ്മ' : 'Pradhana Karma'}</h4>
              <span className="text-xs font-sans uppercase tracking-widest text-earth font-bold">{ml ? 'ശുദ്ധീകരണ ഘട്ടം' : 'Elimination Stage'}</span>
              <p className="text-text-muted font-sans text-sm leading-relaxed">
                {ml
                 ? <span>നിങ്ങളുടെ പ്രധാന ദോഷ അസന്തുലിതാവസ്ഥ അടിസ്ഥാനമാക്കി അഞ്ച് പ്രത്യേക ശുദ്ധീകരണ പ്രവർത്തനങ്ങൾ (<strong>പഞ്ചകർമ്മം</strong>) ഉപയോഗിച്ച് ശരീരത്തിലെ കോശങ്ങളിലെ മാലിന്യങ്ങളെ നീക്കം ചെയ്യുന്നു.</span>
                 : <span>The actual elimination of toxins (<strong>Panchakarma</strong>) using the five specialized cleansing actions to flush out deep cellular wastes based on your primary dosha imbalance.</span>}
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-accent-gold flex flex-col items-center text-center relative z-10 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-accent-gold text-primary-dark text-xl flex items-center justify-center font-bold">3</div>
              <h4 className="text-2xl text-primary-dark">{ml ? 'പശ്ചാത് കർമ്മ' : 'Paschat Karma'}</h4>
              <span className="text-xs font-sans uppercase tracking-widest text-earth font-bold">{ml ? 'ചികിത്സാനന്തര പരിചരണം' : 'Post-Treatment Care'}</span>
              <p className="text-text-muted font-sans text-sm leading-relaxed">
                {ml
                 ? <span>ദഹനശേഷി (<strong>അഗ്നി</strong>) വീണ്ടെടുക്കുന്നതിനും ഊർജ്ജം വർദ്ധിപ്പിക്കുന്നതിനുമായി <strong>സംസർജ്ജന ക്രമം</strong> (ഭക്ഷണക്രമം പടിപടിയായി പുനരാരംഭിക്കൽ) ഉൾപ്പെടെയുള്ള ചികിത്സാനന്തര പരിചരണം.</span>
                 : <span>Post-treatment rehabilitation, including <strong>Samsarjana Krama</strong> (gradual reintroduction of diet) to rekindle the digestive fire (<strong>Agni</strong>) and build vitality.</span>}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedTreatment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-background-parchment max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl border border-accent-gold/30 flex flex-col relative transform transition-transform duration-300 scale-100">
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
                <p className="text-xs font-sans text-text-muted italic">
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
                        <svg className="text-accent-gold w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
                  href={`/appointment?treatment=${encodeURIComponent(selectedTreatment.name)}`}
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
