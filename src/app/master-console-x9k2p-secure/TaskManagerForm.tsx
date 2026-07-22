"use client";

import { useState } from "react";
import { createTask, deleteTask } from "./actions";

export default function TaskManagerForm({ tasks }: { tasks: any[] }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleCreate = async (formData: FormData) => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await createTask(formData);
      if (res.error) {
        setMessage({ text: res.error, type: "error" });
      } else {
        setMessage({ text: res.success ? res.message : "Success", type: "success" });
      }
    } catch (err) {
      setMessage({ text: "Something went wrong.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await deleteTask(taskId);
      if (res.error) {
        setMessage({ text: res.error, type: "error" });
      } else {
        setMessage({ text: res.success ? res.message : "Success", type: "success" });
      }
    } catch (err) {
      setMessage({ text: "Something went wrong.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-200 mb-8 bg-blue-50/30">
      <h3 className="text-lg font-bold mb-4 text-blue-900">Task Manager</h3>
      <p className="text-sm text-gray-600 mb-4">Create and manage dynamic tasks.</p>
      
      <form action={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Task Title</label>
          <input type="text" name="title" required placeholder="e.g. Offline Handwriting" className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Reward (₹)</label>
          <input type="number" name="reward" required placeholder="500" className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Activation Fee (₹)</label>
          <input type="number" name="fee" required placeholder="300" className="w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Submission Email</label>
          <input type="email" name="submission_email" required defaultValue="info.microdesk@gmail.com" className="w-full border rounded p-2 text-sm" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Google Drive Direct Link (export=download)</label>
          <input type="url" name="drive_link" required placeholder="https://drive.google.com/uc?export=download&id=..." className="w-full border rounded p-2 text-sm" />
        </div>
        <div className="md:col-span-2">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 w-full disabled:opacity-50">
            {loading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>

      {message.text && (
        <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
          {message.text}
        </div>
      )}

      <div className="mt-8">
        <h4 className="font-bold text-gray-700 mb-2">Existing Tasks</h4>
        <div className="space-y-3">
          {tasks?.map(task => (
            <div key={task.task_id} className="flex justify-between items-center p-3 border rounded bg-white">
              <div>
                <p className="font-semibold text-sm">{task.title}</p>
                <p className="text-xs text-gray-500">Fee: ₹{task.activation_fee} | Reward: ₹{task.reward_amount}</p>
              </div>
              <button onClick={() => handleDelete(task.task_id)} disabled={loading} className="text-red-500 hover:text-red-700 text-sm font-semibold">Delete</button>
            </div>
          ))}
          {(!tasks || tasks.length === 0) && <p className="text-sm text-gray-500 italic">No tasks created yet.</p>}
        </div>
      </div>
    </div>
  );
}
