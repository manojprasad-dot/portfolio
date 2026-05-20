"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import polyline from "@mapbox/polyline";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Flame, Timer, Mountain, MapPin, Calendar, Footprints } from "lucide-react";

// Helper component to draw glowing cyber-maps from Strava data
const RouteMap = ({ polylineStr }) => {
  if (!polylineStr) return <div className="h-32 bg-zinc-950/50 rounded-xl flex items-center justify-center text-zinc-600 border border-zinc-800/50">No GPS Data</div>;
  
  const points = polyline.decode(polylineStr);
  if (points.length === 0) return null;

  const lats = points.map((p) => p[0]);
  const lngs = points.map((p) => p[1]);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);

  const rangeLat = maxLat - minLat || 1;
  const rangeLng = maxLng - minLng || 1;
  const padding = 5;

  const svgPoints = points.map((p) => {
    const x = ((p[1] - minLng) / rangeLng) * 100 + padding;
    const y = ((maxLat - p[0]) / rangeLat) * 100 + padding;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="h-32 w-full bg-black rounded-xl overflow-hidden flex items-center justify-center p-2 relative group mt-4 border border-zinc-800 border-b-orange-500/30">
       <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
       <svg viewBox={`0 0 ${100 + padding*2} ${100 + padding*2}`} className="w-full h-full drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">
         <polyline points={svgPoints} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
       </svg>
    </div>
  );
};

export default function RunningPage() {
  const [runs, setRuns] = useState([]);
  const [stats, setStats] = useState({ totalDist: 0, totalElev: 0, totalTime: 0 });

  useEffect(() => {
    fetch("/api/strava")
      .then((res) => res.json())
      .then((data) => {
        setRuns(data);
        if (Array.isArray(data)) {
          const dist = data.reduce((acc, run) => acc + run.distance, 0);
          const elev = data.reduce((acc, run) => acc + run.total_elevation_gain, 0);
          const time = data.reduce((acc, run) => acc + run.moving_time, 0);
          setStats({ totalDist: dist, totalElev: elev, totalTime: time });
        }
      });
  }, []);

  // Format data for the pace/distance chart
  const chartData = Array.isArray(runs) ? runs.slice(0, 10).reverse().map(run => ({
    name: new Date(run.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    distance: parseFloat((run.distance / 1000).toFixed(2))
  })) : [];

  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 md:p-10 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-800 pb-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2">
            RUNNING <span className="text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">HUD</span>_
          </h1>
          <p className="text-zinc-500 flex items-center gap-2 tracking-widest uppercase text-sm">
            <Activity size={16} className="text-orange-500" /> Strava Biomtrics & Telemetry Active
          </p>
        </div>
        
        {/* Marathon Countdown */}
        <div className="mt-8 md:mt-0 bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-2xl flex items-center gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Next Objective</p>
            <p className="text-xl font-bold text-white">Full Marathon</p>
          </div>
          <div className="h-10 w-px bg-zinc-800"></div>
          <div className="text-center">
            <span className="text-3xl font-black text-orange-500">42</span>
            <span className="text-xs uppercase tracking-widest text-zinc-500 block">Days left</span>
          </div>
        </div>
      </motion.div>

      {Array.isArray(runs) ? (
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Animated Summary Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Distance", val: (stats.totalDist / 1000).toFixed(1) + " KM", icon: Footprints },
              { label: "Total Elevation", val: stats.totalElev.toFixed(0) + " M", icon: Mountain },
              { label: "Moving Time", val: (stats.totalTime / 3600).toFixed(1) + " HR", icon: Timer },
              { label: "Total Activities", val: runs.length, icon: Flame }
            ].map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                key={i} className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl relative overflow-hidden"
              >
                <stat.icon className="absolute -right-4 -bottom-4 w-24 h-24 text-zinc-800/30" strokeWidth={1} />
                <p className="text-sm uppercase tracking-widest text-zinc-500 mb-2 relative z-10">{stat.label}</p>
                <p className="text-4xl font-black text-white relative z-10">{stat.val}</p>
              </motion.div>
            ))}
          </div>

          {/* Data Visualization / Chart Area */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 h-80 relative">
            <div className="absolute top-6 left-8 z-10">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp size={20} className="text-orange-500"/> Recent Mileage Output
              </h2>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 50, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }} itemStyle={{ color: '#f97316' }}/>
                <Area type="monotone" dataKey="distance" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorDistance)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Extracted Runs Feed */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar size={24} className="text-orange-500" /> Recent Deployments
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {runs.slice(0, 6).map((run, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + (i * 0.1) }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  key={run.id}
                  className="bg-zinc-900/80 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white truncate pr-4">{run.name}</h3>
                    <MapPin size={20} className="text-zinc-500 shrink-0" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-4 text-sm mb-4">
                    <div>
                      <p className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold">Distance</p>
                      <p className="text-xl font-bold text-orange-500">{(run.distance / 1000).toFixed(2)}<span className="text-sm font-normal text-zinc-400">km</span></p>
                    </div>
                    <div>
                      <p className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold">Pace</p>
                      <p className="text-xl font-bold text-white">
                        {Math.floor((run.moving_time / 60) / (run.distance / 1000))}'{Math.floor(((run.moving_time / 60) / (run.distance / 1000) % 1) * 60).toString().padStart(2, '0')}"
                      </p>
                    </div>
                    <div>
                      <p className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold">Time</p>
                      <p className="font-medium text-zinc-300">{(run.moving_time / 60).toFixed(0)} min</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold">Elev</p>
                      <p className="font-medium text-zinc-300">{run.total_elevation_gain} m</p>
                    </div>
                  </div>

                  {/* Draw the decoded GPS polyline! */}
                  <RouteMap polylineStr={run.map?.summary_polyline} />
                  
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="col-span-3 text-red-500">
          Error fetching runs or no runs found. Please check your Strava access token and permissions.
          <pre className="text-xs mt-4 text-white overflow-hidden">{JSON.stringify(runs, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
