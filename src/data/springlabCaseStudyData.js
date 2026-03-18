export const springlabCaseStudyData = {
  metadata: {
    id: "springlab-zero-shot-cross-lingual-voice-conversion",
    companyName: "Spring Lab (IIT-Madras)",
    companyLogo: "/SpringLab.png",
    date: "2025",
    readTime: "5 min read"
  },

  header: {
    mainTitle: "EZ-VC: Unlocking Zero-Shot Cross-Lingual Voice Conversion with Vaani Dataset",
    //subtitle: "Leveraging Vaani Dataset",
    heroImage: null
  },

  sections: [
    {
      id: "summary",
      title: "Summary",
      type: "text",
      content: [
        {
          type: "paragraph",
          text: "Zero-Shot Voice Conversion (VC) is a fundamental challenge in Indic AI, as existing models struggle to generalize to unseen languages and accents. The SPRING Lab at IIT Madras developed **EZ-VC**, a novel, simplified VC architecture. By coupling a single self-supervised encoder with a non-autoregressive flow matching speech decoder, and training it on diverse data sources including **3,790 hours of multi-lingual Vaani speech**, EZ-VC successfully simplified the VC process. The model achieved **state-of-the-art results**, notably demonstrating a massive leap in naturalness (UTMOS) for **unseen languages like German and Spanish**. This success validates that Vaani’s **multi-lingual diversity** is essential for creating models that are robust and generalizable across linguistic boundaries. This work has been published at the [EMNLP 2025 Conference](https://aclanthology.org/2025.findings-emnlp.1077.pdf)",
        }
      ]
    },

    {
      id: "challenge",
      title: "The Challenge: Complexity and Generalization in Voice Conversion",
      type: "text",
        content: [
        {
          type: "paragraph",
          text: "Zero-shot VC aims to clone a speaker's voice instantly, but current methods suffer from two major limitations in the Indian context:"
        },
        {
          type: "bullets",
          items: [
            "**Feature Disentanglement Complexity**: Most high-performing VC models require multiple encoders to disentangle content from speaker characteristics, increasing architectural complexity, training time, and computational cost.",
            "**Failure in Cross-Lingual Generalization**: Models struggle to transfer a voice across languages, especially when one language or accent is unseen during training. This poses a critical challenge for serving India's diverse linguistic needs.",
            "**Data Scarcity**: Achieving cross-lingual performance requires exposure to massive linguistic diversity, which is often lacking in generic public datasets.",
          ]
        },
      ]
    },

    {
      id: "solution", 
      title: "The Solution: Simple Architecture and Data Diversity",
      type: "text",
      content: [
        {
          type: "paragraph",
          text: "The IIT Madras research team hypothesized that combining a powerful, pre-trained multilingual encoder with a state-of-the-art decoder, trained on linguistically diverse data, could eliminate the need for complex, multiple-encoder architectures."
        },
        {
          type: "bullets",
          items: [
            "**Simplified Architecture (EZ-VC)**: They used a single, 4,000-language-trained **Xeus SSL encoder** to extract universal content units (quantized using a 500-cluster k-means model) and paired it with a **Conditional Flow Matching (CFM) Decoder (F5-TTS)**. This design simplifies the task to a units-to-speech generation problem.",
            "**Data Strategy with Vaani**: The training data was built for maximum diversity, comprising **12,840 hours** of speech from English and 5 Indian languages. Crucially, **3,790 hours** of this data, spanning **Bengali, Telugu, and Kannada**, was sourced from the **Vaani dataset**. This large volume of diverse, spontaneous Indian language audio was fundamental to teaching the model robust, language-agnostic representations, enabling effective generalization to unseen languages.",
          ]
        },
        
      ]
    },

    {
      id: "results",
      title: "Results: Setting a New Standard for Naturalness and Transfer", 
      type: "mixed",
      content: [
        {
          type: "paragraph",
          text: "EZ-VC was benchmarked against leading open-source models, demonstrating consistent superiority in both naturalness and speaker similarity."
        },
        {
            type: "table",
            title: "Performance Results",
            headers: ["Metric (Source vs. Target Voice)", "Seed-VC", "EZ-VC (Ours)", "Absolute Δ", "Relative Improvement"],
            rows: [
            ["SSIM ↑", "0.69", "0.71", "+0.02", "+2.9 %"],
            ["NMOS ↑", "3.55", "3.91", "+0.36", "+10.1 %"],
            ["SMOS ↑", "3.78", "3.90", "+0.12", "+3.2 %"],
            ["UTMOS ↑", "3.02", "3.56", "+0.54", "+17.9 %"],
            ],
            highlight: ["0.69"]
        },
        {
            type: "paragraph",
            text: "The evaluation consists of diverse languages, accents, genders, and cross-lingual combinations, including both seen and unseen languages. EZ-VC outperforms Seed-VC across all metrics, achieving notable gains in SSIM (+2.9%), NMOS (+10.1%), SMOS (+3.2%), and UTMOS (+17.9%), demonstrating strong generalization enabled by training on diverse, multi-accent datasets, including Vaani."
        }
     ]
    },

    {
      id: "significance",
      title: "The Vaani Significance and Research Impact",
      type: "text",
      content: [
        {
          type: "paragraph", 
          text: "The success of EZ-VC represents a significant leap for the Indic AI research community:"
        },
        {
          type: "bullets",
          items: [
            "**Validation of Diversity**: The results conclusively prove that large-scale, linguistically diverse datasets like Vaani are essential for creating models that can generalize robustly across accents and languages.",
            "**Enabling Simpler Architectures**: By achieving state-of-the-art results with a simplified architecture, this work encourages further research into less complex, more efficient VC systems.", 
            "**Blueprint for Indic AI**: The strategic inclusion of **3,790 hours of Vaani data** (Bengali, Telugu, and Kannada) provided the necessary \"linguistic complexity buffer\" to enable strong cross-lingual transfer, accelerating the path toward accessible, high-quality voice technology for all of India's languages.",
          ]
        }
      ]
    },
    
    {
      id: "conclusion",
      title: "Conclusion: Simplicity and Scale as the Future of VC",
      type: "text",
      content: [
        {
          type: "paragraph", 
          text: "The EZ-VC project demonstrates that for zero-shot voice conversion, relatively simple architecture powered by large-scale, high-diversity data can achieve remarkable results. By leveraging the Vaani dataset, IIT Madras has not only set a new performance benchmark but also established a clear direction for developing highly generalized, efficient, and inclusive voice technologies for both global and Indian applications."
        },
      ]
    }
  ]
};

export const caseStudySchema = {
  metadata: {
    id: "string",
    companyName: "string", 
    companyLogo: "string (path)",
    date: "string",
    readTime: "string"
  },
  header: {
    mainTitle: "string",
    subtitle: "string", 
    heroImage: "string (optional)"
  },
  sections: [
    {
      id: "string",
      title: "string",
      type: "text | mixed",
      content: [
        {
          type: "paragraph | bullets | table | subheading",
          // ... type-specific properties
        }
      ],
      subsections: [
        // Optional subsections with same structure
      ]
    }
  ]
};