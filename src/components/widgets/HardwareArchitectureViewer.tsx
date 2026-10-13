import React, { useState } from 'react';
import { Cpu, HardDrive, Zap, CircuitBoard, Layers, ShieldCheck, Check } from 'lucide-react';

interface ComponentDetail {
  id: string;
  name: string;
  analogy: string;
  speedMetric: string;
  whatItDoes: string;
  isVolatile: boolean;
}

const COMPONENTS: Record<string, ComponentDetail> = {
  cpu: {
    id: 'cpu',
    name: 'CPU (Central Processing Unit)',
    analogy: 'The Brain / The Executive Chef',
    speedMetric: 'Clock Speed: measured in Gigahertz (GHz, billions of operations/sec)',
    whatItDoes: 'Executes instructions, carries out arithmetic calculations (+, -, *, /), and logical decisions. Covered by a heat sink and fan to prevent overheating.',
    isVolatile: false
  },
  ram: {
    id: 'ram',
    name: 'RAM (Random Access Memory)',
    analogy: 'The Student Desk Surface',
    speedMetric: 'Capacity: measured in GB (e.g. 8GB, 16GB) | Speed: DDR4 / DDR5',
    whatItDoes: 'High-speed temporary workspace where open apps and documents live while in use. Volatile: everything in RAM vanishes immediately when power turns off!',
    isVolatile: true
  },
  storage: {
    id: 'storage',
    name: 'SSD / Storage Drive (Solid State Drive)',
    analogy: 'The Library Bookshelf / Student School Bag',
    speedMetric: 'Capacity: measured in GB or TB (e.g. 512GB, 1TB SSD)',
    whatItDoes: 'Permanent non-volatile storage. Keeps Windows operating system, installed applications, homework essays, photos, and games safe even when powered off.',
    isVolatile: false
  },
  motherboard: {
    id: 'motherboard',
    name: 'Motherboard (Main Circuit Board)',
    analogy: 'The City Highway System & Nervous System',
    speedMetric: 'Bus Bandwidth & Chipset architecture',
    whatItDoes: 'The massive printed circuit board that physically connects and electronically links the CPU, RAM sticks, storage cables, and graphics card together.',
    isVolatile: false
  },
  psu: {
    id: 'psu',
    name: 'PSU (Power Supply Unit)',
    analogy: 'The Heart & Blood Circulation',
    speedMetric: 'Wattage rating: 400W – 750W',
    whatItDoes: 'Converts alternating wall current (240V AC) into smooth, low-voltage direct current (12V, 5V, 3.3V DC) required by delicate microchips.',
    isVolatile: false
  }
};

