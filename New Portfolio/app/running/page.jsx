"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import polyline from "@mapbox/polyline";
import { motion, useScroll } from "framer-motion";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  Calendar,
  ChevronDown,
  Crown,
  Flame,
  LayoutDashboard,
  MapPin,
  TrendingUp,
  Zap,
} from "lucide-react";
import Lenis from "lenis";
import RunnerMusic from "./RunnerMusic";

const RouteMap = ({ polylineStr, height = "h-40" }) => {
  if (!polylineStr) {
    return (
      <div
        className={`${height} flex items-center justify-center rounded-xl border border-zinc-900/50 bg-zinc-950/50 text-zinc-600`}
      >
        No GPS Data
      </div>
    );
  }

  const points = polyline.decode(polylineStr);

  if (points.length === 0) {
    return null;
  }

  const lats = points.map((point) => point[0]);
  const lngs = points.map((point) => point[1]);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const rangeLat = maxLat - minLat || 1;
  const rangeLng = maxLng - minLng || 1;
  const padding = 10;

  const svgPoints = points
    .map((point) => {
      const x = ((point[1] - minLng) / rangeLng) * 100 + padding;
      const y = ((maxLat - point[0]) / rangeLat) * 100 + padding;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div
      className={`${height} group relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-black p-2`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <svg
        viewBox={`0 0 ${100 + padding * 2} ${100 + padding * 2}`}
        className="h-full w-full drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]"
      >
        <polyline
          points={svgPoints}
          fill="none"
          stroke="#f97316"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-80 transition-all group-hover:opacity-100"
        />
      </svg>
    </div>
  );
};

const defaultStats = {
  totalDist: 0,
  totalElev: 0,
  totalTime: 0,
  calories: 0,
  longestRun: 0,
  avgPaceSecs: 0,
};

export default function RunningPage() {
  const [runs, setRuns] = useState([]);
  const [stats, setStats] = useState(defaultStats);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      smoothWheel: true,
    });

    let frameId = 0;

    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/strava", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Unable to load Strava data");
        }

        return data;
      })
      .then((data) => {
        if (!isMounted) {
          return;
        }

        if (Array.isArray(data) && data.length > 0) {
          setRuns(data);

          const totalDist = data.reduce((sum, run) => sum + run.distance, 0);
          const totalElev = data.reduce(
            (sum, run) => sum + run.total_elevation_gain,
            0
          );
          const totalTime = data.reduce((sum, run) => sum + run.moving_time, 0);
          const longestRun = Math.max(...data.map((run) => run.distance));

          setStats({
            totalDist,
            totalElev: Math.round(totalElev),
            totalTime,
            calories: Math.floor((totalDist / 1000) * 62),
            longestRun,
            avgPaceSecs: totalDist > 0 ? totalTime / (totalDist / 1000) : 0,
          });
        }

        setStatus("ready");
      })
      .catch((err) => {
        if (!isMounted) {
          return;
        }

        setError(err.message || "Unable to load Strava data");
        setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const formatPace = (secs) => {
    if (!secs || !Number.isFinite(secs)) {
      return "0:00";
    }

    const mins = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);

    return `${mins}'${seconds.toString().padStart(2, "0")}"`;
  };

  const chartData = Array.isArray(runs)
    ? runs
        .slice(0, 15)
        .reverse()
        .map((run) => ({
          name: new Date(run.start_date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          }),
          distance: Number((run.distance / 1000).toFixed(2)),
          runData: run,
        }))
    : [];

  const latestRun = runs.length > 0 ? runs[0] : null;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload.runData;

      return (
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-4 shadow-2xl backdrop-blur-xl">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
            {label}
          </p>
          <p className="mb-2 text-xl font-black text-white">
            {payload[0].value}{" "}
            <span className="text-sm font-normal text-zinc-400">km</span>
          </p>
          <div className="flex gap-4 text-xs">
            <p className="text-zinc-400">
              <span className="text-orange-500">Pace:</span>{" "}
              {formatPace(data.moving_time / (data.distance / 1000))}
            </p>
            <p className="text-zinc-400">
              <span className="text-orange-500">Elev:</span>{" "}
              {data.total_elevation_gain}m
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-[#050505] font-sans text-white selection:bg-orange-500"
    >
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-zinc-900">
        <motion.div
          className="h-full bg-orange-500 shadow-[0_0_10px_#f97316]"
          style={{ scaleX: scrollYProgress, originX: 0 }}
        />
      </div>

      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[50vw] w-[50vw] rounded-full bg-orange-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[20%] right-[-10%] h-[40vw] w-[40vw] rounded-full bg-zinc-600/10 blur-[120px]" />

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-10 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-10 w-full max-w-7xl text-center"
        >
          <div className="mb-6 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-300 transition hover:border-orange-500/40 hover:text-white"
            >
              Back to Portfolio
            </Link>
          </div>
          <h1 className="mb-6 text-6xl font-black uppercase leading-none tracking-tighter md:text-[10rem]">
            Relentless <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              Pursuit
            </span>
          </h1>
          <p className="mb-16 text-lg font-medium uppercase tracking-widest text-zinc-400 md:text-2xl">
            Running taught me discipline.{" "}
            <span className="text-white">Cybersecurity taught me consistency.</span>
          </p>
        </motion.div>

        <div className="relative z-10 grid w-full max-w-6xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {[
            {
              label: "Total Distance",
              val: (stats.totalDist / 1000).toFixed(1),
              unit: "km",
            },
            { label: "Total Sessions", val: runs.length || 0, unit: "runs" },
            {
              label: "Average Pace",
              val: formatPace(stats.avgPaceSecs),
              unit: "/km",
            },
            {
              label: "Energy Expended",
              val: stats.calories.toLocaleString(),
              unit: "kcal",
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-3xl transition-all hover:-translate-y-2 hover:border-orange-500/30 hover:bg-white/[0.05]"
            >
              <span className="relative z-10 text-4xl font-black text-white drop-shadow-md transition-colors group-hover:text-orange-500 md:text-5xl">
                {item.val}
              </span>
              <span className="relative z-10 mt-2 block text-center text-[10px] uppercase tracking-widest text-zinc-500 md:text-xs">
                {item.label} ({item.unit})
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown size={32} className="text-zinc-600 transition-colors hover:text-orange-500" />
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex flex-col gap-6 border-b border-white/5 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-3 text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
              <LayoutDashboard
                className="mb-2 mr-2 inline-block text-orange-500"
                size={48}
              />
              Analytics <br />
              <span className="text-zinc-700">Hub</span>
            </h2>
            <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">
              Real-Time Performance Engine
            </p>
          </div>
          <div
            className={`self-start rounded-full border px-4 py-2 backdrop-blur-md md:self-auto ${
              status === "error"
                ? "border-red-500/20 bg-red-500/10 text-red-400"
                : "border-green-500/20 bg-green-500/10 text-green-500"
            }`}
          >
            <div className="flex items-center gap-2">
              {status !== "error" && (
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>
              )}
              <span className="text-xs font-bold uppercase tracking-widest">
                {status === "loading"
                  ? "Loading Strava Data"
                  : status === "error"
                    ? "Strava Unavailable"
                    : "Live Strava Sync"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              <div className="flex items-center gap-4 rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-500">
                  <Crown size={24} />
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase leading-tight tracking-widest text-zinc-500">
                    Longest Run
                  </p>
                  <p className="text-2xl font-black text-white">
                    {(stats.longestRun / 1000).toFixed(1)}{" "}
                    <span className="text-sm font-normal text-zinc-500">km</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-500">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase leading-tight tracking-widest text-zinc-500">
                    Elevation Gain
                  </p>
                  <p className="text-2xl font-black text-white">
                    {stats.totalElev}{" "}
                    <span className="text-sm font-normal text-zinc-500">m</span>
                  </p>
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-4 rounded-3xl border border-orange-500 bg-orange-600 p-6 shadow-[0_0_30px_rgba(249,115,22,0.2)] md:col-span-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/20 text-white">
                  <Zap size={24} className="fill-white" />
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase leading-tight tracking-widest text-orange-200">
                    Current Focus
                  </p>
                  <p className="text-2xl font-black text-white">Endurance</p>
                </div>
              </div>
            </div>

            <div className="group relative flex-1 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-3xl md:p-8">
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-orange-600/5 blur-[80px]" />
              <div className="relative z-10 mb-8 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
                  <Activity size={16} className="text-orange-500" />
                  Activity Volume
                </h3>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400">
                  Last 15 Sessions
                </span>
              </div>

              {chartData.length > 0 ? (
                <div className="relative z-10 ml-[-20px] h-64 w-full md:ml-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorDist" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        stroke="#52525b"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                      />
                      <YAxis
                        stroke="#52525b"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        dx={-10}
                        hide
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{
                          stroke: "rgba(255,255,255,0.1)",
                          strokeWidth: 2,
                          strokeDasharray: "5 5",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="distance"
                        stroke="#f97316"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorDist)"
                        activeDot={{
                          r: 6,
                          fill: "#f97316",
                          stroke: "#000",
                          strokeWidth: 2,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="relative z-10 flex h-64 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-black/20 px-6 text-center text-sm leading-7 text-zinc-500">
                  {status === "loading"
                    ? "Pulling the latest running sessions from Strava."
                    : error || "No recent running sessions available yet."}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-4">
            {latestRun ? (
              <div className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-900 p-6 backdrop-blur-3xl transition-colors hover:border-orange-500/30">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10 flex-1">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-1 rounded-full bg-orange-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-500">
                      <Flame size={12} />
                      Latest Output
                    </span>
                    <span className="text-xs font-medium text-zinc-500">
                      {new Date(latestRun.start_date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="mb-6 pr-4 text-2xl font-bold leading-tight text-white">
                    {latestRun.name || "Latest Run"}
                  </h3>

                  <div className="mb-6 grid grid-cols-2 gap-y-6 text-sm">
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        Distance
                      </p>
                      <p className="text-2xl font-black text-white">
                        {(latestRun.distance / 1000).toFixed(2)}
                        <span className="ml-1 text-xs font-normal text-zinc-500">km</span>
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        Avg Pace
                      </p>
                      <p className="text-2xl font-black text-white">
                        {formatPace(latestRun.moving_time / (latestRun.distance / 1000))}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        Time
                      </p>
                      <p className="text-lg font-bold text-zinc-300">
                        {(latestRun.moving_time / 60).toFixed(0)}{" "}
                        <span className="text-sm font-normal text-zinc-500">min</span>
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        Elevation
                      </p>
                      <p className="text-lg font-bold text-zinc-300">
                        {latestRun.total_elevation_gain}{" "}
                        <span className="text-sm font-normal text-zinc-500">m</span>
                      </p>
                    </div>
                  </div>

                  <RouteMap polylineStr={latestRun.map?.summary_polyline} height="h-32" />
                </div>
              </div>
            ) : (
              <div className="flex-1 rounded-3xl border border-white/5 bg-zinc-900 p-6 backdrop-blur-3xl">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Latest Output
                </p>
                <p className="mb-4 text-2xl font-black text-white">
                  Waiting for activity data
                </p>
                <p className="text-sm leading-7 text-zinc-400">
                  {status === "loading"
                    ? "The dashboard is loading recent sessions."
                    : error || "Once Strava activities are available, the latest summary will appear here."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-10 max-w-7xl border-t border-white/5 px-6 py-24">
        <h2 className="mb-12 flex items-center gap-4 text-2xl font-black uppercase tracking-tight text-zinc-500 md:text-4xl">
          <Calendar size={32} className="text-zinc-700" />
          Previous Deployments
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {runs.slice(1, 7).map((run, index) => (
            <motion.div
              key={run.id}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 backdrop-blur-2xl transition-all hover:border-zinc-700 md:p-8"
            >
              <div className="relative z-10">
                <div className="mb-6 flex items-start justify-between border-b border-white/5 pb-4">
                  <div>
                    <h3 className="mb-1 max-w-[180px] truncate text-lg font-bold text-white">
                      {run.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                      {new Date(run.start_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <MapPin size={20} className="text-zinc-600" />
                </div>

                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                      Distance
                    </p>
                    <p className="text-xl font-bold text-white">
                      {(run.distance / 1000).toFixed(2)}
                      <span className="ml-1 text-xs text-zinc-500">km</span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                      Pace
                    </p>
                    <p className="text-xl font-bold text-white">
                      {formatPace(run.moving_time / (run.distance / 1000))}
                    </p>
                  </div>
                </div>

                <RouteMap polylineStr={run.map?.summary_polyline} height="h-28" />
              </div>
            </motion.div>
          ))}
        </div>

        {runs.length <= 1 && (
          <div className="mt-6 rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] px-6 py-8 text-center text-sm leading-7 text-zinc-500">
            More run cards will appear here after a few synced activities are available.
          </div>
        )}
      </section>

      <section className="relative z-10 border-t border-white/5 bg-white/[0.01] px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-24 text-center">
            <h2 className="text-5xl font-black uppercase leading-none tracking-tighter text-transparent bg-gradient-to-br from-white to-zinc-700 bg-clip-text md:text-8xl">
              The <br />
              Evolution
            </h2>
          </div>

          <div className="relative space-y-16 before:absolute before:inset-0 before:ml-5 before:h-full before:w-[2px] before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-orange-500/50 before:to-transparent md:before:mx-auto md:before:translate-x-0">
            {[
              {
                year: "2023",
                title: "The Starting Line",
                desc: "Started at 100kg. Decided to rewrite the codebase of physical health and treated every step like a small but meaningful commit.",
              },
              {
                year: "2024",
                title: "Breaking the 10K Barrier",
                desc: "Consistency compounded. Running became a daily routine, and the 10K barrier finally fell with a pace that reflected disciplined repetition.",
              },
              {
                year: "2025",
                title: "Half Marathon Standard",
                desc: "Endurance unlocked. The mental resilience needed for longer races began to mirror the focus required in long cybersecurity sessions.",
              },
              {
                year: "2026",
                title: "Athlete-Engineer",
                desc: "Now combining deep technical focus with physical endurance, using both to build a sharper mindset for ambitious long-term work.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.year}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -100 : 100,
                  filter: "blur(10px)",
                }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="group relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
              >
                <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[4px] border-[#050505] bg-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.8)] transition-transform duration-500 group-hover:scale-125 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Flame size={20} fill="currentColor" />
                </div>
                <div className="w-[calc(100%-4rem)] rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-2xl transition-all duration-500 group-hover:border-orange-500/40 group-hover:bg-white/[0.04] md:w-[calc(50%-4rem)] md:p-10">
                  <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-orange-500">
                    {item.year}
                  </span>
                  <h4 className="mb-4 text-3xl font-black tracking-tight text-white">
                    {item.title}
                  </h4>
                  <p className="text-base leading-relaxed text-zinc-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <RunnerMusic />

      <section className="relative z-10 bg-gradient-to-b from-transparent via-orange-950/20 to-[#050505] px-6 py-40 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mx-auto max-w-5xl"
        >
          <h2 className="mb-12 text-5xl font-black uppercase leading-[1.1] tracking-tighter text-white md:text-[6rem]">
            Every{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              kilometer
            </span>{" "}
            builds <br />
            discipline <span className="font-normal italic text-zinc-500">beyond fitness.</span>
          </h2>
          <p className="mb-20 text-sm font-bold uppercase tracking-[0.2em] text-orange-500 drop-shadow-[0_0_10px_#f97316]">
            Discipline is built one run at a time.
          </p>
          <a
            href="https://strava.app.link/lYuJbrXxk3b"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-orange-600 px-10 py-5 text-white shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all hover:scale-110 hover:bg-orange-500 hover:shadow-[0_0_60px_rgba(249,115,22,0.6)]"
          >
            <span className="text-sm font-black uppercase tracking-[0.1em]">
              Connect on Strava
            </span>
            <Activity size={24} />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
