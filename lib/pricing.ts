export interface TreatmentDetail {
  price: string
  numericBase: number
  note: string
  duration: string
}

export const TREATMENT_PRICING: Record<string, TreatmentDetail> = {
  "General Dentistry": {
    price: "₹1,000",
    numericBase: 1000,
    note: "Comprehensive dental checkup, digital X-rays & ultrasonic scaling/cleaning.",
    duration: "30–45 mins",
  },
  "Cosmetic Dentistry": {
    price: "₹8,000 onwards",
    numericBase: 8000,
    note: "Composite veneers, smile designing, aesthetic contouring & bonding.",
    duration: "45–60 mins",
  },
  "Teeth Whitening": {
    price: "₹5,000",
    numericBase: 5000,
    note: "Professional medical-grade in-office whitening (up to 8 shades brighter in 1 visit).",
    duration: "45 mins",
  },
  "Dental Implants": {
    price: "₹25,000 onwards",
    numericBase: 25000,
    note: "High-grade titanium implant fixture capped with custom porcelain/zirconia crown.",
    duration: "60 mins",
  },
  "Single Visit Root Canal Treatment": {
    price: "₹4,500",
    numericBase: 4500,
    note: "Painless rotary endodontic therapy with computer-controlled local anesthesia.",
    duration: "45 mins",
  },
  "Painless Dental Extractions": {
    price: "₹1,500 onwards",
    numericBase: 1500,
    note: "Atraumatic, gentle tooth extraction under precision local anesthesia.",
    duration: "30 mins",
  },
  "Teeth Straightening": {
    price: "₹35,000 onwards",
    numericBase: 35000,
    note: "Custom clear aligners & modern aesthetic braces with 3D digital planning.",
    duration: "45 mins",
  },
  "Pediatric Dentistry": {
    price: "₹1,200",
    numericBase: 1200,
    note: "Gentle child-friendly cavity prevention, fluoridation, and pediatric care.",
    duration: "30 mins",
  },
  "Emergency Visit": {
    price: "₹1,000",
    numericBase: 1000,
    note: "Prompt, same-day diagnosis and emergency relief for severe toothaches or injuries.",
    duration: "30 mins",
  },
  "Emergency Care": {
    price: "₹1,000",
    numericBase: 1000,
    note: "Prompt, same-day diagnosis and emergency relief for severe toothaches or injuries.",
    duration: "30 mins",
  },
  "Restorative Care": {
    price: "₹4,000 onwards",
    numericBase: 4000,
    note: "Tooth-colored aesthetic fillings, zirconia crowns, inlays & dental bridges.",
    duration: "45 mins",
  },
  "Teeth Scanning": {
    price: "₹1,500",
    numericBase: 1500,
    note: "State-of-the-art 3D intraoral digital optical scanning without messy impression putty.",
    duration: "20 mins",
  },
  "Laser Dentistry & Minor Surgery": {
    price: "₹3,500 onwards",
    numericBase: 3500,
    note: "Soft-tissue dental laser treatments, gingival contouring & minor surgical procedures.",
    duration: "30 mins",
  },
  "Other": {
    price: "Consultation ₹500",
    numericBase: 500,
    note: "In-depth clinical evaluation with Dr. Sheetal Pawar and personalized treatment roadmap.",
    duration: "30 mins",
  },
}

export const CLINIC_SERVICES_LIST = [
  "General Dentistry",
  "Cosmetic Dentistry",
  "Teeth Whitening",
  "Dental Implants",
  "Single Visit Root Canal Treatment",
  "Painless Dental Extractions",
  "Teeth Straightening",
  "Pediatric Dentistry",
  "Restorative Care",
  "Teeth Scanning",
  "Laser Dentistry & Minor Surgery",
  "Emergency Visit",
  "Other",
]
