// SandLogic Case Study Data Structure
// This follows the exact structure with updated content

export const shunyalabsCaseStudyData = {
  metadata: {
    id: "shunya-labs-asr",
    companyName: "Shunya Labs",
    companyLogo: "/ShunyaLabs.png",
    date: "2026",
    readTime: "5 min read"
  },
  
  header: {
    mainTitle: "Shunya Labs + Vaani dataset: Speech to text for India and the World",
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
          text: "Shunya Labs is a research-forward voice AI company with state-of-the-art foundation models. We have used Vaani dataset's high-entropy, diverse audio samples to develop:",
        },
        {
          type: "bullets",
          items: [
            "**Pingala V1 Universal:** The most accurate model on the OpenASR leaderboard (3.10 WER), 48% better than the next best model.",
            "**One of a kind native mixed-token code-switch model** for Hinglish, capable of processing entire conversations through a single model and generating output in mixed tokens",
            "**200+ language support** with specialized, superior performance for Indic languages",
            "**1000x reduction in GPU training hours** through intelligent data selection"
          ]
        },
        {
          type: "paragraph",
          text: "The Vaani dataset's unique labeling of English words in both Latin and Devanagari scripts and high-entropy data, combined with rigorous geographic annotation standards, enabled Shunya Labs to solve two critical challenges: training effective models for low-resource languages and accurately capturing natural code-switching behavior.",
        }
      ]
    },

    {
      id: "challenge",
      title: "Problem Statements",
      type: "mixed",
      content: [
        {
          type: "paragraph",
          text: ""
        }
      ],
      subsections: [
        {
          id: "challenge1",
          title: "Challenge 1: Training for Low-Resource Languages",
          content: [
            {
              type: "paragraph",
              text: "ASR models fail to capture low-resource languages due to inadequate labeled data. Current models produce high error rate transcripts for Indic languages—making them effectively unusable in real-world applications."
            },
          ]
        },
        {
          id: "challenge2",
          title: "Challenge 2: Capturing Code-Switching Accurately",
          content: [
            {
              type: "paragraph",
              text: "Unlike English speakers who maintain monolingual conversations, native speakers of Hindi and other Indic languages naturally code-switch between English and their native language. Standard ASR models are monolingual—trained exclusively on single-language data—which means they cannot capture natural code-switching patterns. When these models encounter code-switched speech, they either force transcription into one language or produce inconsistent results, leading to around 30% WER on code-switch conversations. Attempting to solve this by combining two separate language models introduces significant latency and compounds errors, as context is lost when audio is segmented and processed through different models."
            },
          ]
        }
      ]
    },

    {
      id: "roleofvaani",
      title: "Role of Vaani",
      type: "mixed",
      content: [
        {
          type: "paragraph",
          text: "Combined with our **proprietary training algorithm**, the Vaani dataset helped us set a new standard for accuracy while producing one of a kind models. The foundation of the breakthrough came from Vaani's two unique characteristics:"
        },
      ],
      subsections: [
        {
          id: "role1",
          title: "Native Mixed-Token Training Capability",
          content: [
            {
              type: "paragraph",
              text: "Vaani labels English words within Hinglish speech in both Latin script and Devanagari transliteration, enabling us to train models on multilingual data that can understand natural code-switch patterns. This means Hinglish audio is processed within one model to natively produce mixed tokens—leading to better accuracy, low latency, and transcription that reflects how Indians actually speak Hindi, as pure monolingual Hindi is rarely used in natural conversation."
            },
          ]
        },
        {
          id: "role2",
          title: "High-Entropy, Diverse Dataset",
          content: [
            {
              type: "paragraph",
              text: "Vaani's incredible diversity of audio samples spans India's linguistic landscape with rigorous annotation standards (transcribed by linguists within a 20-50 km radius). This high-entropy training data enables our foundation models to generalize exceptionally across languages and use cases—hence our language support capabilities."
            },
          ]
        }
      ],
    },

    {
      id: "results",
      title: "Results", 
      type: "mixed",
      content: [
        {
          type: "paragraph",
          text: ""
        }
      ],
      subsections: [
        {
          id: "benchmark",
          title: "Accuracy: 3.10 WER — 48% Better than the Next Best Model",
          content: [
            {
              type: "paragraph",
              text: "Pingala V1 achieved the highest composite score on the OpenASR leaderboard, establishing a new standard for universal ASR accuracy.On the **LAHAJA benchmark**, a multi-accent Hindi dataset, the fine-tuned model demonstrated a clear superiority over existing models."
            },
            {
              type: "table",
              title: "Benchmark Performance:",
              headers: ["Test", "Shunya Labs Model WER"],
              rows: [
                ["SPGISpeech", "1.31"],
                ["VoxPopuli", "3.68"],
                [ "AMI", "4.12" ],
                [ "GigaSpeech", "4.95" ],
                [ "Earnings22", "5.09" ],
                [ "TedLium", "1.43" ],
                [ "LibreSpeech Clean", "0.71" ], 
                [ "LibreSpeech Other", "2.17"], 
                [ "Composite Score", "3.10" ],
              ],
              highlight: []
            },
            {
              type: "paragraph",
              text: "See full benchmarks: [shunyalabs.ai](https://www.shunyalabs.ai/benchmarks)"
            }
          ]
        },
        {
          id: "code-switch", 
          title: "The only Native Mixed-Token Code-Switch Hinglish Model",
          content: [
            {
              type: "paragraph",
              text: "Current Hindi models cannot handle code-switching—they either force transcription into a single language or require chunking audio to process through two separate models. Whisper, for example, either translates everything to one language or produces inconsistent results, failing to reliably preserve code-switching."
            },
            {
              type: "paragraph",
              text: "**Shunya Labs' breakthrough:** The first model worthy of how India speaks, with the ability to process entire conversations through a single model that natively generates mixed-language tokens."
            },
            {
              type: "paragraph",
              text: "Try it: [zero-code-switch](https://www.shunyalabs.ai/zero-code-switch)"
            },
          ]
        },
        {
          id: "world-class", 
          title: "World-Class Indic Language Support",
          content: [
            {
              type: "paragraph",
              text: "Specialized models deliver superior performance across Indic languages, addressing the low-resource language challenge that has plagued the industry."
            },
            {
              type: "paragraph",
              text: "Explore: [zero-indic](https://www.shunyalabs.ai/zero-indic)"
            },
          ]
        },
        {
          id: "language", 
          title: "200+ Languages Supported",
          content: [
            {
              type: "paragraph",
              text: "One of the highest language counts offered by any voice AI company globally, demonstrating the exceptional generalization capabilities enabled by Vaani's high-entropy training data."
            }
          ]
        },
        {
          id: "gpu", 
          title: "1000x Reduction in GPU Training Hours",
          content: [
            {
              type: "paragraph",
              text: "The proprietary training algorithm's intelligent data selection on high entropy datasets achieved high efficiency, making advanced ASR models economically viable at scale and much more accessible to train."
            }
          ]
        }
      ]
    },

    {
      id: "conclusion",
      title: "Conclusion",
      type: "text",
      content: [
        {
          type: "paragraph", 
          text: "Shunya Labs' training on Vaani datasets demonstrates that solving voice AI for low-resource languages and code-switching requires both innovative algorithms and exceptional training data."
        },
        {
          type: "paragraph",
          text: "**Key Takeaway:** Data quality and diversity matter. Vaani's high-entropy, accurately labeled data with transliteration was instrumental for achieving Pingala V1's state-of-the-art 3.10 WER and developing the industry's first native code-switch model for Hinglish."
        },
      ]
    }
  ]
};

// Export the schema for reference
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
      content1: [
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
