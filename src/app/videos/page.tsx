"use client";

import { Video, Play } from "lucide-react";

const videos = [
  { id: "v1", title: "Python Tutorial for Beginners", duration: "45:00", description: "Học Python từ đầu với các ví dụ thực tế", views: "12.3K" },
  { id: "v2", title: "Variables & Data Types Explained", duration: "12:35", description: "Hiểu cách lưu trữ dữ liệu trong Python", views: "8.1K" },
  { id: "v3", title: "Control Flow — If/Else & Loops", duration: "18:20", description: "Điều khiển luồng chạy của chương trình", views: "6.5K" },
  { id: "v4", title: "Functions in Python", duration: "15:45", description: "Tái sử dụng code với functions", views: "5.2K" },
  { id: "v5", title: "Bubble Sort Visualization", duration: "8:30", description: "Xem Bubble Sort hoạt động từng bước", views: "15.7K" },
  { id: "v6", title: "Binary Search Explained", duration: "10:15", description: "Tìm kiếm nhị phân với visualization", views: "9.8K" },
];

export default function VideosPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Video Lessons</h1>
        <p className="text-text-secondary">Video bổ sung cho bài học tương tác</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="press card-hover rounded-xl border border-surface-3 bg-surface-2 overflow-hidden cursor-pointer"
          >
            <div className="relative h-32 bg-surface-3 flex items-center justify-center">
              <Play className="h-10 w-10 text-text-muted" strokeWidth={1.5} />
              <span className="absolute bottom-2 right-2 rounded bg-surface-0/80 px-1.5 py-0.5 text-xs text-text-secondary">
                {video.duration}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-text-primary text-sm mb-1">{video.title}</h3>
              <p className="text-xs text-text-muted mb-2">{video.description}</p>
              <div className="flex items-center gap-2 text-xs text-text-faint">
                <span className="flex items-center gap-1">
                  <Video className="h-3 w-3" strokeWidth={1.5} />
                  {video.views} views
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
