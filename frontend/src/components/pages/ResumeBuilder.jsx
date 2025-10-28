import React, { useState, useEffect, useCallback } from "react";
import { jsPDF } from "jspdf";
import {
  AddIcon,
  DownloadIcon,
  TrashIcon,
  ColorPaletteIcon,
  FontSizeIcon,
} from "../icons/PageIcons";

// --- INITIAL DATA ---
const initialData = {
  personalDetails: {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    linkedin: "linkedin.com/in/priya-sharma",
    summary:
      "Passionate B.Tech student with a focus on AI/ML. Eager to apply my skills in a challenging internship role.",
  },
  experiences: [
    {
      id: 1,
      title: "Summer Intern",
      company: "Tech Solutions Inc.",
      duration: "May 2023 - Aug 2023",
      description:
        "- Developed a sentiment analysis model for customer feedback.\n- Improved response accuracy by 15%.",
    },
  ],
  educations: [
    {
      id: 1,
      degree: "B.Tech in Computer Science",
      school: "RGUKT",
      duration: "2021 - 2025",
    },
  ],
  projects: [
    {
      id: 1,
      name: "AI Chatbot for Education",
      description:
        "Built a chatbot using TensorFlow to answer student queries on various subjects.",
    },
  ],
  skills:
    "Python, Machine Learning, Data Analysis, React.js, Node.js, TensorFlow, SQL, Git",
  customSections: [],
};

// --- HELPER COMPONENT ---
const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  isTextArea = false,
}) => (
  <div className="mb-3">
    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
      {label}
    </label>
    {isTextArea ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="input-field text-sm w-full border p-2 rounded"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field text-sm w-full border p-2 rounded"
      />
    )}
  </div>
);

