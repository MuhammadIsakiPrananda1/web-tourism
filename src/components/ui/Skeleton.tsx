"use client";

export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="glass-dark rounded-[32px] overflow-hidden h-[380px] border border-white/5 flex flex-col">
          <div className="h-48 w-full bg-white/5"></div>
          <div className="p-6 flex flex-col flex-1">
            <div className="h-4 w-2/3 bg-white/5 rounded-full mb-3"></div>
            <div className="h-3 w-1/2 bg-white/5 rounded-full mb-8"></div>
            <div className="mt-auto flex justify-between items-end">
              <div className="space-y-2">
                <div className="h-2 w-12 bg-white/5 rounded-full"></div>
                <div className="h-4 w-24 bg-white/5 rounded-full"></div>
              </div>
              <div className="w-10 h-10 bg-white/5 rounded-xl"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
