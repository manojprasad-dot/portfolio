"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import polyline from "@mapbox/polyline";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Flame, Timer, Mountain, MapPin, Footprints, ChevronDown, Music, TrendingUp, Calendar, Zap, LayoutDashboard, Crown } from "lucide-react";
import Lenis from "lenis";
import RunnerMusic from "./RunnerMusic";

// Custom Cyber-Map Component for glowing routes
const RouteMap = ({ polylineStr, height = "h-40" }) => {
  if (!polylineStr) return <div className={`${height} bg-zinc-950/50 rounded-xl flex items-center justify-center text-zinc-600 border border-zinc-900/50`}>No GPS Data</div>;
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
    <div className={`${height} w-full bg-black rounded-2xl overflow-hidden flex items-center justify-center p-2 relative group border border-white/5`}>
       <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
       <svg viewBox={`0 0 ${100 + padding*2} ${100 + padding*2}`} className="w-full h-full drop-shadow-[0_0_12px_rgba(249,115,22,0.8)] filter">
         <polyline points={svgPoints} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 transition-all" />
       </svg>
    </div>
  );
};

export default function RunningPage() {
  const [runs, setRuns] = useState([]);
  const [stats, setStats] = useState({ totalDist: 0, totalElev: 0, totalTime: 0, calories: 0, longestRun: 0, avgPaceSecs: 0 });
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
        if (Array.isArray(data) && data.length > 0) {
          setRuns(data);
          const dist = data.reduce((acc, r) => acc + r.distance, 0);
          const elev = data.reduce((acc, r) => acc + r.total_elevation_gain, 0);
          const time = data.reduce((acc, r) => acc + r.moving_time, 0);
          const maxDist = Math.max(...data.map(r => r.distance));
          
          setStats({ 
            totalDist: dist, 
            totalElev: Math.round(elev), 
            totalTime: time, 
            calories: Math.floor((dist/1000) * 62), // Approx 62 calories per km
            longestRun: maxDist,
            avgPaceSecs: dist > 0 ? (time / (dist / 1000)) : 0
          });
        }
      });
  }, []);

  const formatPace = (secs) => {
    if (!secs || !isFinite(secs)) return "0:00";
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}'${s.toString().padStart(2, '0')}"`;
  };

  const chartData = Array.isArray(runs) ? runs.slice(0, 15).reverse().map(run => ({
    name: new Date(run.start_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
    distance: parseFloat((run.distance / 1000).toFixed(2)),
    runData: run
  })) : [];

  const latestRun = runs.length > 0 ? runs[0] : null;

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload.runData;
      return (
        <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
          <p className="text-xl font-black text-white mb-2">{payload[0].value} <span className="text-sm font-normal text-zinc-400">km</span></p>
          <div className="flex gap-4 text-xs">
            <p className="text-zinc-400"><span className="text-orange-500">Pace:</span> {formatPace(data.moving_time / (data.distance / 1000))}</p>
            <p className="text-zinc-400"><span className="text-orange-500">Elev:</span> {data.total_elevation_gain}m</p>
          </div>
        </div>
      );
    }
    return null;
  };

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
        <motion.div initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1, ease: "easeOut" }} className="text-center z-10 w-full max-w-7xl">
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
            { label: "Total Sessions", val: runs.length || 0, unit: "runs" },
            { label: "Average Pace", val: formatPace(stats.avgPaceSecs), unit: "/km" },
            { label: "Energy Expended", val: stats.calories.toLocaleString(), unit: "kcal" }
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }} className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-3xl p-6 flex flex-col items-center justify-center group hover:bg-white/[0.05] hover:border-orange-500/30 transition-all hover:-translate-y-2 relative overflow-hidden">
              <span className="text-4xl md:text-5xl font-black text-white group-hover:text-orange-500 transition-colors drop-shadow-md relative z-10">{s.val}</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500 mt-2 relative z-10 text-center">{s.label} ({s.unit})</span>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
          <ChevronDown size={32} className="text-zinc-600 hover:text-orange-500 transition-colors" />
        </motion.div>
      </section>


      {/* 2. RE-DESIGNED PERFORMANCE DASHBOARD */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-white/5 pb-10">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-3"><LayoutDashboard className="inline-block text-orange-500 mb-2 mr-2" size={48}/> Analytics <br/><span className="text-zinc-700">Hub</span></h2>
            <p className="text-zinc-500 tracking-widest uppercase text-sm font-bold">Real-Time Performance Engine</p>
          </div>
          <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20 backdrop-blur-md self-start md:self-auto">
            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>
            <span className="text-xs font-bold tracking-widest uppercase">Live Strava Sync</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Main Chart + Highlights (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 backdrop-blur-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 shrink-0"><Crown size={24}/></div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-tight mb-1">Longest Run</p>
                  <p className="text-2xl font-black text-white">{(stats.longestRun / 1000).toFixed(1)} <span className="text-sm text-zinc-500 font-normal">km</span></p>
                </div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 backdrop-blur-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 shrink-0"><TrendingUp size={24}/></div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-tight mb-1">Elevation Gain</p>
                  <p className="text-2xl font-black text-white">{stats.totalElev} <span className="text-sm text-zinc-500 font-normal">m</span></p>
                </div>
              </div>
              <div className="bg-orange-600 border border-orange-500 rounded-3xl p-6 backdrop-blur-md flex items-center gap-4 col-span-2 md:col-span-1 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center text-white shrink-0"><Zap size={24} className="fill-white"/></div>
                <div>
                  <p className="text-[10px] text-orange-200 font-bold uppercase tracking-widest leading-tight mb-1">Current Focus</p>
                  <p className="text-2xl font-black text-white">Endurance</p>
                </div>
              </div>
            </div>

            {/* Glowing Mileage Chart */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-3xl relative overflow-hidden flex-1 group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-[80px]" />
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-500 flex items-center gap-2"><Activity size={16} className="text-orange-500"/> Activity Volume</h3>
                <span className="text-xs bg-white/5 px-3 py-1 rounded-full text-zinc-400 font-medium">Last 15 Sessions</span>
              </div>
              
              <div className="h-64 w-full relative z-10 ml-[-20px] md:ml-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorDist" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} dx={-10} hide className="md:show" />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2, strokeDasharray: "5 5" }}/>
                    <Area type="monotone" dataKey="distance" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorDist)" activeDot={{ r: 6, fill: '#f97316', stroke: '#000', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Right Col: Latest Run + Compact Spotify (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Latest Run Highlights */}
            {latestRun && (
              <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6 backdrop-blur-3xl relative overflow-hidden group hover:border-orange-500/30 transition-colors flex-1 flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-orange-500/20 text-orange-500 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full flex items-center gap-1"><Flame size={12}/> Latest Output</span>
                    <span className="text-zinc-500 text-xs font-medium">{new Date(latestRun.start_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-6 pr-4 leading-tight">{latestRun.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-y-6 text-sm mb-6">
                    <div>
                      <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-1">Distance</p>
                      <p className="text-2xl font-black text-white">{(latestRun.distance / 1000).toFixed(2)}<span className="text-xs text-zinc-500 font-normal ml-1">km</span></p>
                    </div>
                    <div>
                      <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-1">Avg Pace</p>
                      <p className="text-2xl font-black text-white">{formatPace(latestRun.moving_time / (latestRun.distance / 1000))}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-1">Time</p>
                      <p className="text-lg font-bold text-zinc-300">{(latestRun.moving_time / 60).toFixed(0)} <span className="text-sm font-normal text-zinc-500">min</span></p>
                    </div>
                    <div>
                      <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-1">Elevation</p>
                      <p className="text-lg font-bold text-zinc-300">{latestRun.total_elevation_gain} <span className="text-sm font-normal text-zinc-500">m</span></p>
                    </div>
                  </div>
                  <RouteMap polylineStr={latestRun.map?.summary_polyline} height="h-32"/>
                </div>
              </div>
            )}

            {/* Compact Spotify Player */}
            <div className="bg-[#121212] border border-white/5 rounded-3xl p-4 backdrop-blur-3xl h-40 relative">
               <iframe 
                  style={{ borderRadius: '16px' }} 
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DXdOEFt9ZX0dh?utm_source=generator&theme=0" 
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
        </div>
      </section>

      {/* 3. INTERACTIVE RUNNING FEED MAPS */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto border-t border-white/5 mt-10">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-12 flex items-center gap-4 text-zinc-500">
          <Calendar size={32} className="text-zinc-700"/> Previous Deployments
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {runs.slice(1, 7).map((run, i) => (
            <motion.div initial={{ opacity: 0, y: 50, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1, duration: 0.6 }} key={run.id} className="bg-white/[0.02] backdrop-blur-2xl p-6 md:p-8 rounded-[2rem] border border-white/5 hover:border-zinc-700 transition-all group relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white truncate max-w-[180px] mb-1">{run.name}</h3>
                    <p className="text-[10px] tracking-widest uppercase text-zinc-500">{new Date(run.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <MapPin size={20} className="text-zinc-600" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-zinc-600 uppercase tracking-widest text-[9px] font-bold mb-1">Distance</p>
                    <p className="text-xl font-bold text-white">{(run.distance / 1000).toFixed(2)}<span className="text-xs text-zinc-500 ml-1">km</span></p>
                  </div>
                  <div>
                    <p className="text-zinc-600 uppercase tracking-widest text-[9px] font-bold mb-1">Pace</p>
                    <p className="text-xl font-bold text-white">{formatPace(run.moving_time / (run.distance / 1000))}</p>
                  </div>
                </div>

                <RouteMap polylineStr={run.map?.summary_polyline} height="h-28" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. TRANSFORMATION TIMELINE */}
      <section className="py-32 px-6 relative z-10 bg-white/[0.01] border-t border-white/5">
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
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-[4px] border-[#050505] bg-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.8)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-500 group-hover:scale-125">
                  <Flame size={20} fill="currentColor" />
                </div>
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

      {/* SOUNDTRACK EXPERIENCE */}
      <RunnerMusic />

      {/* 5. PHILOSOPHY & FOOTER */}
      <section className="py-40 px-6 relative z-10 text-center bg-gradient-to-b from-transparent via-orange-950/20 to-[#050505]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }} className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-[6rem] font-black uppercase tracking-tighter mb-12 text-white leading-[1.1]">
            "Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">kilometer</span> builds <br /> discipline <span className="italic font-normal text-zinc-500">beyond fitness.</span>"
          </h2>
          <p className="text-orange-500 tracking-[0.2em] uppercase text-sm font-bold mb-20 drop-shadow-[0_0_10px_#f97316]">Discipline is built one run at a time.</p>
          <a href="https://www.strava.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.1em] transition-all hover:scale-110 shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(249,115,22,0.6)]">
            Connect on Strava <Activity size={24} />
          </a>
        </motion.div>
      </section>
    </div>
  );
}