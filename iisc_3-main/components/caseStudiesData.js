// Case Studies Data
// This file contains all case study data for easy management and updates

export const caseStudiesData = [
  {
    id: 1,
    title: "Fine-Tuning Hindi ASR for Real-World Call Analytics Leveraging Vaani Dataset",
    companyName: "SandLogic",
    companyLogo: "/SandLogic.jpg",
    problemStatement: "Generic ASR systems fail to accurately transcribe spoken Hindi in call centers, with baseline Word Error Rates (WER) over 55%. This major issue renders call analytics unreliable and negatively impacts compliance, customer experience, and agent performance.",
    solution: "To solve this, SandLogic fine-tuned its proprietary 769M-parameter ASR model using a curated, multi-accent Hindi subset of the ARTPARK-IISc/Vaani dataset.",
    outcome: "This fine-tuning resulted in a significant improvement, with the model reducing WER by over 55% in a healthcare use case and 47% in digital services sales calls. On a standardized benchmark, it achieved a 21% relative WER reduction.",
    businessImpact: "This breakthrough transforms raw conversations into reliable, decision-grade intelligence. It enables fairer agent coaching, robust compliance monitoring, and deeper customer experience insights, proving the immense value of India-specific datasets for business.",
    readMoreLink: "/case-studies/sandlogic"
  },
  {
    id: 2,
    title: "Vaani’s large-scale and diverse speaker base helps in enhancing the overall performance of the voice conversion model across all standard evaluation metrics, enabling a 31% leap in voice naturalness for unseen, cross-lingual voice conversion.",
    companyName: "Spring Lab (IIT-Madras)",
    companyLogo: "/SpringLab.png",
    problemStatement: "Existing Zero-Shot Voice Conversion (VC) models are overly complex and fail to generalize effectively, struggling to maintain voice naturalness and identity when transferring across unseen languages.",
    solution: "Researchers from IIT Madras developed EZ-VC, a novel, simplified VC architecture, and trained it on a massive, diverse corpus, crucially including 3,790 hours of Vaani data from Bengali, Telugu, and Kannada.",
    outcome: "EZ-VC achieved state-of-the-art results in Zero-shot VC, including a +18% leap in naturalness (UTMOS) over baselines (Seed VC)  when transferring a voice to various languages and accents, providing superior cross-lingual generalization.",
    businessImpact: "This work validates that Vaani's large-scale, multi-lingual diversity is the key ingredient for building simpler, more robust VC models, providing a blueprint for developing inclusive and generalized voice AI for all Indian languages.",
    readMoreLink: "/case-studies/springlab"
  },
  {
    id: 3,
    title: "Shunya Labs + Google Vaani: Speech to text for India and the World",
    companyName: "Shunya Labs",
    companyLogo: "/ShunyaLabs.png",
    problemStatement: "Training ASRs for Low-Resource Languages. Capturing Code-Switching Accurately",
    solution: "The first model worthy of how India speaks, with the ability to process entire conversations through a single model that natively generates mixed-language tokens.",
    outcome: "Shunya Labs' training on Google Vaani datasets demonstrates that solving voice AI for low-resource languages and code-switching requires both innovative algorithms and exceptional training data.",
    businessImpact: "1000x Reduction in GPU Training Hours: The proprietary training algorithm's intelligent data selection on high entropy datasets achieved high efficiency, making advanced ASR models economically viable at scale and much more accessible to train.",
    readMoreLink: "/case-studies/shunyalabs"
  },
  {
    id: 4,
    title: "Project Vaani data enabled us to build a production-grade Garo ASR with under 9% WER, turning brittle research models into real-world edge deployments.",
    companyName: "MWire Labs",
    companyLogo: "/assets/MWire-new.png",
    problemStatement: "Building ASR for low-resource languages like Garo often results in brittle research models that fail in real-world edge deployments.",
    solution: "MWire Labs leveraged Project Vaani data to train a production-grade Garo ASR model, optimized for edge devices.",
    outcome: "Achieved a Word Error Rate (WER) of under 9%, a significant milestone for the Garo language, enabling reliable speech technology for its speakers.",
    businessImpact: "This proves that even low-resource languages can achieve high accuracy with quality India-specific data, opening doors for inclusive AI across diverse linguistic communities.",
    readMoreLink: "/case-studies/mwire"
  }
];

// Helper function to get case study by ID
export const getCaseStudyById = (id) => {
  return caseStudiesData.find(caseStudy => caseStudy.id === id)
}

// Helper function to get case studies by company
export const getCaseStudiesByCompany = (companyName) => {
  return caseStudiesData.filter(caseStudy => 
    caseStudy.companyName.toLowerCase().includes(companyName.toLowerCase())
  )
}
