"use client";
import { useState } from "react";
import Swal from 'sweetalert2';

export default function AddDua() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        type: "",
        title: "",
        description: "",
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData((prev) => ({ ...prev, image: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const convertToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.type) {
            Swal.fire("Error", "Type is required", "error");
            return;
        }

        if (!formData.title) {
            Swal.fire("Error", "Title is required", "error");
            return;
        }

        if (!formData.image && !formData.description) {
            Swal.fire("Error", "Either Image or Description is required!", "warning");
            return;
        }

        let base64Image = "";
        if (formData.image) {
            base64Image = await convertToBase64(formData.image);
        }

        const newDua = {
            id: Date.now(),
            type: formData.type,
            title: formData.title,
            content: formData.description || "",
            imageData: base64Image,
        };

        try {
            const response = await fetch("/api/dua", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDua),
            });

            if (response.ok) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Dua added successfully!',
                    confirmButtonText: 'OK',
                });
                // Refresh page
                window.location.reload();
            } else {
                const data = await response.json();
                Swal.fire("Error", data.error || "Something went wrong", "error");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "An unexpected error occurred.", "error");
        }
    };

    return (
        <div className="relative w-full max-w-2xl flex items-center justify-center">
            <h1 className="heading text-slate-500">Dua App</h1>
            <button
                onClick={() => setIsModalOpen(true)}
                className="absolute right-0 p-2 rounded-full bg-slate-500 hover:bg-slate-600 text-white w-10 h-10 font-bold"
                aria-label="Add new dua"
                title="Add new dua"
            >
                +
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50" />
                    <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6 z-10">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4 text-slate-500">Add New Dua</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded border border-gray-300 px-3 py-2">
                                    <option value="hadees">Hadees</option>
                                    <option value="quran">Quran</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    onChange={handleInputChange}
                                    value={formData.title}
                                    className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
                                />
                            </div>
                            <p className="text-red-300 text-sm italic">Either Image or Description is required!</p>
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Upload Image (JPEG/PNG)
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept=".jpeg,.jpg,.png"
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full text-sm text-gray-500 border-1 border-slate-300 p-2.5 rounded-[3px]"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
                                />
                            </div>

                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
