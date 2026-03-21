import React, { useState, useEffect, useRef } from "react";
import { User } from "lucide-react";
import { ref, onValue, query, orderByChild, limitToLast } from "firebase/database";
import { rdb } from "./firebaseconfig";
import { usePatient } from "./PatientContext";

const MSG_LIMIT = 100;

function PatientConv() {
  const { selectedPatientId, selectedPatient, loading } = usePatient();
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  // Listen to messages from RDB for the selected patient
  useEffect(() => {
    if (!selectedPatientId) return;

    setMessages([]); // Reset on patient change

    const rdbPath = `patients/${selectedPatientId}/messages`;
    console.log("[PatientConv] Listening to RDB path:", rdbPath);

    const messagesRef = ref(rdb, rdbPath);
    const messagesQuery = query(messagesRef, orderByChild("timestamp"), limitToLast(MSG_LIMIT));

    const unsubscribe = onValue(messagesQuery, (snapshot) => {
      const data = snapshot.val();
      console.log("[PatientConv] Messages received:", data);
      if (data) {
        // Convert object to array and sort by timestamp
        const msgArray = Object.entries(data).map(([key, val]) => ({
          id: key,
          ...val,
        }));
        msgArray.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        setMessages(msgArray);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [selectedPatientId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex items-center justify-center">
        <p className="text-sm text-gray-400 animate-pulse">Loading conversations...</p>
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

  const patientName = selectedPatient.nom || "Patient";
  const patientImage = selectedPatient.imagePersonne?.url;

  // Format timestamp to readable time
  const formatTime = (ts) => {
    if (!ts) return "";
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4 text-center border border-gray-100">
        <h2 className="text-sm font-bold text-gray-800">AI Assistant Conversations</h2>
        <p className="text-xs text-gray-500">{patientName} & Memoria AI</p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 max-h-[500px]">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-300">No conversations yet for this patient</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 ${msg.sender === "Patient" ? "justify-end" : ""}`}>

              {/* AI Avatar */}
              {msg.sender === "AI" && (
                <div className="bg-teal-600 rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                  AI
                </div>
              )}

              {/* Chat Bubble */}
              <div className={`p-3 text-sm max-w-[80%] ${msg.sender === "AI"
                ? "bg-teal-500 text-white rounded-tr-xl rounded-br-xl rounded-bl-xl"
                : "bg-sky-400 text-white rounded-tl-xl rounded-br-xl rounded-bl-xl text-right"
                }`}>
                <div className={`flex justify-between items-center mb-1 gap-3 ${msg.sender === "Patient" ? "flex-row-reverse" : ""}`}>
                  <span className="font-bold text-xs">{msg.sender}</span>
                  <span className="text-[10px] opacity-70">{formatTime(msg.timestamp)}</span>
                </div>
                {msg.text}
              </div>

              {/* Patient Avatar */}
              {msg.sender === "Patient" && (
                <div className="bg-gray-200 rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-gray-500 overflow-hidden">
                  {patientImage ? (
                    <img src={patientImage} alt={patientName} className="h-full w-full object-cover" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>
              )}

            </div>
          ))
        )}
      </div>

      {/* Footer info */}
      <div className="mt-3 pt-3 border-t border-gray-100 text-center">
        <p className="text-[10px] text-gray-400">
          Showing last {messages.length} message{messages.length !== 1 ? "s" : ""} • Real-time updates
        </p>
      </div>
    </div>
  );
}

export default PatientConv;