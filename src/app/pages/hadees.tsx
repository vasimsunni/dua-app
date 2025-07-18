"use client";
import { useState, useEffect } from "react";
import Accordion from "../components/accordion";

type HadeesItem = {
  id: number;
  title: string;
  type: string;
  content: string;
  imageData: string;
};

export default function Hadees({ items }: { items: HadeesItem[] }) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [filterType, setFilterType] = useState("hadees"); // default fallback

  // Read from localStorage on first load
  useEffect(() => {
    const storedType = localStorage.getItem("filterType");
    if (storedType === "quran" || storedType === "hadees") {
      setFilterType(storedType);
    }
  }, []);

  // Save to localStorage when filter changes
  const handleFilterChange = (type: string) => {
    setFilterType(type);
    localStorage.setItem("filterType", type);
  };

  const handleToggle = (id: number) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };
  const filteredItems = items.filter((item) => item.type === filterType);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Filter buttons */}
      <div className="grid grid-cols-2 gap-4 mb-4 w-full">
        <button
          onClick={() => handleFilterChange("hadees")}
          className={`px-4 py-2 rounded ${filterType === "hadees"
            ? "bg-slate-600 text-white"
            : "bg-gray-300 text-black"
            }`}
        >
          Hadees
        </button>
        <button
          onClick={() => handleFilterChange("quran")}
          className={`px-4 py-2 rounded ${filterType === "quran"
            ? "bg-slate-600 text-white"
            : "bg-gray-300 text-black"
            }`}
        >
          Quran
        </button>
      </div>

      {/* Accordion list */}
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <Accordion
            key={item.id}
            title={item.title}
            content={item.content}
            imageData={item.imageData}
            isOpen={openAccordion === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center">No items found.</p>
      )}
    </div>
  );
}
