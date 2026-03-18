// Case Studies Data
// This file contains all case study data for easy management and updates

export const caseStudiesData = [
  {
    id: 1,
    title: "Fine-Tuning Hindi ASR for Real-World Call Analytics Leveraging Vaani Dataset",
    companyName: "SandLogic",
    companyLogo: "/SandLogic.jpg", // Sample logo from public folder
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
  }
  // {
  //   id: 2,
  //   title: "Voice-Enabled Healthcare Solutions for Rural India",
  //   companyName: "HealthTech Innovations",
  //   companyLogo: "/IIScLogo.png", // Sample logo from public folder
  //   problemStatement: "Healthcare providers in rural areas struggle with language barriers when collecting patient information.",
  //   solution: "Developed voice-enabled patient intake system using Vaani's multilingual speech recognition capabilities.",
  //   outcome: "Reduced patient registration time by 40% and improved data accuracy by 35%.",
  //   businessImpact: "Enhanced healthcare accessibility and better patient outcomes in underserved regions.",
  //   readMoreLink: "https://docs.google.com/document/d/13TWvq6YRVt5qe0CI2cq5e1KaZhmdunik/edit?tab=t.0"
  // },
  // {
  //   id: 3,
  //   title: "Smart Education Platform for Regional Languages",
  //   companyName: "EduSpeak",
  //   companyLogo: null,
  //   problemStatement: "Students in non-English speaking regions face difficulties accessing quality educational content.",
  //   solution: "Created interactive learning platform with voice commands and responses in 12 Indian languages using Vaani dataset.",
  //   outcome: "Increased student engagement by 60% and improved learning outcomes by 45%.",
  //   businessImpact: "Democratized access to quality education across linguistic barriers.",
  //   readMoreLink: "https://docs.google.com/document/d/13TWvq6YRVt5qe0CI2cq5e1KaZhmdunik/edit?tab=t.0"
  // },
  // {
  //   id: 4,
  //   title: "Automated Customer Support for E-commerce",
  //   companyName: "ShopVoice",
  //   companyLogo: null,
  //   problemStatement: "E-commerce platforms struggle to provide customer support in multiple Indian languages.",
  //   solution: "Implemented multilingual voice-based customer support system powered by Vaani's speech recognition.",
  //   outcome: "Reduced support ticket resolution time by 50% and increased customer satisfaction by 30%.",
  //   businessImpact: "Improved customer experience and reduced operational costs.",
  //   readMoreLink: "https://docs.google.com/document/d/13TWvq6YRVt5qe0CI2cq5e1KaZhmdunik/edit?tab=t.0"
  // },
  // {
  //   id: 5,
  //   title: "Financial Services Voice Interface",
  //   companyName: "FinTalk",
  //   companyLogo: null,
  //   problemStatement: "Banking services need to be accessible to users who are more comfortable with regional languages.",
  //   solution: "Developed voice-enabled banking interface supporting 8 major Indian languages using Vaani's dataset.",
  //   outcome: "Increased digital banking adoption by 40% among non-English speakers.",
  //   businessImpact: "Expanded financial inclusion and improved user experience.",
  //   readMoreLink: "https://docs.google.com/document/d/13TWvq6YRVt5qe0CI2cq5e1KaZhmdunik/edit?tab=t.0"
  // },
  // {
  //   id: 6,
  //   title: "Agricultural Voice Assistant for Farmers",
  //   companyName: "AgriVoice",
  //   companyLogo: null,
  //   problemStatement: "Farmers in rural areas need access to agricultural information in their local languages.",
  //   solution: "Built voice-activated agricultural assistant providing weather, crop, and market information in regional languages.",
  //   outcome: "Helped 10,000+ farmers make informed decisions, increasing crop yield by 25%.",
  //   businessImpact: "Improved agricultural productivity and farmer livelihoods.",
  //   readMoreLink: "https://docs.google.com/document/d/13TWvq6YRVt5qe0CI2cq5e1KaZhmdunik/edit?tab=t.0"
  // },
  // {
  //   id: 7,
  //   title: "Government Services Voice Portal",
  //   companyName: "GovSpeak",
  //   companyLogo: null,
  //   problemStatement: "Citizens face language barriers when accessing government services online.",
  //   solution: "Created voice-enabled government services portal supporting 15+ Indian languages using Vaani dataset.",
  //   outcome: "Increased citizen engagement by 70% and reduced service delivery time by 45%.",
  //   businessImpact: "Enhanced government service accessibility and citizen satisfaction.",
  //   readMoreLink: "https://docs.google.com/document/d/13TWvq6YRVt5qe0CI2cq5e1KaZhmdunik/edit?tab=t.0"
  // },
  // {
  //   id: 8,
  //   title: "Media Content Localization Platform",
  //   companyName: "MediaLocal",
  //   companyLogo: null,
  //   problemStatement: "Media companies struggle to create content in multiple Indian languages efficiently.",
  //   solution: "Developed automated content localization platform with voice synthesis in regional languages.",
  //   outcome: "Reduced content creation time by 60% and expanded reach to 5x more language communities.",
  //   businessImpact: "Increased content accessibility and market reach for media companies.",
  //   readMoreLink: "https://docs.google.com/document/d/13TWvq6YRVt5qe0CI2cq5e1KaZhmdunik/edit?tab=t.0"
  // }
]

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
