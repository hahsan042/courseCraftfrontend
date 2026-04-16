

"use client";

import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_URI;

interface Video {
  title: string;
  url: string;
}

interface Course {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  videos: Video[];
}

export default function AdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // 🎬 multiple videos
  const [videos, setVideos] = useState<Video[]>([
    { title: "", url: "" },
  ]);

  // ================= Fetch Courses =================
  const fetchCourses = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v2/courses`);
      const data = await res.json();
      setCourses(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ================= Add Course =================
  const handleAddCourse = async () => {
    if (!title || !price || !image || !description) {
      alert("সব ফিল্ড পূরণ করুন");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/v2/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price: Number(price),
          image,
          description,
          videos, // ✅ send as array
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Course added ✅");

        setCourses([data.data, ...courses]);

        // reset
        setTitle("");
        setPrice("");
        setImage("");
        setDescription("");
        setVideos([{ title: "", url: "" }]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= Delete Course =================
  const handleDelete = async (id: string) => {
    await fetch(`${BASE_URL}/api/v2/courses/${id}`, {
      method: "DELETE",
    });

    setCourses(courses.filter((c) => c._id !== id));
  };

  // ================= Video Handlers =================
  const addVideoField = () => {
    setVideos([...videos, { title: "", url: "" }]);
  };

  const handleVideoChange = (
    index: number,
    field: keyof Video,
    value: string
  ) => {
    const updated = [...videos];
    updated[index][field] = value;
    setVideos(updated);
  };

  const removeVideo = (index: number) => {
    const updated = videos.filter((_, i) => i !== index);
    setVideos(updated);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* ================= FORM ================= */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 space-y-4">

        <input
          type="text"
          placeholder="Course Title"
          className="w-full p-3 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-3 border rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* ================= Videos ================= */}
        <div>
          <h3 className="font-bold mb-2">Course Videos</h3>

          {videos.map((video, index) => (
            <div key={index} className="flex gap-2 mb-2">

              <input
                type="text"
                placeholder="Video Title"
                className="p-2 border rounded w-1/3"
                value={video.title}
                onChange={(e) =>
                  handleVideoChange(index, "title", e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Video URL"
                className="p-2 border rounded w-2/3"
                value={video.url}
                onChange={(e) =>
                  handleVideoChange(index, "url", e.target.value)
                }
              />

              <button
                onClick={() => removeVideo(index)}
                className="bg-red-500 text-white px-3 rounded"
              >
                X
              </button>
            </div>
          ))}

          <button
            onClick={addVideoField}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            + Add Video
          </button>
        </div>

        <button
          onClick={handleAddCourse}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Add Course
        </button>
      </div>

      {/* ================= COURSE LIST ================= */}
      <div className="grid gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div className="flex gap-4">
              <img
                src={course.image}
                className="w-20 h-20 rounded object-cover"
              />

              <div>
                <h2 className="font-bold text-lg">{course.title}</h2>
                <p className="text-gray-500">{course.description}</p>
                <p className="text-blue-600 font-bold">
                  ৳ {course.price}
                </p>

                {/* Videos count */}
                <p className="text-sm text-gray-400">
                  Videos: {course.videos?.length || 0}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDelete(course._id)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