const ResumeBuilder = () => {
  // --- STATE MANAGEMENT ---
  const [versions, setVersions] = useState([
    { id: Date.now(), name: "My First Resume", data: initialData },
  ]);
  const [activeVersionId, setActiveVersionId] = useState(versions[0].id);
  const [customization, setCustomization] = useState({
    template: "classic",
    color: "#6D28D9",
    fontSize: 10,
  });
  const [activeResume, setActiveResume] = useState(versions[0].data);

  useEffect(() => {
    const activeVer = versions.find((v) => v.id === activeVersionId);
    if (activeVer) setActiveResume(activeVer.data);
  }, [activeVersionId, versions]);

  const updateActiveResume = useCallback(
    (updater) => {
      const updatedResume = updater(activeResume);
      setActiveResume(updatedResume);
      setVersions((prevVersions) =>
        prevVersions.map((v) =>
          v.id === activeVersionId ? { ...v, data: updatedResume } : v
        )
      );
    },
    [activeResume, activeVersionId]
  );

  // --- HANDLERS ---
  const handleAddItem = (section) => {
    updateActiveResume((prev) => ({
      ...prev,
      [section]: [
        ...prev[section],
        {
          id: Date.now(),
          title: "",
          company: "",
          duration: "",
          description: "",
          degree: "",
          school: "",
          name: "",
        },
      ],
    }));
  };

  const handleRemoveItem = (section, id) => {
    updateActiveResume((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  const handleItemChange = (section, id, field, value) => {
    updateActiveResume((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleDownload = () => {
    const doc = new jsPDF("p", "pt", "a4");
    const {
      personalDetails,
      experiences,
      educations,
      projects,
      skills,
      customSections,
    } = activeResume;
    const { color, fontSize } = customization;
    const margin = 40;
    let y = margin;

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(color);
    doc.text(personalDetails.name, margin, y);
    y += 25;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `${personalDetails.email} | ${personalDetails.phone} | ${personalDetails.linkedin}`,
      margin,
      y
    );
    y += 25;

    // Render summary
    doc.setFont("helvetica", "bold");
    doc.setTextColor(color);
    doc.text("SUMMARY", margin, y);
    y += 20;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    const summaryLines = doc.splitTextToSize(personalDetails.summary, 500);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * (fontSize + 2);

    doc.save(`${personalDetails.name.replace(" ", "_")}_Resume.pdf`);
  };

  return (
    <main className="flex-grow w-full bg-gray-50 dark:bg-gray-900/50 p-6 grid grid-cols-2 gap-6">
      {/* LEFT: FORM */}
      <div>
        <h2 className="text-xl font-bold mb-4">Resume Editor</h2>

        {/* Personal Details */}
        <InputField
          label="Name"
          value={activeResume.personalDetails.name}
          onChange={(val) =>
            updateActiveResume((prev) => ({
              ...prev,
              personalDetails: { ...prev.personalDetails, name: val },
            }))
          }
        />
        <InputField
          label="Email"
          value={activeResume.personalDetails.email}
          onChange={(val) =>
            updateActiveResume((prev) => ({
              ...prev,
              personalDetails: { ...prev.personalDetails, email: val },
            }))
          }
        />

        {/* Experience Section */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Experience</h3>
        {activeResume.experiences.map((exp) => (
          <div key={exp.id} className="border p-3 mb-2 rounded">
            <InputField
              label="Title"
              value={exp.title}
              onChange={(val) =>
                handleItemChange("experiences", exp.id, "title", val)
              }
            />
            <InputField
              label="Company"
              value={exp.company}
              onChange={(val) =>
                handleItemChange("experiences", exp.id, "company", val)
              }
            />
            <button
              className="text-red-500 text-sm flex items-center mt-2"
              onClick={() => handleRemoveItem("experiences", exp.id)}
            >
              <TrashIcon className="w-4 h-4 mr-1" /> Remove
            </button>
          </div>
        ))}
        <button
          className="btn btn-primary flex items-center mt-2"
          onClick={() => handleAddItem("experiences")}
        >
          <AddIcon className="w-4 h-4 mr-1" /> Add Experience
        </button>

        {/* Customization */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Customization</h3>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <ColorPaletteIcon /> Color:
            <input
              type="color"
              value={customization.color}
              onChange={(e) =>
                setCustomization((prev) => ({
                  ...prev,
                  color: e.target.value,
                }))
              }
            />
          </label>
          <label className="flex items-center gap-2">
            <FontSizeIcon /> Font Size:
            <input
              type="number"
              min="8"
              max="16"
              value={customization.fontSize}
              onChange={(e) =>
                setCustomization((prev) => ({
                  ...prev,
                  fontSize: Number(e.target.value),
                }))
              }
            />
          </label>
        </div>

        <button
          className="btn btn-secondary flex items-center mt-6"
          onClick={handleDownload}
        >
          <DownloadIcon className="w-5 h-5 mr-2" /> Download PDF
        </button>
      </div>

      {/* RIGHT: PREVIEW */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-2">
          {activeResume.personalDetails.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {activeResume.personalDetails.email} |{" "}
          {activeResume.personalDetails.phone}
        </p>

        {/* Summary */}
        <h3 className="mt-4 font-semibold">Summary</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {activeResume.personalDetails.summary}
        </p>

        {/* Experience Section */}
        <h3 className="mt-4 font-semibold">Experience</h3>
        <ul className="list-disc ml-6">
          {activeResume.experiences.map((exp) => (
            <li key={exp.id}>
              {exp.title} @ {exp.company} ({exp.duration})
            </li>
          ))}
        </ul>

        {/* Education Section */}
        <h3 className="mt-4 font-semibold">Education</h3>
        <ul className="list-disc ml-6">
          {activeResume.educations.map((edu) => (
            <li key={edu.id}>
              {edu.degree} @ {edu.school} ({edu.duration})
            </li>
          ))}
        </ul>

        {/* Projects Section */}
        <h3 className="mt-4 font-semibold">Projects</h3>
        <ul className="list-disc ml-6">
          {activeResume.projects.map((proj) => (
            <li key={proj.id}>
              {proj.name} - {proj.description}
            </li>
          ))}
        </ul>

        {/* Skills Section */}
        <h3 className="mt-4 font-semibold">Skills</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {activeResume.skills}
        </p>

        {/* Custom Sections - This is still not being used */}
        {/* You would need a loop here if you wanted to display them */}

      </div>
    </main>
  );
};

export default ResumeBuilder;