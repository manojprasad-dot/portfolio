"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, FastForward, SkipBack, Music, Headphones, Activity, Zap, Moon } from "lucide-react";

// Mock Data for Playlists - User can replace Spotify IDs here
const RUNNING_PLAYLISTS = [
  {
    id: "23HK7kKa8e82aHz8TZy6mT",
    title: "The Warm Up",
    type: "Pre-Run / Dynamic Stretch",
    intensity: "Low",
    pace: "Easy Vibe",
    songs: 24,
    duration: "1h 15m",
    color: "from-blue-600/40 to-purple-900/40",
    glow: "shadow-[0_0_30px_rgba(37,99,235,0.3)]",
    icon: <Headphones size={24} />,
    coverPlaceholder: "bg-gradient-to-br from-blue-600 to-indigo-900"
  },
  {
    id: "4plUlZnjpajccqtnEGWIB8",
    title: "Long Run Zone",
    type: "Endurance / Zone 2",
    intensity: "Medium",
    pace: "Steady",
    songs: 50,
    duration: "3h 20m",
    color: "from-orange-600/40 to-red-900/40",
    glow: "shadow-[0_0_30px_rgba(249,115,22,0.3)]",
    icon: <Activity size={24} />,
    coverPlaceholder: "bg-gradient-to-br from-orange-500 to-red-800"
  },
  {
    id: "0eFQxlZhhR8Dxhr5xFrvIE",
    title: "Speed Work",
    type: "Tempo / Intervals",
    intensity: "High",
    pace: "Threshold",
    songs: 35,
    duration: "1h 45m",
    color: "from-emerald-600/40 to-teal-900/40",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    icon: <Zap size={24} />,
    coverPlaceholder: "bg-gradient-to-br from-emerald-500 to-teal-800"
  },
  {
    id: "3rrVN8cSsmsRWD00KFxEcH",
    title: "Night Runner",
    type: "Late Night Cruise",
    intensity: "Fluctuating",
    pace: "Vibes",
    songs: 42,
    duration: "2h 10m",
    color: "from-zinc-600/40 to-black/40",
    glow: "shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    icon: <Moon size={24} />,
    coverPlaceholder: "bg-gradient-to-br from-zinc-700 to-black"
  }
];

export default function RunnerMusic() {
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const handlePlay = (playlist) => {
    // If clicking same playlist, toggle off the player
    if (activePlaylist?.id === playlist.id) {
      setActivePlaylist(null);
    } else {
      setActivePlaylist(playlist);
    }
  };

  return (
    <div className="relative z-10 w-full py-32 px-6 bg-[#050505] overflow-hidden">
      
      {/* Background Ambient Visualizer Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-full max-h-[800px] pointer-events-none opacity-30 mix-blend-screen flex items-center justify-center">
         {activePlaylist && (
           <motion.div 
             key={activePlaylist.id}
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: [1, 1.05, 1], filter: ["blur(100px)", "blur(120px)", "blur(100px)"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className={`w-[60vw] h-[60vw] rounded-full bg-gradient-to-br ${activePlaylist.color}`}
           />
         )}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-md"
          >
            <Music size={14} className="text-orange-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Runner's High</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white"
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Soundtrack</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 mt-6 max-w-2xl text-sm md:text-base leading-relaxed"
          >
            Music isn't just background noise. It's the metronome for your heart rate, the fuel for the final kilometer. Tap a frequency to sync your pace.
          </motion.p>
        </div>

        {/* Playlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
          {RUNNING_PLAYLISTS.map((playlist, idx) => (
              <motion.div 
                key={playlist.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group w-full h-[380px]"
              >
                {/* Glow Backdrop */}
                <div className={`absolute inset-0 bg-gradient-to-br ${playlist.color} rounded-[2rem] blur-xl opacity-30 transition-opacity duration-700 -z-10`} />

                {/* Card Container Local Audio Player */}
                <div className="relative h-full bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between transition-all duration-300 hover:border-orange-500/30">
                   
                   {/* Visual Top Area */}
                   <div>
                     <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-white ${playlist.coverPlaceholder} drop-shadow-2xl`}>
                        {playlist.icon}
                     </div>
                     <h3 className="text-2xl font-black text-white mb-2">{playlist.title}</h3>
                     <p className="text-zinc-400 text-sm font-medium mb-4">{playlist.type}</p>
                     
                     <div className="flex flex-wrap gap-2 mb-6">
                        <span className="bg-white/5 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                          {playlist.intensity}
                        </span>
                        <span className="bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                          {playlist.pace}
                        </span>
                     </div>
                   </div>

                   {/* Native Audio Control at the bottom */}
                   <div className="w-full mt-auto">
                     <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-2 pl-2">Track Preview</p>
                     <div className="w-full bg-white/5 rounded-full px-2 py-1 border border-white/10">
                       <audio 
                         controls 
                         className="w-full h-8 outline-none" 
                         src="/raga.mp3" 
                         controlsList="nodownload"
                         style={{ 
                           filter: 'invert(80%) hue-rotate(180deg) brightness(1.5)', 
                           borderRadius: '999px' 
                         }}
                       ></audio>
                     </div>
                   </div>

                </div>
              </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}