import React, { useState } from "react";
import { ChevronDown, ShieldCheck, Award, HeartHandshake, HelpCircle } from "lucide-react";

export default function FaqsAndFooter({ theme }) {
  const isDark = theme === "dark";
  const [openFaq, setOpenFaq] = useState(null);

  const faqsData = [
    {
      q: "Is Digital Sahayak authorised by railways?",
      a: "Yes, absolutely. Digital Sahayak is authorised by the Mumbai Central Division of Western Railway. We offer direct pre-booking services at Vapi, Vasai Road, and Valsad railway stations.",
    },
    {
      q: "How do I recognize my assigned Sahayak Porter?",
      a: "Every assigned Sahayak wears the official Western Railway red uniform, has a valid porter ID badge, and carries an electronic credentials slip matching the verified ID code shown on your booking status screen.",
    },
    {
      q: "Are the luggage prices really fixed?",
      a: "Yes. Our key benefit is eliminating bargaining stress. The pricing is entirely transparent and calculated by our system: Rs 100 base rate per standard bag (up to 20kg), Rs 50 overweight surcharge (21kg - 40kg), and Rs 150 for Senior Citizen / companion medical support.",
    },
    {
      q: "What happens if my train is delayed?",
      a: "No need to worry. Our AI Cognitive Agent continuously monitors train API feeds. If your train is delayed, the system automatically shifts the porter dispatch schedules, ensuring your porter is on the platform precisely when your coach arrives.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-12 mt-12 border-t pt-10 dark:border-slate-800">
      {/* Value Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-5xl mx-auto">
        <div className={`p-5 rounded-xl border flex flex-col items-center text-center ${isDark ? "bg-slate-900/30 border-cyan-950/40" : "bg-[#FDFCF9] border-amber-100"}`}>
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wide mb-1">Trained & Verified</h4>
          <p className="text-[11px] opacity-75">All porters undergo strict background verifications and physical tests.</p>
        </div>

        <div className={`p-5 rounded-xl border flex flex-col items-center text-center ${isDark ? "bg-slate-900/30 border-cyan-950/40" : "bg-[#FDFCF9] border-amber-100"}`}>
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wide mb-1">Fixed Transparent Rates</h4>
          <p className="text-[11px] opacity-75">Completely eliminates price negotiations. No surprises or hidden fees.</p>
        </div>

        <div className={`p-5 rounded-xl border flex flex-col items-center text-center ${isDark ? "bg-slate-900/30 border-cyan-950/40" : "bg-[#FDFCF9] border-amber-100"}`}>
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wide mb-1">Zero Waiting Time</h4>
          <p className="text-[11px] opacity-75">Pre-booked Sahayaks are assigned and await you directly beside your train coach.</p>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block mb-1">Got Questions?</span>
          <h3 className="text-xl font-extrabold tracking-tight font-sans">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3.5">
          {faqsData.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900/30 border-slate-800"
                    : "bg-[#FDFCF9] border-amber-100/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-sans cursor-pointer"
                >
                  <span className="text-xs font-bold leading-normal">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs opacity-80 leading-relaxed border-t dark:border-slate-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Authorized Footer Branding */}
      <footer className="text-center text-[10px] opacity-70 font-mono pt-6 pb-2 border-t dark:border-slate-900">
        <p>© {new Date().getFullYear()} Digital Sahayak Corporation. Authorized by Western Railway Division, Mumbai.</p>
        <p className="mt-1">Powered by AI Cognitive Loops & DSPy Optimizers.</p>
      </footer>
    </div>
  );
}
