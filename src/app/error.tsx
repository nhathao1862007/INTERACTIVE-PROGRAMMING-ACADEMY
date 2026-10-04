/**
 * @module app/error
 * Route error boundary. Technical details never reach the user.
 */
"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-card bg-danger/10 text-danger ring-edge">
        <AlertTriangle className="h-6 w-6" strokeWidth={1.6} />
      </span>
      <h1 className="mt-5 font-display text-xl font-bold tracking-tight text-text-strong">
        Đã có lỗi xảy ra
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        Chúng tôi không thể tải nội dung này ngay bây giờ. Vui lòng thử lại.
      </p>
      <Button className="mt-6" onClick={reset}>
        Thử lại
      </Button>
    </div>
  );
}
