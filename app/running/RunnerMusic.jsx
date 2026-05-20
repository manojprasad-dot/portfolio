"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, FastForward, SkipBack, Music, Headphones, Activity, Zap, Moon } from "lucide-react";

// Mock Data for Playlists - User can replace Spotify IDs here
const RUNNING_PLAYLISTS = [
  {
    id: "37i9dQZF1DXaXB8fQg7xif", // Replace with your Spotify Playlist ID
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
    id: "37i9dQZF1EIdYWEXvceCc2", // Replace
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
    id: "37i9dQZF1EIeO67z4E62B0", // Replace
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
    id: "37i9dQZF1DWZq91oLsHZvy", // Replace
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
          {RUNNING_PLAYLISTS.map((playlist, idx) => {
             const isActive = activePlaylist?.id === playlist.id;

             return (
              <motion.div 
                key={playlist.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onHoverStart={() => setHoveredIdx(idx)}
                onHoverEnd={() => setHoveredIdx(null)}
                className={`relative group cursor-pointer ${isActive ? 'scale-[1.02]' : ''} transition-transform duration-500`}
                onClick={() => handlePlay(playlist)}
              >
                {/* Glow Backdrop */}
                <div className={`absolute inset-0 bg-gradient-to-br ${playlist.color} rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 ${isActive ? 'opacity-100' : ''} transition-opacity duration-700 -z-10`} />

                {/* Card Container */}
                <div className={`relative h-full bg-white/[0.02] backdrop-blur-3xl border ${isActive ? 'border-orange-500/50' : 'border-white/5 group-hover:border-white/20'} rounded-[2rem] p-4 flex flex-col transition-colors duration-500 overflow-hidden`}>
                   
                   {/* Cover Art Area */}
                   <div className={`w-full aspect-square rounded-[1.5rem] mb-6 relative overflow-hidden ${playlist.coverPlaceholder} flex items-center justify-center ${isActive ? playlist.glow : ''}`}>
                      {/* Placeholder for Spotify iframe or cover image */}
                      <span className="text-white/30 group-hover:text-white/80 transition-colors drop-shadow-2xl scale-150 relative z-10">
                        {playlist.icon}
                      </span>

                      {/* Hover Play Button */}
                      <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                         <div className="w-16 h-16 rounded-full bg-orange-500 text-black flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                           <Play size={24} className="ml-1" fill="currentColor" />
                         </div>
                      </div>

                      {/* Equalizer overlay when active */}
                      {isActive && (
                        <div className="absolute bottom-4 right-4 flex items-end gap-1 h-6">
                           {[1,2,3,4].map(bar => (
                             <motion.div 
                               key={bar}
                               animate={{ height: ["4px", "20px", "4px"] }}
                               transition={{ duration: Math.random() * 0.5 + 0.5, repeat: Infinity, ease: "easeInOut" }}
                               className="w-1.5 bg-orange-500 rounded-t-sm"
                             />
                           ))}
                        </div>
                      )}
                   </div>

                   {/* Info Area */}
                   <div className="flex-1 flex flex-col justify-between px-2 pb-2">
                     <div>
                       <h3 className="text-xl font-bold text-white tracking-tight mb-2">{playlist.title}</h3>
                       <div className="flex items-center gap-2 mb-4">
                         <span className="bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                           {playlist.intensity}
                         </span>
                         <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
                           {playlist.pace}
                         </span>
                       </div>
                     </div>

                     <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Type</span>
                          <span className="text-sm text-zinc-300 font-medium">{playlist.type}</span>
                        </div>
                        <div className="text-right flex flex-col">
                          <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Tracks</span>
                          <span className="text-sm text-zinc-300 font-medium">{playlist.songs}</span>
                        </div>
                     </div>
                   </div>

                </div>
              </motion.div>
             )
          })}
        </div>

      </div>

      {/* Floating Spotify Player Dock */}
      <AnimatePresence>
        {activePlaylist && (
          <motion.div 
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50 pointer-events-auto"
          >
            <div className="relative group">
              {/* Massive Glow Behind Player */}
              <div className="absolute -inset-4 bg-orange-600/20 blur-2xl rounded-full opacity-50 pointer-events-none group-hover:opacity-80 transition-opacity" />
              
              {/* Player Container */}
              <div className="relative bg-[#121212]/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-2 shadow-2xl flex items-center justify-between h-[90px] md:h-[100px] overflow-hidden">
                
                {/* Close Button / Info Area */}
                <div className="absolute top-2 right-4 z-20">
                   <button onClick={() => setActivePlaylist(null)} className="text-[10px] text-zinc-500 hover:text-white uppercase font-bold tracking-wider transition-colors">
                     Dismiss
                   </button>
                </div>

                {/* The Actual Spotify iFrame Overlaying */}
                <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black/90 pointer-events-none">
                   <span className="text-white text-xs tracking-widest uppercase font-bold">Interact with Player Below</span>
                </div>

                {/* Spotify Embed */}
                <iframe 
                  style={{ borderRadius: '12px', zIndex: 5, position: 'relative' }} 
                  src={`https://open.spotify.com/embed/playlist/${activePlaylist.id}?utm_source=generator&theme=0`} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allowFullScreen="" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                ></iframe>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}