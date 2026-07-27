import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, AlertTriangle, Users, Compass, HelpCircle } from "lucide-react";

export default function AgentCanvas({
  theme,
  selectedStation,
  selectedCoach,
  bookingStep,
  porterAssigned,
  simulationTriggered,
  setSimulationTriggered,
}) {
  const isDark = theme === "dark";

  // Simulation parameters
  const [porterX, setPorterX] = useState(15); // Percentage across platform width
  const [porterY, setPorterY] = useState(85); // Percentage across platform height
  const [crowdLevel, setCrowdLevel] = useState("Medium");
  const [simLog, setSimLog] = useState("Agent Standby. Awaiting booking confirmation.");
  const [activeObstacle, setActiveObstacle] = useState(null);

  // Define position mapping for different coaches
  const coachPositions = {
    "A1": { x: 80, y: 35 },
    "B1": { x: 60, y: 35 },
    "S1": { x: 40, y: 35 },
    "GEN": { x: 20, y: 35 },
  };

  const targetCoach = selectedCoach || "B1";
  const targetPos = coachPositions[targetCoach] || { x: 60, y: 35 };

  // Animate Porter Agent when confirmation occurs or simulation is explicitly triggered
  useEffect(() => {
    if (bookingStep === "confirm" || simulationTriggered) {
      setSimLog("System Event: Porter assigned. Initializing cognitive pathfinding.");

      // Stage 1: Move from lounge to main aisle
      const t1 = setTimeout(() => {
        setPorterX(25);
        setPorterY(65);
        setSimLog("Action: Exited lounge. Sensor data: Platform 3 crowd ahead.");
      }, 1000);

      // Stage 2: Encounter crowd obstacle, navigate around it
      const t2 = setTimeout(() => {
        setActiveObstacle("Crowd cluster near S1");
        setPorterX(45);
        setPorterY(75); // moves down to avoid S1 crowd
        setSimLog("Thought (DSPy RoutePlanner): Crowd cluster detected. Rerouting via lower concourse.");
      }, 2500);

      // Stage 3: Direct move to coach
      const t3 = setTimeout(() => {
        setActiveObstacle(null);
        setPorterX(targetPos.x - 5);
        setPorterY(50);
        setSimLog(`Action: Aligning with platform marker for Coach ${targetCoach}.`);
      }, 4500);

      // Stage 4: Reach Passenger Coach
      const t4 = setTimeout(() => {
        setPorterX(targetPos.x);
        setPorterY(targetPos.y + 8);
        setSimLog(`Goal Reached: Porter at Coach ${targetCoach}. Awaiting Passenger handshake.`);
      }, 6000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    } else {
      // Standby positions
      setPorterX(15);
      setPorterY(85);
      setActiveObstacle(null);
      setSimLog("Agent Standby. Awaiting booking confirmation.");
    }
  }, [bookingStep, simulationTriggered, targetCoach]);

  const resetSimulation = () => {
    setPorterX(15);
    setPorterY(85);
    setActiveObstacle(null);
    setSimulationTriggered(false);
    setSimLog("Simulation reset. Porter returned to lounge.");
  };

  return (
    <div
      className={`p-5 rounded-2xl border transition-all duration-500 shadow-md ${
        isDark
          ? "bg-slate-950 border-cyan-900/40 text-cyan-50"
          : "bg-white border-amber-200/60 text-slate-800"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-md flex items-center gap-2 font-sans">
            <Compass className="w-5 h-5 text-emerald-500" />
            Live Porter Dispatch Tracker
          </h3>
          <p className="text-xs opacity-75">
            Real-time platform pathfinding at{" "}
            <span className="font-semibold text-emerald-600">{selectedStation} Station</span>
          </p>
        </div>
        <div className="flex gap-2">
          {bookingStep === "confirm" && (
            <button
              onClick={resetSimulation}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 cursor-pointer transition ${
                isDark
                  ? "bg-slate-900 border-cyan-800 hover:bg-slate-800 text-cyan-300"
                  : "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800"
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Sim
            </button>
          )}
        </div>
      </div>

      {/* Virtual Railway Station Canvas */}
      <div
        className={`relative h-64 rounded-xl border overflow-hidden ${
          isDark
            ? "bg-slate-950 border-slate-900 pattern-grid-dark"
            : "bg-[#FDFCF9] border-amber-100 pattern-grid-light"
        }`}
      >
        {/* Track Line */}
        <div className="absolute top-10 left-0 right-0 h-4 bg-slate-700 flex items-center justify-around opacity-45">
          <div className="w-full h-[2px] bg-slate-500 border-t border-b border-slate-600"></div>
        </div>

        {/* Train Body */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, delay: 0.5 }}
          className="absolute top-6 left-[5%] right-[5%] h-12 rounded-lg bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-800 border-b-4 border-amber-500 flex items-center justify-around text-white text-[10px] font-mono shadow-md z-10"
        >
          <div className="text-[11px] font-bold tracking-wider text-amber-400 px-2 bg-black/40 rounded">
            WESTERN RAILWAY EXPRESS
          </div>
          <div className="flex gap-8">
            <span className={targetCoach === "A1" ? "border-b-2 border-emerald-400 text-emerald-300 font-bold" : "opacity-60"}>A1 (AC)</span>
            <span className={targetCoach === "B1" ? "border-b-2 border-emerald-400 text-emerald-300 font-bold" : "opacity-60"}>B1 (AC 3t)</span>
            <span className={targetCoach === "S1" ? "border-b-2 border-emerald-400 text-emerald-300 font-bold" : "opacity-60"}>S1 (Sleeper)</span>
            <span className={targetCoach === "GEN" ? "border-b-2 border-emerald-400 text-emerald-300 font-bold" : "opacity-60"}>GEN</span>
          </div>
        </motion.div>

        {/* Platform Concrete Grid */}
        <div
          className={`absolute top-[48%] bottom-0 left-0 right-0 border-t-4 transition-colors ${
            isDark ? "bg-slate-900/60 border-cyan-900/25" : "bg-slate-100 border-amber-900/10"
          }`}
        >
          {/* Coach markers on platform */}
          <div className="absolute top-2 w-full flex justify-around px-8 text-[9px] font-mono text-slate-400">
            <span>Coach A1 Area</span>
            <span>Coach B1 Area</span>
            <span>Coach S1 Area</span>
            <span>Gen Coach Area</span>
          </div>

          {/* Crowd Clusters / Obstacles */}
          <div className="absolute top-10 left-[35%] flex flex-col items-center gap-0.5 opacity-60">
            <Users className={`w-5 h-5 ${isDark ? "text-cyan-600" : "text-amber-700"}`} />
            <span className="text-[8px] font-mono">Crowd Cluster</span>
          </div>

          <div className="absolute bottom-6 left-[70%] flex flex-col items-center gap-0.5 opacity-60">
            <Users className={`w-5 h-5 ${isDark ? "text-cyan-600" : "text-amber-700"}`} />
            <span className="text-[8px] font-mono">Luggage Trolley</span>
          </div>

          {/* Active Obstacle Indicator */}
          {activeObstacle && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-12 left-[30%] bg-amber-500/10 border border-amber-500 text-amber-500 px-2 py-0.5 rounded text-[8px] font-mono flex items-center gap-1 z-20"
            >
              <AlertTriangle className="w-2.5 h-2.5 animate-pulse" />
              Dynamic Crowd Avoidance Active
            </motion.div>
          )}

          {/* Sahayak Lounge (Starting position) */}
          <div
            className={`absolute bottom-2 left-2 px-3 py-1.5 rounded-lg border text-[9px] font-mono ${
              isDark
                ? "bg-slate-950/80 border-cyan-950 text-cyan-400"
                : "bg-amber-50/60 border-amber-200 text-amber-900"
            }`}
          >
            <div className="font-bold uppercase tracking-wider">Sahayak Lounge</div>
            <span className="text-[8px] opacity-70">Ramesh K. (Standby)</span>
          </div>

          {/* Simulated Porter Agent Dot */}
          <motion.div
            animate={{ left: `${porterX}%`, top: `${porterY}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="absolute -ml-3 -mt-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-30 cursor-pointer"
            style={{ position: "absolute" }}
          >
            {/* Outer pulse */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 animate-ping"></span>
            <div className="relative w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs border-2 border-white">
              {porterAssigned ? "👨" : "🤖"}
            </div>

            {/* Dynamic Thought Bubble beside Porter */}
            {bookingStep === "confirm" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`absolute left-9 bottom-3 whitespace-nowrap px-2.5 py-1 rounded-xl shadow-md text-[9px] font-mono border z-40 ${
                  isDark
                    ? "bg-slate-900 border-cyan-800 text-cyan-300"
                    : "bg-white border-amber-200 text-amber-800"
                }`}
              >
                Ramesh: Tracking Coach {targetCoach}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Live Logging feeds */}
      <div
        className={`mt-3 p-2.5 rounded-lg border font-mono text-[10px] flex items-center gap-2 ${
          isDark
            ? "bg-slate-950/80 border-slate-900 text-teal-400"
            : "bg-[#FAFAF6] border-amber-100 text-amber-900"
        }`}
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-bold text-slate-400">Agent Log:</span>
        <span className="truncate">{simLog}</span>
      </div>
    </div>
  );
}
