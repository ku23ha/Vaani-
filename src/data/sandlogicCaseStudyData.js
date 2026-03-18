// SandLogic Case Study Data Structure
// This follows the exact structure with updated content

export const sandlogicCaseStudyData = {
  metadata: {
    id: "sandlogic-hindi-asr",
    companyName: "SandLogic Technologies",
    companyLogo: "/SandLogic.jpg",
    date: "2024",
    readTime: "8 min read"
  },
  
  header: {
    mainTitle: "Fine-Tuning Hindi ASR for Real-World Call Analytics Leveraging Vaani Dataset",
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
          text: "Call analytics is crucial for modern customer engagement, but its effectiveness in India is hindered by standard Automatic Speech Recognition (ASR) systems struggling with spoken Hindi's complexity. This leads to inaccurate transcriptions and unreliable analytics, directly impacting compliance, customer experience, and agent performance.To overcome this, SandLogic fine-tuned its proprietary ASR model using the Hindi subset of the Vaani dataset. The model, with 769 million parameters, achieved a significant **~21% relative WER reduction** on the LAHAJA benchmark. Its real-world performance was even more remarkable, reducing Word Error Rates (WER) by **~55% for a healthcare client** and **~47% for a digital services client**, far surpassing existing solutions. This breakthrough translates complex conversations into decision-grade intelligence, proving the immense commercial value of high-quality, India-specific datasets in unlocking AI's full potential for business."
      
        }
      ]
    },

    {
      id: "challenge",
      title: "The Challenge: Why Standard ASR Fails in Indian Call Centers",
      type: "text",
      content: [
        {
          type: "paragraph",
          text: "The reliability of call analytics platforms depends entirely on the accuracy of ASR transcripts. In India, baseline ASR systems often fail due to a unique combination of factors:"
        },
        {
          type: "bullets",
          items: [
            "**Regional Accent Diversity**: Hindi is not a monolith; accents vary significantly, and generic models cannot capture this nuance.",
            "**Spontaneous, Colloquial Speech**: Real conversations are messy, full of fillers (\"um,\" \"accha\"), pauses, and code-switching.",
            "**Noisy, Real-World Environments**: Call centers have background chatter and variable line quality, which degrades audio quality and leads to transcription errors."
          ]
        },
        {
          type: "paragraph",
          text: "This inaccuracy has direct and costly business consequences. It results in **failed analytics** from missed keywords, **compliance risks** from undetected \"zero-tolerance\" phrases, and **ineffective agent evaluation** due to unfair scoring. The high initial WERs of existing systems—for example, **0.567 and 0.559** for two enterprise clients—highlight the severity of this problem."
        }
      ]
    },

    {
      id: "solution", 
      title: "The Solution: Targeted Fine-Tuning with High-Quality Local Data",
      type: "text",
      content: [
        {
          type: "paragraph",
          text: "SandLogic hypothesized that adapting its production ASR model with an inclusive spontaneous speech dataset would solve this problem. The solution involved a single, focused intervention: fine-tuning SandLogic's proprietary ASR model, which has **769 million parameters** and a **Sequence-to-sequence Encoder–Decoder Transformer architecture**, using the **Vaani dataset**."
        },
        {
          type: "paragraph",
          text: "The **Vaani dataset**, a large-scale spontaneous speech corpus with **~27,750 hours of audio** across 103 Indian languages, was the key. From this, SandLogic carefully filtered **366 hours and 50 minutes** of clean, aligned Hindi audio-text pairs, covering **8 states and 51 districts**."
        },
        {
          type: "paragraph", 
          text: "This curated dataset ensured the model was trained on a wide range of Hindi accents, colloquialisms, and conversational patterns. The fine-tuning process involved **10,000 steps** with a decaying learning rate, resulting in a stable and progressive reduction in both loss and WER."
        }
      ]
    },

    {
      id: "results",
      title: "Results: A Quantifiable Leap in Transcription Accuracy", 
      type: "mixed",
      content: [
        {
          type: "paragraph",
          text: "The fine-tuned model's performance was measured against both a standardized public benchmark and real-world client data."
        }
      ],
      subsections: [
        {
          id: "benchmark",
          title: "Standardized Benchmark Performance (LAHAJA)",
          content: [
            {
              type: "paragraph",
              text: "On the **LAHAJA benchmark**, a multi-accent Hindi dataset, the fine-tuned model demonstrated a clear superiority over existing models."
            },
            {
              type: "table",
              title: "LAHAJA Benchmark Results",
              headers: ["Model", "Word Error Rate (WER)", "Relative Improvement"],
              rows: [
                ["[ARTPARK-IISc/whisper-medium-vaani-hindi](https://huggingface.co/ARTPARK-IISc/whisper-medium-vaani-hindi)", "0.2289", "-"],
                ["SandLogic Production ASR", "0.2018", "-"],
                ["Fine-tuned SandLogic ASR (with Vaani)", "0.1801", "~21% vs. ARTPARK Baseline"],
                ["", "", "~10% vs. SandLogic Baseline"]
              ],
              highlight: ["~21%" , "~10%", "0.1801"]
            },
            {
              type: "paragraph",
              text: "This **~21% relative WER reduction** on the LAHAJA benchmark confirms the generalized power of combining a strong production architecture with high-quality, targeted training data."
            }
          ]
        },
        {
          id: "client-performance", 
          title: "Real-World Client Performance",
          content: [
            {
              type: "paragraph",
              text: "The most critical test was deploying the model for actual client use cases, with the baseline being SandLogic's existing production ASR model."
            },
            {
              type: "table", 
              title: "Client Performance Results",
              headers: ["Client", "Current Model WER", "Fine-tuned WER", "Relative Error Reduction"],
              rows: [
                ["Healthcare Client", "0.567", "0.254", "~55%"],
                ["Digital Services", "0.559", "0.295", "~47%"]
              ],
              highlight: ["~55%", "~47%"]
            },
            {
              type: "paragraph",
              text: "These results are a powerful testament to the model's ability to handle noisy, real-world conditions and generalize consistently across different domains, far exceeding its existing production capabilities."
            }
          ]
        }
      ]
    },

    {
      id: "business-impact",
      title: "Business Impact: From Raw Audio to Actionable Intelligence",
      type: "text", 
      content: [
        {
          type: "paragraph",
          text: "The technical achievement of a lower WER translates directly into significant business outcomes:"
        },
        {
          type: "bullets",
          items: [
            "**Fairer & More Effective Agent Coaching**: Accurate transcripts allow managers to precisely score agent performance, providing targeted feedback that drives real improvement and boosts morale.",
            "**Proactive Compliance & Risk Reduction**: The system now reliably flags \"zero-tolerance\" phrases and mandatory disclosures, drastically reducing the risk of costly legal and reputational damage.",
            "**Authentic Customer Experience Insights**: Clean transcripts enable accurate detection of customer frustration, satisfaction, and other engagement signals, empowering teams to intervene proactively and enhance the customer experience.",
            "**Decision-Grade Analytics**: Management can now act with confidence on QA scores, automated call summaries, and sentiment trends, knowing the underlying data is reliable."
          ]
        }
      ]
    },

    {
      id: "vaani-significance",
      title: "The Vaani Significance", 
      type: "text",
      content: [
        {
          type: "paragraph",
          text: "This project serves as a powerful validation of the Vaani mission. It provides:"
        },
        {
          type: "bullets",
          items: [
            "**Proof of Commercial Value**: The case study demonstrates conclusively that the Vaani dataset is a commercially viable tool, delivering measurable ROI in industry-critical applications.",
            "**Blueprint for Cross-Sector Impact**: The validated gains in healthcare and sales strongly indicate the potential to generalize this success to other high-stakes B2C industries like finance and government services.",
            "**Catalyst for National AI Enablement**: This success story establishes that building and leveraging India-focused, multi-accent resources is key to unlocking AI adoption at a national scale."
          ]
        }
      ]
    },

    {
      id: "conclusion",
      title: "Conclusion: Better ASR is the Foundation for Better Business",
      type: "text",
      content: [
        {
          type: "paragraph", 
          text: "Inaccurate transcription is the bottleneck that chokes the potential of call analytics. By leveraging the Vaani dataset, SandLogic broke this bottleneck, transforming raw, unstructured customer–agent conversations into a stream of clean, reliable, and actionable intelligence."
        },
        {
          type: "paragraph",
          text: "This project proves a simple but powerful equation: **Better ASR → Better Call Analytics → Better Business Outcomes**. This capability directly drives:"
        },
        {
          type: "bullets",
          items: [
            "Higher compliance adherence",
            "Stronger customer experience and loyalty", 
            "Fairer and more effective agent evaluation",
            "Smarter, data-driven operational decisions"
          ]
        }
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
      subsections: [
        // Optional subsections with same structure
      ]
    }
  ]
};
