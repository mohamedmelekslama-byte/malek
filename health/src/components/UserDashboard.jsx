import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Droplets, Target, Award, TrendingUp, Plus, RefreshCw, Flame, Heart, Scale, Watch, Smartphone, Wifi, CheckCircle2
} from 'lucide-react';

export default function UserDashboard({ currentUser }) {
  // State for daily trackers
  const [waterGlasses, setWaterGlasses] = useState(6);
  const [targetWater] = useState(8);
  const [caloriesLogged, setCaloriesLogged] = useState(1850);
  const [targetCalories] = useState(2400);
  const [connectedDevice, setConnectedDevice] = useState('Apple Watch Series 9'); // null | device name
  const [isSyncing, setIsSyncing] = useState(false);
  const [heartRate, setHeartRate] = useState(64);
  const [sleepScore, setSleepScore] = useState(88);
  const [lastSyncTime, setLastSyncTime] = useState('Just now');

  // Live heart rate telemetry simulation when device connected
  useEffect(() => {
    if (!connectedDevice) return;
    const interval = setInterval(() => {
      // Small realistic fluctuations (+/- 2 bpm)
      setHeartRate((prev) => Math.min(85, Math.max(58, prev + Math.floor(Math.random() * 5) - 2)));
    }, 4000);
    return () => clearInterval(interval);
  }, [connectedDevice]);

  const handleSyncDevice = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setHeartRate(62 + Math.floor(Math.random() * 6));
      setSleepScore(85 + Math.floor(Math.random() * 10));
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1500);
  };

  // Biometrics State
  const [weightLogs, setWeightLogs] = useState([
    { date: 'Mon', weight: 78.5 },
    { date: 'Tue', weight: 78.2 },
    { date: 'Wed', weight: 78.0 },
    { date: 'Thu', weight: 77.8 },
    { date: 'Fri', weight: 77.5 },
    { date: 'Sat', weight: 77.6 },
    { date: 'Sun', weight: 77.3 },
  ]);
  const [newWeight, setNewWeight] = useState('');

  // Height (cm) & Weight (kg) for BMI Interactive Calculator
  const [heightCm, setHeightCm] = useState(178);
  const [calcWeight, setCalcWeight] = useState(77.3);

  // Calculate BMI
  const bmi = (calcWeight / Math.pow(heightCm / 100, 2)).toFixed(1);
  const getBMICategory = (val) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-yellow-400' };
    if (val < 25) return { label: 'Healthy Weight', color: 'text-gym-green' };
    if (val < 30) return { label: 'Overweight', color: 'text-orange-400' };
    return { label: 'Obese', color: 'text-red-400' };
  };

  const bmiCat = getBMICategory(parseFloat(bmi));

  const handleAddWeight = (e) => {
    e.preventDefault();
    if (!newWeight || isNaN(newWeight)) return;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const nextDate = days[weightLogs.length % 7];
    setWeightLogs((prev) => [...prev.slice(1), { date: nextDate, weight: parseFloat(newWeight) }]);
    setNewWeight('');
  };

  return (
    <section id="dashboard" className="py-20 px-4 md:px-8 max-w-7xl mx-auto text-left">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <span className="text-xs text-gym-green font-bold uppercase tracking-widest bg-gym-green/10 px-3 py-1 rounded-full border border-gym-green/20">
            Personal Metrics
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-primary mt-3">
            User Health Dashboard
          </h2>
          <p className="text-sm text-gray-400 mt-2 font-light">
            Welcome back, <strong className="text-primary">{currentUser?.name || 'Athlete'}</strong>! Track your daily biometrics and hydration.
          </p>
        </div>

        {/* Quick Goal Badge */}
        <div className="flex items-center gap-3 bg-card-bg border border-border-green/40 p-3 px-5 rounded-2xl shadow-lg">
          <div className="p-2.5 rounded-xl bg-gym-green/10 text-gym-green">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-semibold">Active Goal</p>
            <p className="text-xs font-bold text-primary">Lean Muscle Gain</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Trackers + Biometrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols wide on LG): Water & Calorie Tracker */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Hydration & Calorie Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Water Tracker */}
            <div className="bg-card-bg border border-border-green/40 rounded-3xl p-6 shadow-xl space-y-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold text-primary flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-400" />
                    Hydration Log
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Target: {targetWater} Glasses / Day</p>
                </div>
                <span className="text-lg font-display font-bold text-blue-400">
                  {waterGlasses} / {targetWater}
                </span>
              </div>

              {/* Water Glasses Visual */}
              <div className="grid grid-cols-4 gap-3 py-2">
                {Array.from({ length: targetWater }).map((_, idx) => {
                  const isFilled = idx < waterGlasses;
                  return (
                    <button
                      key={idx}
                      onClick={() => setWaterGlasses(idx + 1)}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-center cursor-pointer ${
                        isFilled
                          ? 'bg-blue-500/20 border-blue-400 text-blue-400 shadow-md shadow-blue-500/10'
                          : 'bg-dark-bg/50 border-border-green/30 text-gray-600 hover:border-blue-400/50'
                      }`}
                    >
                      <Droplets className={`w-5 h-5 ${isFilled ? 'fill-blue-400' : ''}`} />
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setWaterGlasses((prev) => Math.min(targetWater, prev + 1))}
                  className="flex-1 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Glass
                </button>
                <button
                  onClick={() => setWaterGlasses(0)}
                  className="p-2.5 rounded-xl bg-dark-bg border border-border-green/30 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                  title="Reset"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calorie Intake Tracker */}
            <div className="bg-card-bg border border-border-green/40 rounded-3xl p-6 shadow-xl space-y-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold text-primary flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-400" />
                    Daily Calorie Target
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Goal: {targetCalories} kcal</p>
                </div>
                <span className="text-lg font-display font-bold text-orange-400">
                  {Math.round((caloriesLogged / targetCalories) * 100)}%
                </span>
              </div>

              {/* Calorie Progress Ring / Bar */}
              <div className="space-y-2 py-2">
                <div className="w-full h-4 bg-dark-bg rounded-full border border-border-green/30 overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (caloriesLogged / targetCalories) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 font-medium">
                  <span>Logged: {caloriesLogged} kcal</span>
                  <span>Remaining: {Math.max(0, targetCalories - caloriesLogged)} kcal</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setCaloriesLogged((prev) => prev + 250)}
                  className="flex-1 py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> +250 kcal Snack
                </button>
              </div>
            </div>

          </div>

          {/* Weight History Chart */}
          <div className="bg-card-bg border border-border-green/40 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gym-green" />
                  Weight Progress Log (kg)
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">7-day trend history</p>
              </div>

              {/* Log new weight form */}
              <form onSubmit={handleAddWeight} className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  placeholder="New weight (e.g. 77.4)"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="px-3 py-2 text-xs bg-dark-bg border border-border-green/40 rounded-xl text-primary focus:outline-none focus:border-gym-green w-40"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-gym-green text-secondary rounded-xl hover:bg-primary transition-colors cursor-pointer"
                >
                  Log Entry
                </button>
              </form>
            </div>

            {/* Custom Bar Graph Visualization */}
            <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-border-green/30 pb-2">
              {weightLogs.map((item, idx) => {
                const maxW = Math.max(...weightLogs.map((w) => w.weight));
                const minW = Math.min(...weightLogs.map((w) => w.weight)) - 1;
                const heightPercent = Math.max(15, ((item.weight - minW) / (maxW - minW || 1)) * 100);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-bold text-gym-green opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.weight}kg
                    </span>
                    <div
                      className="w-full bg-gym-green/20 group-hover:bg-gym-green border border-gym-green/40 rounded-t-xl transition-all duration-300"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[11px] font-medium text-gray-400">{item.date}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: BMI & Biometric Breakdown */}
        <div className="space-y-8">
          
          {/* BMI Card */}
          <div className="bg-card-bg border border-border-green/40 rounded-3xl p-6 md:p-8 shadow-xl space-y-6 text-center relative overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-gym-green/10 border border-gym-green/40 flex items-center justify-center mx-auto">
              <Scale className="w-9 h-9 text-gym-green" />
            </div>

            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Body Mass Index (BMI)</p>
              <h3 className="text-4xl font-display font-extrabold text-primary mt-1">{bmi}</h3>
              <p className={`text-xs font-bold mt-1 ${bmiCat.color}`}>{bmiCat.label}</p>
            </div>

            {/* Interactive Inputs */}
            <div className="p-4 rounded-2xl bg-dark-bg/60 border border-border-green/30 text-left space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Weight: <strong className="text-primary">{calcWeight} kg</strong></span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  step="0.5"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(parseFloat(e.target.value))}
                  className="w-full accent-gym-green cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Height: <strong className="text-primary">{heightCm} cm</strong></span>
                </div>
                <input
                  type="range"
                  min="130"
                  max="220"
                  step="1"
                  value={heightCm}
                  onChange={(e) => setHeightCm(parseInt(e.target.value))}
                  className="w-full accent-gym-green cursor-pointer"
                />
              </div>

              <div className="flex justify-between border-t border-border-green/20 pt-2">
                <span className="text-gray-400">Healthy Weight Range:</span>
                <span className="font-bold text-gym-green">
                  {(18.5 * Math.pow(heightCm / 100, 2)).toFixed(1)}kg - {(24.9 * Math.pow(heightCm / 100, 2)).toFixed(1)}kg
                </span>
              </div>
            </div>
          </div>

          {/* Smart Device Connection & Vitals telemetry */}
          <div className="bg-card-bg border border-border-green/40 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                <Watch className="w-4 h-4 text-gym-green" />
                Smart Wearable Sync
              </h4>
              <button
                onClick={handleSyncDevice}
                disabled={isSyncing || !connectedDevice}
                className="p-1.5 rounded-lg bg-dark-bg border border-border-green/40 text-gray-400 hover:text-gym-green transition-colors cursor-pointer disabled:opacity-50"
                title="Sync now"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-gym-green' : ''}`} />
              </button>
            </div>

            {/* Connection Status Badge */}
            <div className="p-3 rounded-2xl bg-dark-bg/60 border border-border-green/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gym-green animate-pulse" />
                <div>
                  <p className="font-bold text-primary">{connectedDevice || 'No Device Connected'}</p>
                  <p className="text-[10px] text-gray-500">Last sync: {lastSyncTime}</p>
                </div>
              </div>
              <button
                onClick={() => setConnectedDevice((prev) => (prev ? null : 'Apple Watch Series 9'))}
                className="text-[10px] font-bold text-gym-green hover:underline cursor-pointer"
              >
                {connectedDevice ? 'Disconnect' : 'Connect'}
              </button>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-dark-bg/50 border border-border-green/20 space-y-1 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-[10px] uppercase font-semibold">Live HR</p>
                  <Heart className="w-3.5 h-3.5 text-red-400 animate-ping" />
                </div>
                <p className="text-xl font-display font-extrabold text-primary">
                  {heartRate} <span className="text-[10px] text-gray-500 font-normal">BPM</span>
                </p>
                <span className="text-[9px] text-gym-green bg-gym-green/10 px-1.5 py-0.5 rounded font-bold">
                  Resting Zone
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-dark-bg/50 border border-border-green/20 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-[10px] uppercase font-semibold">Sleep Index</p>
                  <Activity className="w-3.5 h-3.5 text-gym-green" />
                </div>
                <p className="text-xl font-display font-extrabold text-gym-green">
                  {sleepScore}%
                </p>
                <span className="text-[9px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded font-bold">
                  Deep Recovery
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
