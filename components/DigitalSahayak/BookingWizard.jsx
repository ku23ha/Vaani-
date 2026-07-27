import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  User,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Sliders,
  DollarSign,
  Smartphone,
  CheckSquare
} from "lucide-react";

export default function BookingWizard({
  theme,
  bookingStep,
  setBookingStep,
  pnrNumber,
  setPnrNumber,
  selectedStation,
  setSelectedStation,
  selectedCoach,
  setSelectedCoach,
  passengerName,
  setPassengerName,
  luggageCount,
  setLuggageCount,
  luggageWeight,
  setLuggageWeight,
  serviceType,
  setServiceType,
  trainNumber,
  setTrainNumber,
  seatNumber,
  setSeatNumber,
  scheduledDate,
  setScheduledDate,
  scheduledTime,
  setScheduledTime,
  seniorAssistance,
  setSeniorAssistance,
  contactNumber,
  setContactNumber,
  emailAddress,
  setEmailAddress,
  additionalNotes,
  setAdditionalNotes,
  setPorterAssigned,
  setSimulationTriggered,
}) {
  const isDark = theme === "dark";

  // Form step controls: "journey" -> "services" -> "details" -> "confirm"
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  // Simulated auto-fill using the Cognitive Loop
  const triggerAutoFill = () => {
    if (!pnrNumber) {
      setPnrNumber("4328910293");
    }
    setIsAutoFilling(true);

    setTimeout(() => {
      setSelectedStation("Valsad");
      setServiceType("Boarding");
      setTrainNumber("12929 - VALSAD SF EXP");
      setSelectedCoach("B1");
      setSeatNumber("42");
      setScheduledDate("Tomorrow");
      setScheduledTime("14:45");
      setIsAutoFilling(false);
    }, 1500);
  };

  // Dynamic Fare Calculation
  // Base rate: Rs 100 per bag (up to 20kg).
  // Overweight: +Rs 50 per bag (21kg - 40kg).
  // Patient/Senior Assistance: +Rs 150.
  const bagBase = 100;
  const bagOverweight = luggageWeight > 20 ? 50 : 0;
  const luggageAmount = luggageCount * (bagBase + bagOverweight);
  const assistanceAmount = seniorAssistance ? 150 : 0;
  const totalAmount = luggageAmount + assistanceAmount;

  // Frame Motion Variants
  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!passengerName || !contactNumber) {
      alert("Please fill in the Passenger Name and Contact Number.");
      return;
    }
    setPorterAssigned(true);
    setBookingStep("confirm");
    setSimulationTriggered(true);
  };

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-500 shadow-xl ${
        isDark
          ? "bg-slate-950 border-cyan-900/40 text-cyan-50"
          : "bg-white border-amber-200/60 text-slate-800"
      }`}
    >
      {/* Wizard Progress Header */}
      <div className="flex items-center justify-between mb-6 border-b pb-4 dark:border-slate-800">
        {[
          { id: "journey", label: "1. Journey" },
          { id: "services", label: "2. Services" },
          { id: "details", label: "3. Details" },
          { id: "confirm", label: "4. Status" },
        ].map((step, idx) => (
          <div key={step.id} className="flex items-center">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${
                bookingStep === step.id
                  ? isDark
                    ? "bg-cyan-950 text-cyan-300 border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                    : "bg-amber-600 text-white border-amber-600"
                  : idx < ["journey", "services", "details", "confirm"].indexOf(bookingStep)
                  ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/35"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-400 border-transparent"
              }`}
            >
              {step.label}
            </span>
            {idx < 3 && (
              <div
                className={`w-4 sm:w-8 h-[2px] mx-1 transition-colors ${
                  idx < ["journey", "services", "details", "confirm"].indexOf(bookingStep)
                    ? "bg-emerald-500"
                    : "bg-slate-200 dark:bg-slate-800"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Main wizard sections */}
      <AnimatePresence mode="wait">
        {bookingStep === "journey" && (
          <motion.div
            key="journey"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", stiffness: 140, damping: 15 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-lg font-extrabold tracking-tight font-sans">
                Add Your Journey Details
              </h2>
              <p className="text-xs opacity-75">
                Start with PNR or input manually. Your AI Agent parses schedule instantly.
              </p>
            </div>

            {/* PNR Quick Fill Button */}
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-xs font-semibold opacity-75 mb-1.5 font-sans">
                  Enter PNR Number
                </label>
                <input
                  type="text"
                  value={pnrNumber}
                  onChange={(e) => setPnrNumber(e.target.value)}
                  placeholder="e.g. 4328910293"
                  className={`w-full px-3 py-2 rounded-xl border text-sm transition focus:ring-1 ${
                    isDark
                      ? "bg-slate-900 border-cyan-950 text-white focus:ring-cyan-500"
                      : "bg-[#FAFAF6] border-amber-200 text-slate-800 focus:ring-amber-500"
                  }`}
                />
              </div>
              <button
                type="button"
                onClick={triggerAutoFill}
                disabled={isAutoFilling}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition cursor-pointer ${
                  isDark
                    ? "bg-slate-900 border-cyan-800 hover:bg-slate-800 text-cyan-300"
                    : "bg-amber-50 border-amber-300 hover:bg-amber-100 text-amber-800"
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${isAutoFilling ? "animate-spin" : ""}`} />
                {isAutoFilling ? "Parsing..." : "AI Auto-fill"}
              </button>
            </div>

            {/* Form grid */}
            <div className="grid grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block font-semibold opacity-75 mb-1">Station *</label>
                <select
                  value={selectedStation}
                  onChange={(e) => setSelectedStation(e.target.value)}
                  className={`w-full px-2.5 py-2 rounded-xl border ${
                    isDark ? "bg-slate-900 border-cyan-950 text-white" : "bg-white border-amber-200"
                  }`}
                >
                  <option value="">[Select Station]</option>
                  <option value="Valsad">Valsad (Western Railway)</option>
                  <option value="Vasai Road">Vasai Road (Western Railway)</option>
                  <option value="Vapi">Vapi (Western Railway)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold opacity-75 mb-1">Service Type *</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className={`w-full px-2.5 py-2 rounded-xl border ${
                    isDark ? "bg-slate-900 border-cyan-950 text-white" : "bg-white border-amber-200"
                  }`}
                >
                  <option value="Boarding">Boarding assistance</option>
                  <option value="Deboarding">Deboarding assistance</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold opacity-75 mb-1">Train Number/Name</label>
                <input
                  type="text"
                  value={trainNumber}
                  onChange={(e) => setTrainNumber(e.target.value)}
                  placeholder="e.g. 12952 - RAJDHANI"
                  className={`w-full px-2.5 py-2 rounded-xl border ${
                    isDark ? "bg-slate-900 border-cyan-950 text-white" : "bg-white border-amber-200"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold opacity-75 mb-1">Coach</label>
                  <input
                    type="text"
                    value={selectedCoach}
                    onChange={(e) => setSelectedCoach(e.target.value)}
                    placeholder="B1"
                    className={`w-full px-2.5 py-2 rounded-xl border ${
                      isDark ? "bg-slate-900 border-cyan-950 text-white" : "bg-white border-amber-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold opacity-75 mb-1">Seat</label>
                  <input
                    type="text"
                    value={seatNumber}
                    onChange={(e) => setSeatNumber(e.target.value)}
                    placeholder="42"
                    className={`w-full px-2.5 py-2 rounded-xl border ${
                      isDark ? "bg-slate-900 border-cyan-950 text-white" : "bg-white border-amber-200"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold opacity-75 mb-1">Scheduled Date *</label>
                <input
                  type="text"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  placeholder="Tomorrow"
                  className={`w-full px-2.5 py-2 rounded-xl border ${
                    isDark ? "bg-slate-900 border-cyan-950 text-white" : "bg-white border-amber-200"
                  }`}
                />
              </div>

              <div>
                <label className="block font-semibold opacity-75 mb-1">Scheduled Time *</label>
                <input
                  type="text"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  placeholder="e.g. 14:45"
                  className={`w-full px-2.5 py-2 rounded-xl border ${
                    isDark ? "bg-slate-900 border-cyan-950 text-white" : "bg-white border-amber-200"
                  }`}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setBookingStep("services")}
                disabled={!selectedStation}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer ${
                  selectedStation
                    ? isDark
                      ? "bg-gradient-to-r from-cyan-600 to-teal-400 text-black font-extrabold hover:brightness-110"
                      : "bg-amber-600 hover:bg-amber-700 text-white"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                Continue to Services
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {bookingStep === "services" && (
          <motion.div
            key="services"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4"
          >
            <div>
              <h2 className="text-lg font-extrabold tracking-tight font-sans">
                Configure Sahayak Services
              </h2>
              <p className="text-xs opacity-75">
                Luggage transportation & medical assistance with fixed price protection.
              </p>
            </div>

            {/* Luggage Adjuster */}
            <div className={`p-4 rounded-xl border ${isDark ? "bg-slate-900/30 border-cyan-950" : "bg-slate-50 border-amber-100"}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-amber-500" />
                  Luggage Quantities
                </span>
                <span className="text-xs text-amber-600 font-mono">Rs 100 base/bag</span>
              </div>

              {/* Number of Bags with Micro Tap animation */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs">Number of Bags:</span>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    type="button"
                    onClick={() => setLuggageCount(Math.max(1, luggageCount - 1))}
                    className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-lg text-slate-500 hover:bg-slate-200/50 cursor-pointer"
                  >
                    -
                  </motion.button>
                  <span className="font-mono font-bold text-sm w-4 text-center">{luggageCount}</span>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    type="button"
                    onClick={() => setLuggageCount(luggageCount + 1)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-lg text-slate-500 hover:bg-slate-200/50 cursor-pointer"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Custom physics weight slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Luggage Weight per bag:</span>
                  <span className="font-mono font-bold text-amber-600">{luggageWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={luggageWeight}
                  onChange={(e) => setLuggageWeight(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[10px] opacity-75 font-mono">
                  <span>Standard (&lt;20kg)</span>
                  <span>Overweight (+Rs 50)</span>
                </div>
              </div>
            </div>

            {/* Special Medical Assistance option */}
            <div
              onClick={() => setSeniorAssistance(!seniorAssistance)}
              className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                seniorAssistance
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : isDark
                  ? "bg-slate-900/30 border-cyan-950"
                  : "bg-slate-50 border-amber-100"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="pt-0.5">
                  <input
                    type="checkbox"
                    checked={seniorAssistance}
                    readOnly
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-cyan-50">Patient / Senior Citizen Support</h4>
                  <p className="text-[10px] opacity-75">
                    Wheelchair & continuous physical companion support (+Rs 150)
                  </p>
                </div>
              </div>
            </div>

            {/* Live dynamic ticket breakdown */}
            <div className={`p-4 rounded-xl border border-dashed text-xs ${isDark ? "bg-black/40 border-slate-800" : "bg-[#FAFBF9] border-amber-100"}`}>
              <div className="font-bold border-b pb-2 mb-2 uppercase tracking-wide text-[10px] opacity-70">
                Fare Estimation Breakdown
              </div>
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span>Luggage Transit ({luggageCount} x Rs 100):</span>
                  <span>Rs {luggageCount * 100}</span>
                </div>
                {luggageWeight > 20 && (
                  <div className="flex justify-between text-amber-600">
                    <span>Overweight Penalty ({luggageCount} x Rs 50):</span>
                    <span>+Rs {luggageCount * 50}</span>
                  </div>
                )}
                {seniorAssistance && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Patient/Senior Companion Fee:</span>
                    <span>+Rs 150</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-sm text-slate-800 dark:text-white">
                  <span>Total Transparent Fare:</span>
                  <span className="text-amber-600 font-bold">Rs {totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setBookingStep("journey")}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer transition ${
                  isDark
                    ? "bg-slate-900 border-cyan-950 hover:bg-slate-800 text-cyan-300"
                    : "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                onClick={() => setBookingStep("details")}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer ${
                  isDark
                    ? "bg-gradient-to-r from-cyan-600 to-teal-400 text-black font-extrabold hover:brightness-110"
                    : "bg-amber-600 hover:bg-amber-700 text-white"
                }`}
              >
                Continue to Details
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {bookingStep === "details" && (
          <motion.div
            key="details"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4 text-xs"
          >
            <div>
              <h2 className="text-lg font-extrabold tracking-tight font-sans">
                Who are we helping?
              </h2>
              <p className="text-xs opacity-75">
                Submit details for verified porter hand-off.
              </p>
            </div>

            <form onSubmit={handleConfirm} className="space-y-3">
              <div>
                <label className="block font-semibold opacity-75 mb-1">Passenger Name *</label>
                <input
                  type="text"
                  required
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder="e.g. Anil Sharma"
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isDark ? "bg-slate-900 border-cyan-950 text-white" : "bg-white border-amber-200"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold opacity-75 mb-1">Contact Number *</label>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="e.g. 9823018239"
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? "bg-slate-900 border-cyan-950 text-white" : "bg-white border-amber-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-semibold opacity-75 mb-1">Alternate Contact</label>
                  <input
                    type="tel"
                    placeholder="Optional alternate number"
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? "bg-slate-900 border-cyan-950 text-white" : "bg-white border-amber-200"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold opacity-75 mb-1">Email Address</label>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="e.g. anil@gmail.com"
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isDark ? "bg-slate-900 border-cyan-950 text-white" : "bg-white border-amber-200"
                  }`}
                />
              </div>

              <div>
                <label className="block font-semibold opacity-75 mb-1">Additional Notes / Comments</label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. Carrying fragile camera gear / Please bring wheelchair near main escalator..."
                  rows="3"
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isDark ? "bg-slate-900 border-cyan-950 text-white" : "bg-white border-amber-200"
                  }`}
                />
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setBookingStep("services")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer transition ${
                    isDark
                      ? "bg-slate-900 border-cyan-950 hover:bg-slate-800 text-cyan-300"
                      : "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-xl font-extrabold text-xs flex items-center gap-1.5 shadow-lg transition cursor-pointer ${
                    isDark
                      ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-black hover:brightness-110"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  Confirm & Dispatch Sahayak
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {bookingStep === "confirm" && (
          <motion.div
            key="confirm"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4 text-center py-4"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 10 }}
              className="w-16 h-16 mx-auto bg-emerald-500/10 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-500"
            >
              <CheckSquare className="w-8 h-8" />
            </motion.div>

            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400 font-sans">
                Sahayak Assigned!
              </h2>
              <p className="text-xs opacity-75">
                Your railway booking is confirmed. Ramesh Kumar is navigating to coach {selectedCoach || "B1"}.
              </p>
            </div>

            {/* Porter Badge Info */}
            <div className={`p-4 rounded-xl border flex items-center gap-4 text-left max-w-sm mx-auto ${
              isDark ? "bg-slate-900/40 border-slate-800" : "bg-slate-50 border-amber-200"
            }`}>
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-xl shadow">
                👨
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Ramesh Kumar (ID: WR-982)</h4>
                <p className="text-[10px] text-slate-500">⭐ 4.9 Rated Porter (Western Railway Certified)</p>
                <p className="text-[10px] text-emerald-600 font-bold font-mono">Matched at Platform 3 - Valsad</p>
              </div>
            </div>

            {/* Quick action details */}
            <p className="text-[11px] max-w-sm mx-auto text-slate-400 leading-normal">
              An SMS containing Ramesh&apos;s live coordinate handshake and dynamic tracking credentials has been dispatched to{" "}
              <span className="font-semibold text-slate-700 dark:text-white">{contactNumber || "+91 9823018239"}</span>.
            </p>

            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setBookingStep("journey");
                  setPorterAssigned(false);
                }}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition cursor-pointer ${
                  isDark
                    ? "bg-slate-900 border border-cyan-800 text-cyan-300 hover:bg-slate-800"
                    : "bg-amber-600 hover:bg-amber-700 text-white"
                }`}
              >
                Book Another Sahayak
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
