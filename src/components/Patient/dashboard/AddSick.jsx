import { UserGroupIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react';
import { db, rdb } from './firebaseconfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, set } from "firebase/database";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

export default function Example() {
  const [nom, setNom] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [profileImageFile, setProfileImageFile] = useState(null);

  // Array for Known People (personnesConnues)
  const [personnesConnues, setPersonnesConnues] = useState([{ id: Date.now(), nom: '', relation: '', file: null }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- ARRAY LOGIC ---
  const addPerson = () => setPersonnesConnues([...personnesConnues, { id: Date.now(), nom: '', relation: '', file: null }]);
  const removePerson = (id) => setPersonnesConnues(personnesConnues.filter(p => p.id !== id));

  const handlePersonChange = (id, field, value) => {
    setPersonnesConnues(personnesConnues.map(person =>
      person.id === id ? { ...person, [field]: value } : person
    ));
  };

  // --- CLOUDINARY UPLOAD HELPER ---
  const uploadToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      return { url: data.secure_url, publicId: data.public_id };
    } catch (error) {
      console.error("Cloudinary Error:", error);
      throw error;
    }
  };

  // --- SUBMISSION PIPELINE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Upload Main Profile Image
      const profileImageResult = await uploadToCloudinary(profileImageFile);

      // 2. Upload Known People Images
      const uploadedKnownPeople = await Promise.all(
        personnesConnues.map(async (person) => {
          const imageResult = await uploadToCloudinary(person.file);
          return {
            // Combining Name & Relation for your 'nom' field (e.g., "Sarah (Daughter)")
            nom: person.relation ? `${person.nom} (${person.relation})` : person.nom,
            image: {
              url: imageResult ? imageResult.url : "",
              publicId: imageResult ? imageResult.publicId : "",
              dateUpload: new Date() // Fallback timestamp for maps
            }
          };
        })
      );

      // 3. Construct Firestore Payload (Matching your screenshot exactly)
      const patientData = {
        Actif: true,
        Age: Number(age),
        Description: description,
        nom: nom,
        temperature: 36.5, // Baseline initialization
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastTempUpdate: serverTimestamp(),
        imagePersonne: {
          url: profileImageResult ? profileImageResult.url : "",
          publicId: profileImageResult ? profileImageResult.publicId : "",
          dateUpload: new Date()
        },
        personnesConnues: uploadedKnownPeople
      };

      // 4. Save to 'Personnes' collection
      const docRef = await addDoc(collection(db, "Personnes"), patientData);
      console.log("Document saved with ID: ", docRef.id);

      // 5. Create matching RDB node for real-time data (IoT sensor + AI chatbot)
      await set(ref(rdb, `patients/${docRef.id}`), {
        firestoreId: docRef.id,
        name: nom,
        status: "active",
        temperature: 36.5,
      });
      console.log("RDB node created at patients/" + docRef.id);

      alert("Patient saved successfully to database!");

      // Reset Form
      setNom(''); setAge(''); setDescription(''); setProfileImageFile(null);
      setPersonnesConnues([{ id: Date.now(), nom: '', relation: '', file: null }]);

    } catch (error) {
      console.error("Pipeline Error: ", error);
      alert("Failed to save patient. Check the console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <form onSubmit={handleSubmit} className="w-full my-2">
        <div className="space-y-12">

          {/* SECTION 1 */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Patient Profile</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-4">
                <label className="block text-sm/6 font-medium text-gray-900">Full Name</label>
                <input type="text" required value={nom} onChange={(e) => setNom(e.target.value)} className="mt-2 block w-full rounded-md border-gray-300 p-2 border sm:text-sm/6" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm/6 font-medium text-gray-900">Age</label>
                <input type="number" required value={age} onChange={(e) => setAge(e.target.value)} className="mt-2 block w-full rounded-md border-gray-300 p-2 border sm:text-sm/6" />
              </div>

              <div className="col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">Description / Medical Notes</label>
                <textarea rows={3} required value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 block w-full rounded-md border-gray-300 p-2 border sm:text-sm/6" />
              </div>

              <div className="col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">Patient Photo</label>
                <input type="file" required accept="image/*" onChange={(e) => setProfileImageFile(e.target.files[0])} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-teal-50 file:text-teal-700" />
              </div>
            </div>
          </div>

          {/* SECTION 2 */}
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex items-center gap-2">
              <UserGroupIcon className="size-6 text-gray-400" />
              <h2 className="text-base/7 font-semibold text-gray-900">Known People</h2>
            </div>

            {personnesConnues.map((person) => (
              <div key={person.id} className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6 p-6 bg-gray-50 rounded-lg border border-gray-200 relative">
                {personnesConnues.length > 1 && (
                  <button type="button" onClick={() => removePerson(person.id)} className="absolute top-4 right-4 text-sm text-red-500 hover:text-red-700">Remove</button>
                )}

                <div className="sm:col-span-3">
                  <label className="block text-sm/6 font-medium text-gray-900">Name</label>
                  <input type="text" required value={person.nom} onChange={(e) => handlePersonChange(person.id, 'nom', e.target.value)} className="mt-2 block w-full rounded-md border-gray-300 p-2 border sm:text-sm/6" />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm/6 font-medium text-gray-900">Relation (Optional)</label>
                  <input type="text" value={person.relation} onChange={(e) => handlePersonChange(person.id, 'relation', e.target.value)} className="mt-2 block w-full rounded-md border-gray-300 p-2 border sm:text-sm/6" placeholder="e.g., Doctor, Daughter" />
                </div>

                <div className="col-span-full">
                  <label className="block text-sm/6 font-medium text-gray-900">Photo</label>
                  <input type="file" required accept="image/*" onChange={(e) => handlePersonChange(person.id, 'file', e.target.files[0])} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-teal-50 file:text-teal-700" />
                </div>
              </div>
            ))}

            <button type="button" onClick={addPerson} className="mt-6 text-sm font-semibold text-teal-600 hover:text-teal-500">
              + Add another person
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="submit" disabled={isSubmitting} className={`rounded-md px-6 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 ${isSubmitting ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-500'}`}>
            {isSubmitting ? 'Processing Uploads & Saving...' : 'Save Patient Data'}
          </button>
        </div>
      </form>
    </div>


  )
}
