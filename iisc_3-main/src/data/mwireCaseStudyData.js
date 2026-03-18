// MWire Labs Case Study Data
export const mwireCaseStudyData = {
  metadata: {
    id: "mwire-garo-asr",
    companyName: "MWire Labs",
    companyLogo: "/assets/MWire-new.png",
    date: "2024",
    readTime: "6 min read"
  },
  
  header: {
    mainTitle: "Building Production-Grade Garo ASR with under 9% WER",
    subtitle: "Turning brittle research models into real-world edge deployments",
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
          text: "Developing speech technology for low-resource languages like Garo presents significant challenges due to the lack of diverse, high-quality audio data. Most existing models remain in the research phase, lacking the robustness required for actual deployment. MWire Labs tackled this by leveraging Project Vaani's extensive datasets, resulting in a production-grade Garo Automatic Speech Recognition (ASR) system that achieves an impressive < 9% Word Error Rate (WER). This breakthrough transforms Garo voice AI from a lab experiment into a reliable, real-world tool for its community."
        }
      ]
    },
    {
      id: "challenge",
      title: "The Challenge: Low-Resource Realities",
      type: "text",
      content: [
        {
          type: "paragraph",
          text: "Garo is a language spoken primarily in Northeast India. For AI developers, it's considered 'low-resource,' meaning there is very little digitized or transcribed audio available for model training. This leads to several issues:"
        },
        {
          type: "bullets",
          items: [
            "**Model Brittleness**: Models trained on small datasets fail when faced with different accents, noise levels, or colloquialisms.",
            "**Poor Generalization**: A system might work in a quiet lab but fails in a noisy market or over a phone line.",
            "**Limited Utility**: High error rates make the technology frustrating for native speakers to use."
          ]
        }
      ]
    },
    {
      id: "solution",
      title: "The Solution: Data-Driven Optimization with Vaani",
      type: "text",
      content: [
        {
          type: "paragraph",
          text: "The solution was simple but powerful: better data. MWire Labs identified Project Vaani as the ideal source for high-quality, spontaneous Garo speech. By training on thousands of hours of diverse, multi-speaker data from Vaani, they were able to cover the nuances of the language that smaller datasets miss."
        }
      ]
    },
    {
      id: "results",
      title: "Results: Breaking the 9% WER Barrier",
      type: "text",
      content: [
        {
          type: "paragraph",
          text: "The impact of the Vaani data was immediate. The resulting model didn't just improve; it became production-ready:"
        },
        {
          type: "bullets",
          items: [
            "**Benchmark Excellence**: Achieved a Word Error Rate (WER) of under 9%, a record for the Garo language.",
            "**Real-World Reliability**: The model demonstrated high accuracy across various edge devices and noisy environments.",
            "**Scalable Foundation**: The same methodology can now be applied to other low-resource Indian languages."
          ]
        }
      ]
    },
    {
      id: "impact",
      title: "Business & Community Impact",
      type: "text",
      content: [
        {
          type: "paragraph",
          text: "By achieving production-grade accuracy, MWire Labs has enabled a range of applications for the Garo community, from voice assistants to automated transcription services. This project proves that with the right data, linguistic barriers can be overcome, ensuring that the benefits of AI reach every corner of India."
        }
      ]
    }
  ]
};
