import { createClient } from "@supabase/supabase-js";
import { CheckCircle2, XCircle, Clock, ExternalLink } from "lucide-react";
import ManualApproveForm from "./ManualApproveForm";
import PremiumTaskApproveForm from "./PremiumTaskApproveForm";

export const revalidate = 0; // Disable cache for admin panel

export default async function AdminDashboard() {
  // Use Service Role Key to bypass RLS and fetch all data securely
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: users, error: userError } = await supabaseAdmin
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: tasks, error: taskError } = await supabaseAdmin
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (userError || taskError) {
    return <div className="text-red-500 font-bold p-8">Database Error: {userError?.message || taskError?.message}</div>;
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ManualApproveForm />
        <PremiumTaskApproveForm />
      </div>
      {/* Users Section */}
      <section>
        <h2 className="text-2xl font-bold border-b pb-2 mb-6">Registered Candidates (Onboarding)</h2>
        <div className="bg-white shadow-sm rounded-xl overflow-x-auto border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Age/DOB</th>
                <th className="p-4">Job / Speed / Device</th>
                <th className="p-4">Security Deposit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold">{user.full_name || "N/A"}</td>
                  <td className="p-4">
                    <div className="text-xs text-gray-500">{user.email || "N/A"}</div>
                    <div className="font-mono">{user.mobile_number || "N/A"}</div>
                  </td>
                  <td className="p-4">
                    <div>{user.age || "N/A"} yrs</div>
                    <div className="text-xs text-gray-500">{user.dob || "N/A"}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-blue-600">{user.job_type || "N/A"}</div>
                    <div className="text-xs text-gray-500">{user.typing_speed} • {user.device_type}</div>
                  </td>
                  <td className="p-4">
                    {user.has_paid ? (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                        <CheckCircle2 className="w-3 h-3" /> PAID
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                        <XCircle className="w-3 h-3" /> PENDING
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {(!users || users.length === 0) && (
                <tr><td colSpan={5} className="p-8 text-center text-gray-400">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tasks Section */}
      <section>
        <h2 className="text-2xl font-bold border-b pb-2 mb-6">Submitted Work Tasks (Live Camera Verifications)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks?.map((task) => {
            const relatedUser = users?.find(u => u.id === task.user_id);
            const imgUrl = task.photo_url || task.camera_image_url;
            return (
              <div key={task.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="aspect-video bg-black relative flex items-center justify-center">
                  {imgUrl ? (
                    <img src={imgUrl} alt="Verification" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="text-center p-4 flex flex-col items-center">
                      <CheckCircle2 className="w-10 h-10 text-green-500 mb-2 opacity-80" />
                      <span className="text-white text-sm font-semibold opacity-80">Sample Task Submitted</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    Live Capture
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg">{relatedUser?.full_name || "Unknown User"}</h3>
                    <p className="text-xs text-gray-500 font-mono">{task.user_id}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 h-32 overflow-y-auto">
                    <p className="text-xs text-gray-700 font-serif leading-relaxed">"{task.typed_text}"</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="inline-flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded text-xs font-semibold">
                      <Clock className="w-3 h-3" /> {task.status.toUpperCase()}
                    </span>
                    <a href={task.photo_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs font-semibold flex items-center gap-1">
                      View Original <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
          {(!tasks || tasks.length === 0) && (
            <div className="col-span-full p-12 text-center text-gray-400 border-2 border-dashed rounded-2xl">
              No tasks submitted yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
