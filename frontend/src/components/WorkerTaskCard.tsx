import React from 'react'

type WorkerTaskCardProps = {
  task: any;
  variant: string;
};

const WorkerTaskCard = ({ task, variant }: WorkerTaskCardProps) => {
  return (
        <div
            className={`relative overflow-hidden rounded-2xl shadow-xl p-7 text-white transform transition duration-300 hover:scale-105 hover:shadow-2xl ${variant} animate-fade-in-up WorkerTaskCard`}
        >
            <div className="absolute right-4 top-4 opacity-20 text-6xl pointer-events-none select-none">🛠️</div>
            <h2 className="text-2xl font-bold mb-2 drop-shadow">{task.TASK_TITLE}</h2>
            <p className="mb-3 text-sm">{task.TASK_DESC}</p>
            <div className="mb-2 flex items-center gap-2">
                <span className="font-semibold">Deadline:</span>
                <span className="bg-white/20 px-2 py-1 rounded text-xs">{task.DEADLINE}</span>
            </div>
            <div className="mb-5 flex items-center gap-2">
                <span className="font-semibold">Assigned by:</span>
                <span className="bg-white/20 px-2 py-1 rounded text-xs">{task.ADMIN_NAME}</span>
            </div>
            <div className="flex gap-3">
                <button className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-200/30">
                    Done
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-yellow-200/30">
                    Hold
                </button>
            </div>
        </div>
    );
}

export default WorkerTaskCard