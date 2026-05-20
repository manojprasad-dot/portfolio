"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import polyline from "@mapbox/polyline";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Flame, Timer, Mountain, MapPin, Footprints, ChevronDown, Repeat, Music, Play, FastForward, Rewind } from "lucide-react";
import Lenis from "lenis";

// Custom Cyber-Map Component for glowing routes
const RouteMap = ({ polylineStr }) => {
  if (!polylineStr) return <div className="h-32 bg-zinc-950/50 rounded-xl flex items-center justify-center text-zinc-600 border border-zinc-900/50">No GPS Data</div>;
  const points = polyline.decode(polylineStr);
  if (points.length === 0) return null;
  const lats = points.map((p) => p[0]), lngs = points.map((p) => p[1]);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
  const rangeLat = maxLat - minLat || 1, rangeLng = maxLng - minLng || 1;
  const padding = 10;
  const svgPoints = points.map((p) => {
    const x = ((p[1] - minLng) / rangeLng) * 100 + padding;
    const y = ((maxLat - p[0]) / rangeLat) * 100 + padding;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="h-40 w-full bg-black rounded-2xl overflow-hidden flex items-center justify-center p-2 relative group border border-white/5 mt-4">
       <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
       <svg viewBox={`0 0 ${100 + padding*2} ${100 + padding*2}`} className="w-full h-full drop-shadow-[0_0_12px_rgba(249,115,22,0.8)] filter">
         <polyline points={svgPoints} fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100" />
       </svg>
    </div>
  );
};

export default function RunningPage() {
  const [runs, setRuns] = useState([]);
  const [stats, setStats] = useState({ totalDist: 0, totalElev: 0, totalTime: 0, calories: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({ 
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smooth: true 
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Fetch Strava Data
  useEffect(() => {
    fetch("/api/strava")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRuns(data);
          const dist = data.reduce((acc, r) => acc + r.distance, 0);
          const elev = data.reduce((acc, r) => acc + r.total_elevation_gain, 0);
          const time = data.reduce((acc, r) => acc + r.moving_time, 0);
          setStats({ 
            totalDist: dist, 
            totalElev: elev, 
            totalTime: time, 
            calories: Math.floor((dist/1000) * 60) // Approx 60 calories per km
          });
        }
      });
  }, []);

  const chartData = Array.isArray(runs) ? runs.slice(0, 15).reverse().map(run => ({
    name: new Date(run.start_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
    distance: parseFloat((run.distance / 1000).toFixed(2))
  })) : [];

  return (
    <div ref={containerRef} className="bg-[#050505] text-white font-sans selection:bg-orange-500 overflow-hidden relative">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 z-50">
        <motion.div className="h-full bg-orange-500 shadow-[0_0_10px_#f97316]" style={{ scaleX: scrollYProgress, originX: 0 }} />
      </div>

      {/* Floating Dynamic Lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-zinc-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1, ease: "easeOut" }} className="text-center z-10">
          <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter uppercase leading-none mb-6">
            Relentless <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]">Pursuit</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-2xl tracking-widest uppercase mb-16 font-medium">
            Running taught me discipline. <span className="text-white">Cybersecurity taught me consistency.</span>
          </p>
        </motion.div>

        {/* Hero Dashboard Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-6xl z-10 relative">
          {[
            { label: "Total Distance", val: (stats.totalDist / 1000).toFixed(1), unit: "km" },
            { label: "Total Runs", val: runs.length || 0, unit: "sessions" },
            { label: "Avg Pace", val: "5:30", unit: "/km" }, // Static avg for design, can be dynamic
            { label: "Energy Expended", val: stats.calories, unit: "kcal" }
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }} className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-3xl p-6 flex flex-col items-center justify-center group hover:bg-white/[0.05] hover:border-orange-500/30 transition-all hover:-translate-y-2 relative overflow-hidden">
              <span className="text-4xl md:text-5xl font-black text-white group-hover:text-orange-500 transition-colors drop-shadow-md relative z-10">{s.val}</span>
              <span className="text-xs uppercase tracking-widest text-zinc-500 mt-2 relative z-10">{s.label} ({s.unit})</span>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
          <ChevronDown size={32} className="text-zinc-600 hover:text-orange-500 transition-colors" />
        </motion.div>
      </section>


      {/* 2. LIVE DASHBOARD & MUSIC */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-2">Strava <br/><span className="text-zinc-700">Telemetry</span></h2>
          </div>
          <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20 backdrop-blur-md">
            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>
            <span className="text-xs font-bold tracking-widest uppercase">Live API Sync</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Graph Area */}
          <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 md:p-10 backdrop-blur-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-[80px]" />
            <h3 className="text-xl font-bold mb-8 text-zinc-300 tracking-wider">MILEAGE OUTPUT (MOVING WINDOW)</h3>
            <div className="h-80 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDist" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(9,9,11,0.9)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff' }} itemStyle={{ color: '#f97316', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="distance" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorDist)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Connected Spotify Music Player UI */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 md:p-10 backdrop-blur-3xl relative overflow-hidden group hover:border-orange-500/20 transition-colors flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex-1 flex flex-col">
              <h3 className="text-sm font-bold tracking-widest mb-6 text-zinc-500 flex items-center gap-2 uppercase"><Music size={16} className="text-orange-500"/> Runner's High</h3>
              
              <div className="w-full flex-1 rounded-2xl overflow-hidden shadow-2xl relative">
                {/* 
                  Note: You provided a User Profile link, but Spotify requires a specific 
                  Playlist, Album, or Track link to play music. 
                  I put a high-energy Cyberpunk running playlist here by default to match your theme! 
                  To change it, right click any of your playlists on Spotify -> Share -> Embed Playlist 
                  and replace the src URL below.
                */}
                <iframe 
                  style={{ borderRadius: '16px' }} 
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DXdOEFt9ZX0dh?utm_source=generator&theme=0" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allowFullScreen="" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 3. INTERACTIVE RUNNING FEED MAPS */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-12 flex items-center gap-4">
          <Footprints size={40} className="text-orange-500"/> Sector Logs
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {runs.slice(0, 6).map((run, i) => (
            <motion.div initial={{ opacity: 0, y: 50, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1, duration: 0.6 }} key={run.id} className="bg-white/[0.02] backdrop-blur-2xl p-6 md:p-8 rounded-[2rem] border border-white/5 hover:border-orange-500/40 transition-all group relative overflow-hidden shadow-2xl">
              
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] group-hover:bg-orange-500/20 transition-colors"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white truncate max-w-[180px] mb-2">{run.name}</h3>
                    <p className="text-xs tracking-widest uppercase text-zinc-500">{new Date(run.start_date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl group-hover:bg-orange-500/20 transition-colors">
                    <MapPin size={24} className="text-zinc-400 group-hover:text-orange-500 transition-colors" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-1">Distance</p>
                    <p className="text-3xl font-black text-white">{(run.distance / 1000).toFixed(2)}<span className="text-base font-normal text-zinc-500 ml-1">km</span></p>
                  </div>
                  <div>
                    <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-1">Pace</p>
                    <p className="text-3xl font-black text-white">
                      {Math.floor((run.moving_time / 60) / (run.distance / 1000))}'{Math.floor(((run.moving_time / 60) / (run.distance / 1000) % 1) * 60).toString().padStart(2, '0')}"
                    </p>
                  </div>
                </div>

                {/* Drawn SVG Route Map */}
                <RouteMap polylineStr={run.map?.summary_polyline} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. TRANSFORMATION TIMELINE */}
      <section className="py-32 px-6 relative z-10 bg-white/[0.01] border-y border-white/5 mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-700 leading-none">
              The <br/> Evolution
            </h2>
          </div>
          
          <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-orange-500/50 before:to-transparent">
            
            {[
              { year: "2023", title: "The Starting Line", desc: "Started at 100kg. Decided to rewrite the codebase of my physical health. Could barely run 1km without stopping, but I treated it like learning a new programming language—one line of code, one step at a time." },
              { year: "2024", title: "Breaking the 10K Barrier", desc: "Consistency compounded. Hit 90kg. Running became a daily routine, much like pushing commits to a server. The 10K barrier was finally broken with a sub-6:00 pace." },
              { year: "2025", title: "Half Marathon Standard", desc: "Endurance unlocked. Registered and completed my first half marathon structure. The mental resilience required perfectly matched the grit needed for long cyber-ops sessions." },
              { year: "2026", title: "Athlete-Engineer", desc: "Full 42.2km marathon in sights. Now combining the deep, unbroken focus required in cybersecurity with the relentless physical endurance of an elite athlete." },
            ].map((item, i) => (
              <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100, filter: "blur(10px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                
                {/* Center Node */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-[4px] border-[#050505] bg-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.8)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-500 group-hover:scale-125">
                  <Flame size={20} fill="currentColor" />
                </div>
                
                {/* Content Box */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2rem] backdrop-blur-2xl group-hover:border-orange-500/40 group-hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
                  <span className="text-orange-500 font-bold tracking-widest text-sm mb-3 block uppercase">{item.year}</span>
                  <h4 className="text-3xl font-black text-white mb-4 tracking-tight">{item.title}</h4>
                  <p className="text-zinc-400 text-base leading-relaxed">{item.desc}</p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PHILOSOPHY & FOOTER */}
      <section className="py-40 px-6 relative z-10 text-center bg-gradient-to-b from-transparent via-orange-950/20 to-[#050505]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }} className="max-w-5xl mx-auto">
          
          <h2 className="text-5xl md:text-[6rem] font-black uppercase tracking-tighter mb-12 text-white leading-[1.1]">
            "Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">kilometer</span> builds <br /> discipline <span className="italic font-normal text-zinc-500">beyond fitness.</span>"
          </h2>
          
          <p className="text-orange-500 tracking-[0.2em] uppercase text-sm font-bold mb-20 drop-shadow-[0_0_10px_#f97316]">
            Discipline is built one run at a time.
          </p>

          <a href="https://www.strava.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.1em] transition-all hover:scale-110 shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(249,115,22,0.6)]">
            Connect on Strava <Activity size={24} />
          </a>
        </motion.div>
      </section>

    </div>
  );
}