export const HardwareArchitectureViewer: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('cpu');
  const comp = COMPONENTS[activeId];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm my-6">
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <CircuitBoard className="w-5 h-5 text-emerald-400" />
            Inside the System Unit: Internal Hardware
          </h4>
          <p className="text-xs text-slate-300">Click any component to inspect how it works with the CPU and memory</p>
        </div>
        <div className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded border border-emerald-800">
          Selected: {comp.name.split(' (')[0]}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Visual Motherboard Diagram */}
        <div className="lg:col-span-7 bg-slate-900 p-6 flex flex-col items-center justify-center min-h-[340px]">
          {/* Motherboard PCB simulation */}
          <div className="w-full max-w-md aspect-4/3 bg-emerald-950/80 border-2 border-emerald-700/60 rounded-xl p-4 relative shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* PCB Traces pattern background */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Top row: CPU Socket and RAM Slots */}
            <div className="flex items-start justify-between relative z-10">
              {/* CPU Socket */}
              <button
                onClick={() => setActiveId('cpu')}
                className={`transition-all rounded-lg p-2 flex flex-col items-center text-center ${
                  activeId === 'cpu'
                    ? 'ring-2 ring-emerald-400 bg-emerald-900/90 scale-105'
                    : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <div className="w-20 h-20 bg-linear-to-br from-slate-700 to-slate-800 border-2 border-emerald-500/40 rounded flex flex-col items-center justify-center p-1 shadow-inner relative">
                  <Cpu className="w-8 h-8 text-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-mono font-bold text-slate-200 mt-1">CPU (Core)</span>
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-300 mt-1">1. The CPU</span>
              </button>

              {/* RAM Slots */}
              <button
                onClick={() => setActiveId('ram')}
                className={`transition-all rounded-lg p-2 flex flex-col items-center ${
                  activeId === 'ram'
                    ? 'ring-2 ring-blue-400 bg-blue-950/80 scale-105'
                    : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <div className="flex gap-1.5 p-2 bg-slate-900 rounded border border-blue-500/30">
                  <div className="w-3.5 h-20 bg-blue-600 rounded-xs flex flex-col justify-around py-1 items-center">
                    <div className="w-2 h-1 bg-amber-300" />
                    <div className="w-2 h-1 bg-amber-300" />
                    <div className="w-2 h-1 bg-amber-300" />
                  </div>
                  <div className="w-3.5 h-20 bg-blue-600 rounded-xs flex flex-col justify-around py-1 items-center">
                    <div className="w-2 h-1 bg-amber-300" />
                    <div className="w-2 h-1 bg-amber-300" />
                    <div className="w-2 h-1 bg-amber-300" />
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-blue-300 mt-1">2. RAM Sticks</span>
              </button>
            </div>

            {/* Motherboard Base button */}
            <div className="text-center my-2 relative z-10">
              <button
                onClick={() => setActiveId('motherboard')}
                className={`text-xs px-3 py-1 rounded-full font-mono transition-all ${
                  activeId === 'motherboard'
                    ? 'bg-emerald-500 text-slate-950 font-bold ring-2 ring-white'
                    : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800 border border-emerald-600/50'
                }`}
              >
                Motherboard Bus Circuitry
              </button>
            </div>

            {/* Bottom row: Storage and Power Supply */}
            <div className="flex items-end justify-between relative z-10">
              {/* Storage SSD */}
              <button
                onClick={() => setActiveId('storage')}
                className={`transition-all rounded-lg p-2 flex flex-col items-center ${
                  activeId === 'storage'
                    ? 'ring-2 ring-purple-400 bg-purple-950/80 scale-105'
                    : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <div className="w-24 h-12 bg-slate-800 rounded border border-purple-500/40 p-1.5 flex items-center justify-between">
                  <HardDrive className="w-6 h-6 text-purple-400" />
                  <div className="text-right">
                    <span className="block text-[9px] font-mono text-purple-200">512 GB SSD</span>
                    <span className="block text-[8px] text-slate-400">Non-Volatile</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-purple-300 mt-1">3. Storage SSD</span>
              </button>

              {/* Power Supply */}
              <button
                onClick={() => setActiveId('psu')}
                className={`transition-all rounded-lg p-2 flex flex-col items-center ${
                  activeId === 'psu'
                    ? 'ring-2 ring-amber-400 bg-amber-950/80 scale-105'
                    : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <div className="w-20 h-14 bg-slate-800 rounded border border-amber-500/40 p-1 flex flex-col items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span className="text-[9px] font-mono text-amber-200 mt-0.5">500W PSU</span>
                </div>
                <span className="text-[11px] font-semibold text-amber-300 mt-1">4. Power Supply</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
            {Object.keys(COMPONENTS).map((key) => (
              <button
                key={key}
                onClick={() => setActiveId(key)}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                  activeId === key
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {COMPONENTS[key].name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Component Deep Explanation */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <CircuitBoard className="w-4 h-4" />
              Internal Hardware Architecture
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">
              {comp.name}
            </h3>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 mb-4 text-xs">
              <span className="font-semibold text-slate-500 uppercase tracking-wider block">Easy Everyday Analogy</span>
              <p className="text-slate-800 font-medium mt-0.5">{comp.analogy}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">How It Works</span>
                <p className="text-slate-700 mt-0.5 leading-relaxed">{comp.whatItDoes}</p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Speed & Metrics</span>
                <p className="text-slate-700 mt-0.5 text-xs font-mono bg-slate-50 p-2 rounded border border-slate-200">
                  {comp.speedMetric}
                </p>
              </div>

              <div className={`p-2.5 rounded-lg border text-xs ${
                comp.isVolatile 
                  ? 'bg-rose-50 border-rose-200 text-rose-900' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <span className="font-bold block">
                  {comp.isVolatile ? '⚠️ Volatile Memory (Temporary)' : '✓ Non-Volatile (Permanent)'}
                </span>
                <p className="mt-0.5">
                  {comp.isVolatile
                    ? 'Loses all data when you shut down the PC. Save your files frequently!'
                    : 'Safely retains information even when power is completely removed.'}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="text-emerald-600 font-medium flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Hardware Verified
            </span>
            <span>Interactive Guide</span>
          </div>
        </div>
      </div>
    </div>
  );
};
