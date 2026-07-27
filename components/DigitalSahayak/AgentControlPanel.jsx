import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Database, Cpu, Zap, Star, Send, Layers } from "lucide-react";

export default function AgentControlPanel({
  theme,
  pnrNumber,
  luggageCount,
  luggageWeight,
  selectedStation,
  selectedCoach,
  passengerName,
}) {
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("think"); // "sensor", "think", "act", "learn"

  // Continual learning states
  const [userRating, setUserRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState("");
  const [learningLog, setLearningLog] = useState("");
  const [isLearning, setIsLearning] = useState(false);

  // Trigger feedback learning cycle
  const triggerLearning = (e) => {
    e.preventDefault();
    setIsLearning(true);
    setLearningLog("Initializing Prompt Optimization Loop (DSPy BootstrapFewShot)...");

    setTimeout(() => {
      setLearningLog("Analyzing objective loss function... Target metrics: No bargaining, zero delays.");
    }, 1200);

    setTimeout(() => {
      setLearningLog(`Integrating passenger feedback: "${feedbackText || "Quick transit"}" with score ${userRating}/5.`);
    }, 2500);

    setTimeout(() => {
      setLearningLog("Calculating weight gradients... Updating PorterRoutePlanner prompting constraints.");
    }, 3800);

    setTimeout(() => {
      setLearningLog("PROMPT TUNING SUCCESSFUL: Instructions updated. Routing delay prediction error reduced by 4.2%!");
      setIsLearning(false);
    }, 5500);
  };

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-500 shadow-lg font-sans ${
        isDark
          ? "bg-slate-950 border-cyan-900/40 text-cyan-100"
          : "bg-white border-amber-200/60 text-slate-800"
      }`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
            <Cpu className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-md tracking-tight font-sans">
              Cognitive Loop Control Console
            </h3>
            <p className="text-xs opacity-75 font-mono">
              DSPy-Optimized Agentic Pipeline (Karpathy Discussion #525)
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-full">
          Self-Improving
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 mb-5 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border dark:border-slate-800">
        {[
          { id: "sensor", label: "1. SENSORS", icon: Database },
          { id: "think", label: "2. THINK", icon: Cpu },
          { id: "act", label: "3. ACTUATORS", icon: Zap },
          { id: "learn", label: "4. LEARN", icon: Star },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
                isActive
                  ? isDark
                    ? "bg-cyan-950/60 border border-cyan-800 text-cyan-300 shadow-md"
                    : "bg-white border border-amber-200 text-amber-950 shadow-sm"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="min-h-[14rem] relative">
        <AnimatePresence mode="wait">
          {activeTab === "sensor" && (
            <motion.div
              key="sensor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3 font-mono text-xs"
            >
              <p className="text-slate-400 text-[11px] mb-2 leading-relaxed">
                Observes passive environments & raw streams. Converts telemetry to formatted DSPy fields.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-900/40 border-slate-900" : "bg-slate-50 border-amber-100"}`}>
                  <span className="text-[10px] opacity-60 uppercase block">PNR Input Sensor</span>
                  <span className="font-bold text-emerald-500">{pnrNumber || "EMPTY (Awaiting User)"}</span>
                </div>
                <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-900/40 border-slate-900" : "bg-slate-50 border-amber-100"}`}>
                  <span className="text-[10px] opacity-60 uppercase block">Luggage Telemetry</span>
                  <span className="font-bold text-emerald-500">{luggageCount} bags / {luggageWeight} kg</span>
                </div>
                <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-900/40 border-slate-900" : "bg-slate-50 border-amber-100"}`}>
                  <span className="text-[10px] opacity-60 uppercase block">Station Gantry</span>
                  <span className="font-bold text-indigo-400">{selectedStation || "Not chosen"}</span>
                </div>
                <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-900/40 border-slate-900" : "bg-slate-50 border-amber-100"}`}>
                  <span className="text-[10px] opacity-60 uppercase block">Assigned Coach</span>
                  <span className="font-bold text-indigo-400">Coach {selectedCoach || "B1"}</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "think" && (
            <motion.div
              key="think"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">DSPy Prompt Declarations</span>
                <span className="text-[9px] text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/30">
                  BootstrapFewShot
                </span>
              </div>
              <div className={`p-3 rounded-xl border text-[11px] leading-relaxed overflow-x-auto ${isDark ? "bg-slate-900/40 border-slate-900" : "bg-slate-50 border-amber-100"}`}>
                <pre className="text-purple-400">
{`class PNRParserSignature(dspy.Signature):
    """Declarative signature mapping PNRs to Railway schedules"""
    pnr_number = dspy.InputField()
    passenger_name = dspy.InputField()

    parsed_train = dspy.OutputField(desc="Train details JSON dictionary")
    allocated_platform = dspy.OutputField(desc="Optimal pathing platform")`}
                </pre>
              </div>

              {/* Simulated Prediction logs */}
              <div className="p-3 rounded-xl border border-dashed dark:border-slate-800 bg-black/10">
                <div className="text-[10px] text-yellow-500 font-bold mb-1">⚡ Dynamic Execution Log</div>
                <div className="text-[11px] opacity-90 leading-tight">
                  {pnrNumber ? (
                    <>
                      <span className="text-slate-400">Predicting:</span> PNRParserSignature(pnr=&quot;{pnrNumber}&quot;) <br />
                      <span className="text-emerald-400 font-bold">↳ Predicted:</span> Train=&quot;VALSAD SF EXP #12929&quot;, Coach=&quot;{selectedCoach || "B1"}&quot;, Platform=3, Station=&quot;{selectedStation}&quot;
                    </>
                  ) : (
                    <span className="italic text-slate-500">Awaiting PNR entry to activate prediction log...</span>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "act" && (
            <motion.div
              key="act"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2.5 font-mono text-xs"
            >
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Actions executed by the agent. Outputs signals to digital gantries and WhatsApp notification APIs.
              </p>
              <div className="space-y-2">
                {[
                  { cmd: "ALLOCATE_PORTER", args: `name="Ramesh Kumar", station="${selectedStation}"`, status: "ACTIVE" },
                  { cmd: "CALCULATE_OPTIMAL_FARE", args: `base_rate=100, weight=${luggageWeight}kg, bags=${luggageCount}`, status: "COMPLETED" },
                  { cmd: "TRIGGER_WHATSAPP_HANDSHAKE", args: `passenger_mobile="Verified", agent_id="WR-982"`, status: "AWAITING" },
                ].map((act, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2.5 rounded-lg border ${
                      isDark ? "bg-slate-900/40 border-slate-900" : "bg-slate-50 border-amber-100"
                    }`}
                  >
                    <div>
                      <span className="text-emerald-400 font-bold text-[11px] block">{act.cmd}</span>
                      <span className="text-[10px] text-slate-400">{act.args}</span>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        act.status === "ACTIVE"
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                          : act.status === "COMPLETED"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                          : "bg-slate-500/10 text-slate-400"
                      }`}
                    >
                      {act.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "learn" && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3 text-xs"
            >
              <p className="text-slate-400 font-mono text-[11px] mb-2 leading-relaxed">
                Continual Learning. Backpropagates ratings and comments to tune model instruction parameters dynamically.
              </p>

              <form onSubmit={triggerLearning} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400">Rate Experience:</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className="cursor-pointer text-amber-400 transition hover:scale-110"
                      >
                        <Star className={`w-4 h-4 ${userRating >= star ? "fill-amber-400" : "opacity-35"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Enter journey comments (e.g., Porter arrived early, perfect handling)..."
                    className={`flex-1 px-3 py-1.5 rounded-lg border text-xs focus:ring-1 transition-all ${
                      isDark
                        ? "bg-slate-900 border-cyan-950 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        : "bg-amber-50/50 border-amber-200 text-slate-800 focus:ring-amber-500 focus:border-amber-500"
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={isLearning}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
                      isDark
                        ? "bg-gradient-to-r from-cyan-600 to-teal-400 text-black font-extrabold hover:brightness-110"
                        : "bg-amber-600 hover:bg-amber-700 text-white"
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    TUNE
                  </button>
                </div>
              </form>

              {/* Learning terminal output */}
              <AnimatePresence>
                {(isLearning || learningLog) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 rounded-lg border dark:border-slate-800 bg-black/20 font-mono text-[10px] text-teal-400"
                  >
                    <div className="flex items-center gap-2 mb-1 text-purple-400 font-bold">
                      <Layers className="w-3.5 h-3.5 animate-spin" />
                      <span>Reinforcement Learning Trace</span>
                    </div>
                    <div className="leading-tight break-all">
                      {learningLog}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
