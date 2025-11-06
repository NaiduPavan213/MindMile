import React, { useState, useRef } from "react";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";

export default function CreatePostModal({ onClose, onCreated }) {
  const { closeModal } = useModal();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const onDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files || []);
    handleAddFiles(dropped);
  };

  const handleAddFiles = (fileList) => {
    const newFiles = fileList.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (idx) => {
    setFiles((prev) => {
      const next = [...prev];
      URL.revokeObjectURL(next[idx].preview);
      next.splice(idx, 1);
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to post");
    setLoading(true);
    setUploadProgress(0);

    try {
      const form = new FormData();
      form.append("title", title);
      form.append("body", body);
      form.append("tags", tags);
      form.append("visibility", visibility);
      files.forEach((f) => form.append("files", f.file));

      // use XMLHttpRequest so we can track upload progress
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/posts");
        const token =
          localStorage.getItem("mm_token") || localStorage.getItem("authToken");
        if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);

        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) {
            const pct = Math.round((ev.loaded / ev.total) * 100);
            setUploadProgress(pct);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const res = JSON.parse(xhr.responseText);
              resolve(res);
            } catch (e) {
              resolve(xhr.responseText);
            }
          } else {
            reject(new Error(xhr.responseText || "Upload failed"));
          }
        };
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(form);
      });

      // success
      setTitle("");
      setBody("");
      setTags("");
      setFiles([]);
      setUploadProgress(100);
      if (onCreated) onCreated();
      closeModal();
      alert("Post created successfully");
    } catch (err) {
      console.error("Create post error", err);
      alert(err.message || "Post creation failed");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
      <div
        className="bg-black/50 absolute inset-0"
        onClick={() => {
          closeModal();
        }}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="relative bg-white dark:bg-gray-900 rounded-lg w-full max-w-2xl shadow-lg p-6 z-10"
      >
        <h3 className="text-lg font-semibold mb-3">Create Post</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (optional)"
          className="w-full mb-2 px-3 py-2 rounded border"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share something..."
          className="w-full mb-2 px-3 py-2 rounded border h-28"
        />
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="tags comma separated"
          className="w-full mb-2 px-3 py-2 rounded border"
        />
        <div className="mb-3">
          <label className="mr-2">Visibility:</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="px-2 py-1 rounded border"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="course">Course</option>
          </select>
        </div>

        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="mb-3 p-4 border-2 border-dashed rounded text-center"
        >
          <p className="mb-2">Drag & drop images/videos here, or</p>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Choose files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => handleAddFiles(Array.from(e.target.files))}
          />
        </div>

        {files.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-3">
            {files.map((f, i) => (
              <div key={i} className="relative border rounded overflow-hidden">
                {f.file.type.startsWith("image") ? (
                  <img
                    src={f.preview}
                    alt={f.file.name}
                    className="w-full h-24 object-cover"
                  />
                ) : (
                  <video src={f.preview} className="w-full h-24 object-cover" />
                )}
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 bg-white/80 rounded-full px-2"
                >
                  x
                </button>
                <div className="p-1 text-xs">{f.file.name}</div>
              </div>
            ))}
          </div>
        )}

        {uploadProgress > 0 && (
          <div className="mb-3">
            <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
              <div
                style={{ width: `${uploadProgress}%` }}
                className="bg-green-500 h-2"
              ></div>
            </div>
            <div className="text-sm mt-1">Uploading {uploadProgress}%</div>
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => closeModal()}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-purple-600 text-white"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
