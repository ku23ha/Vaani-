import React, { useState } from "react";
import Header from "./Header";
import BookingWizard from "./BookingWizard";
import AgentCanvas from "./AgentCanvas";
import AgentControlPanel from "./AgentControlPanel";
import FaqsAndFooter from "./FaqsAndFooter";
import { motion } from "framer-motion";
import { Compass, Sparkles, HelpCircle } from "lucide-react";

export default function DigitalSahayakApp() {
  const [theme, setTheme] = useState("light"); // "light" (Cream Luxury) or "dark" (OLED Cyber)

  // Booking states
  const [bookingStep, setBookingStep] = useState("journey"); // journey, services, details, confirm
  const [pnrNumber, setPnrNumber] = useState("");
  const [selectedStation, setSelectedStation] = useState("");
  const [selectedCoach, setSelectedCoach] = useState("B1");
  const [passengerName, setPassengerName] = useState("");
  const [luggageCount, setLuggageCount] = useState(1);
  const [luggageWeight, setLuggageWeight] = useState(15);
  const [serviceType, setServiceType] = useState("Boarding");
  const [trainNumber, setTrainNumber] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [seniorAssistance, setSeniorAssistance] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Simulation states
  const [porterAssigned, setPorterAssigned] = useState(false);
  const [simulationTriggered, setSimulationTriggered] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isDark = theme === "dark";

  // Compute active loop state for the header badge
  const getActiveLoopState = () => {
    if (bookingStep === "journey") return "pnr_sensing";
    if (bookingStep === "services") return "rate_optimization";
    if (bookingStep === "details") return "validation_check";
    if (bookingStep === "confirm") return "agent_tracking";
    return "idle";
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans ${
        isDark ? "bg-black text-slate-100" : "bg-[#FAF8F5] text-slate-800"
      }`}
    >
      {/* Premium Header */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        activeLoopState={getActiveLoopState()}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner/Hero Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              isDark
                ? "bg-cyan-950/40 text-cyan-400 border border-cyan-800"
                : "bg-amber-100 text-amber-800 border border-amber-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Premium Authorized Service - Western Railway</span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans leading-none">
            Online Coolie <span className="text-amber-600">(Sahayak)</span> Booking Portal
          </h1>
          <p className="text-xs sm:text-sm opacity-75 max-w-xl mx-auto">
            Authorized by Mumbai Central Division. Fixed rates, vetted porters,
            and AI-driven route coordination with zero bargaining.
          </p>
        </div>

        {/* 2-Column Responsive Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Booking Wizard Card (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <BookingWizard
              theme={theme}
              bookingStep={bookingStep}
              setBookingStep={setBookingStep}
              pnrNumber={pnrNumber}
              setPnrNumber={setPnrNumber}
              selectedStation={selectedStation}
              setSelectedStation={setSelectedStation}
              selectedCoach={selectedCoach}
              setSelectedCoach={setSelectedCoach}
              passengerName={passengerName}
              setPassengerName={setPassengerName}
              luggageCount={luggageCount}
              setLuggageCount={setLuggageCount}
              luggageWeight={luggageWeight}
              setLuggageWeight={setLuggageWeight}
              serviceType={serviceType}
              setServiceType={setServiceType}
              trainNumber={trainNumber}
              setTrainNumber={setTrainNumber}
              seatNumber={seatNumber}
              setSeatNumber={setSeatNumber}
              scheduledDate={scheduledDate}
              setScheduledDate={setScheduledDate}
              scheduledTime={scheduledTime}
              setScheduledTime={setScheduledTime}
              seniorAssistance={seniorAssistance}
              setSeniorAssistance={setSeniorAssistance}
              contactNumber={contactNumber}
              setContactNumber={setContactNumber}
              emailAddress={emailAddress}
              setEmailAddress={setEmailAddress}
              additionalNotes={additionalNotes}
              setAdditionalNotes={setAdditionalNotes}
              setPorterAssigned={setPorterAssigned}
              setSimulationTriggered={setSimulationTriggered}
            />
          </div>

          {/* Column 2: Agent Monitor & Live Canvas (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Station tracking map */}
            <AgentCanvas
              theme={theme}
              selectedStation={selectedStation || "Valsad"}
              selectedCoach={selectedCoach}
              bookingStep={bookingStep}
              porterAssigned={porterAssigned}
              simulationTriggered={simulationTriggered}
              setSimulationTriggered={setSimulationTriggered}
            />

            {/* Cognitive Controller */}
            <AgentControlPanel
              theme={theme}
              pnrNumber={pnrNumber}
              luggageCount={luggageCount}
              luggageWeight={luggageWeight}
              selectedStation={selectedStation || "Valsad"}
              selectedCoach={selectedCoach}
              passengerName={passengerName}
            />
          </div>
        </div>

        {/* FAQs & Authorized footer */}
        <FaqsAndFooter theme={theme} />
      </main>
    </div>
  );
}
