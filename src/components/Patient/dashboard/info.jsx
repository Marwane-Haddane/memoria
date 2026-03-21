import React, { useState, useEffect, useRef } from "react";
import { Heart, Sun, Moon, Activity } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { rdb } from "./firebaseconfig";
import { usePatient } from "./PatientContext";

const MAX_GRAPH_POINTS = 60; // Keep last 60 data points on the graph

function TempGraph({ tempHistory }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || tempHistory.length === 0) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 20, right: 15, bottom: 25, left: 35 };

    const graphW = width - padding.left - padding.right;
    const graphH = height - padding.top - padding.bottom;

    // Calculate Y-axis range (auto-scale with min range of 2°C)
    const temps = tempHistory.map((p) => p.temp);
    let minT = Math.min(...temps);
    let maxT = Math.max(...temps);
    if (maxT - minT < 2) {
      const mid = (maxT + minT) / 2;
      minT = mid - 1;
      maxT = mid + 1;
    }
    // Add 10% padding
    const rangeT = maxT - minT;
    minT -= rangeT * 0.1;
    maxT += rangeT * 0.1;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 0.5;
    const gridSteps = 4;
    for (let i = 0; i <= gridSteps; i++) {
      const y = padding.top + (graphH / gridSteps) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Y-axis labels
      const tempVal = maxT - ((maxT - minT) / gridSteps) * i;
      ctx.fillStyle = "#9ca3af";
      ctx.font = "10px Inter, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(tempVal.toFixed(1) + "°", padding.left - 5, y + 3);
    }

    if (tempHistory.length < 2) return;

    const xStep = graphW / (MAX_GRAPH_POINTS - 1);

    // Calculate points
    const points = tempHistory.map((p, i) => ({
      x: padding.left + i * xStep,
      y: padding.top + graphH - ((p.temp - minT) / (maxT - minT)) * graphH,
    }));

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, "rgba(20, 184, 166, 0.25)");
    gradient.addColorStop(1, "rgba(20, 184, 166, 0.02)");

    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding.bottom);
    ctx.lineTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const cpx = (points[i - 1].x + points[i].x) / 2;
      ctx.bezierCurveTo(cpx, points[i - 1].y, cpx, points[i].y, points[i].x, points[i].y);
    }
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const cpx = (points[i - 1].x + points[i].x) / 2;
      ctx.bezierCurveTo(cpx, points[i - 1].y, cpx, points[i].y, points[i].x, points[i].y);
    }
    ctx.strokeStyle = "#14b8a6";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Latest point dot
    const last = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#14b8a6";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(last.x, last.y, 6, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(20, 184, 166, 0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Latest value label
    const latestTemp = temps[temps.length - 1];
    ctx.fillStyle = "#0f766e";
    ctx.font = "bold 11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(latestTemp.toFixed(1) + "°C", last.x, last.y - 12);

  }, [tempHistory]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={180}
      className="w-full h-auto"
    />
  );
}

function PatientInfoPanel() {
  const { selectedPatientId, selectedPatient, loading } = usePatient();
  const [rdbData, setRdbData] = useState({ status: "-", temperature: 0 });
  const [tempHistory, setTempHistory] = useState([]);

  // Listen to RDB for real-time status & temperature
  useEffect(() => {
    if (!selectedPatientId) return;

    // Reset everything when switching patients
    setTempHistory([]);
    setRdbData({ status: "-", temperature: 0 });

    const rdbPath = `patients/${selectedPatientId}`;
    console.log("[info.jsx] Listening to RDB path:", rdbPath);

    const patientRef = ref(rdb, rdbPath);
    const unsubscribe = onValue(patientRef, (snapshot) => {
      const data = snapshot.val();
      console.log("[info.jsx] RDB data received:", data);
      if (data) {
        setRdbData({
          status: data.status || "-",
          temperature: data.temperature || 0,
        });
        // Append new temperature point to the graph
        setTempHistory((prev) => {
          const newPoint = { temp: data.temperature || 0, time: Date.now() };
          const updated = [...prev, newPoint];
          // Keep only the last MAX_GRAPH_POINTS
          return updated.slice(-MAX_GRAPH_POINTS);
        });
      } else {
        console.warn("[info.jsx] No RDB data found at path:", rdbPath);
      }

    });

    return () => unsubscribe();
  }, [selectedPatientId]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex items-center justify-center">
        <p className="text-sm text-gray-400 animate-pulse">Loading patient info...</p>
      </div>
    );
  }

  if (!selectedPatient) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex items-center justify-center">
        <p className="text-sm text-gray-400">No patient selected</p>
      </div>
    );
  }

  const statusColor = rdbData.status === "active" ? "bg-teal-500" : "bg-gray-400";
  const tempColor = rdbData.temperature > 38 ? "text-red-500" : rdbData.temperature > 37.5 ? "text-amber-500" : "text-teal-600";

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col gap-5">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">Patient Info</h2>
        <p className="text-sm text-gray-500 font-medium">
          Monitoring: <span className="text-gray-800 font-semibold">{selectedPatient.nom}</span>
        </p>
      </div>

      {/* Real-time Temperature Graph */}
      <div className="border border-gray-100 rounded-lg p-4 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-500" />
            <h3 className="text-sm font-bold text-gray-700">Body Temperature</h3>
          </div>
          <span className={`text-lg font-bold ${tempColor}`}>
            {rdbData.temperature}°C
          </span>
        </div>
        <TempGraph tempHistory={tempHistory} />
        <p className="text-[10px] text-gray-400 mt-1 text-center">
          Live — updates on each sensor reading ({tempHistory.length} point{tempHistory.length !== 1 ? "s" : ""})
        </p>
      </div>

      {/* Health Status Indicators */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3">Health Status</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className={`${statusColor} p-2 rounded-full text-white`}>
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Status</p>
              <p className="text-xs text-gray-500 uppercase">{rdbData.status}</p>
            </div>
          </div>
          <div className="flex flex-col border-l border-gray-200 pl-4 justify-center">
            <div className="flex items-center gap-2 text-teal-500 mb-1">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-bold">Vitals</span>
            </div>
            <p className={`text-sm font-bold ${tempColor}`}>{rdbData.temperature}°C</p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="bg-blue-500 p-2 rounded-full text-white">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Age</p>
              <p className="text-xs text-gray-500">{selectedPatient.Age} years</p>
            </div>
          </div>
          <div className="flex flex-col border-l border-gray-200 pl-4 justify-center mt-2 gap-1">
            <span className="text-xs text-gray-500">Description</span>
            <span className="text-xs text-gray-700 line-clamp-2">{selectedPatient.Description}</span>
          </div>
        </div>
      </div>

      {/* Patient Card */}
      <div className="mt-auto border border-gray-200 rounded-lg p-3 flex items-center gap-4">
        <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center text-gray-500 overflow-hidden">
          {selectedPatient.imagePersonne?.url ? (
            <img
              src={selectedPatient.imagePersonne.url}
              alt={selectedPatient.nom}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold">{selectedPatient.nom?.charAt(0)?.toUpperCase()}</span>
          )}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800">{selectedPatient.nom}</p>
          <p className="text-xs text-gray-500">ID: {selectedPatientId?.slice(0, 8)}...</p>
          {selectedPatient.personnesConnues?.length > 0 && (
            <p className="text-xs text-gray-400">
              {selectedPatient.personnesConnues.length} known {selectedPatient.personnesConnues.length === 1 ? "person" : "people"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientInfoPanel;