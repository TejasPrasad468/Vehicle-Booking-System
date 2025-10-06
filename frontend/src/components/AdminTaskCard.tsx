import React from 'react'

type AdminTaskCardProps = {
  task: any;
  variant: string;
};

const AdminTaskCard = ({ task, variant }: AdminTaskCardProps) => {
  return (
        <div
            className={`relative overflow-hidden rounded-2xl shadow-xl p-7 text-white transform transition duration-300 hover:scale-105 hover:shadow-2xl ${variant} animate-fade-in-up AdminTaskCard `}
        >
            <div className="absolute right-4 top-4 opacity-20 text-6xl pointer-events-none select-none">👑</div>
            <h2 className="text-2xl font-bold mb-2 drop-shadow">{task.TASK_TITLE}</h2>
            <p className="mb-3 text-sm">{task.TASK_DESC}</p>
            <div className="mb-2 flex items-center gap-2">
                <span className="font-semibold">Deadline:</span>
                <span className="bg-white/20 px-2 py-1 rounded text-xs">{task.DEADLINE}</span>
            </div>
            <div className="mb-5 flex items-center gap-2">
                <span className="font-semibold">Assigned to:</span>
                <span className="bg-white/20 px-2 py-1 rounded text-xs">{task.WORKER_NAME}</span>
            </div>
            <div className="flex gap-3">
                <button className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-red-200/30">
                    Reject
                </button>
                <button className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-green-200/30">
                    Approve
                </button>
            </div>
        </div>
    );
}

export default AdminTaskCard