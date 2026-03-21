import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebaseconfig";

const PatientContext = createContext(null);

export function usePatient() {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatient must be used within a PatientProvider");
  }
  return context;
}

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all active patients from Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, "Personnes"), where("Actif", "==", true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const patientList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatients(patientList);

      // Auto-select first patient if none selected or current selection no longer exists
      if (patientList.length > 0) {
        setSelectedPatientId((prev) => {
          if (!prev || !patientList.find((p) => p.id === prev)) {
            return patientList[0].id;
          }
          return prev;
        });
      } else {
        setSelectedPatientId(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || null;

  return (
    <PatientContext.Provider
      value={{
        patients,
        selectedPatientId,
        setSelectedPatientId,
        selectedPatient,
        loading,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}
