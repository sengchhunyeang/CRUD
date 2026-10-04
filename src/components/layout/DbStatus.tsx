"use client";

import { useEffect, useState } from "react";
import { API_ROUTES } from "@/constants";
import { cn } from "@/lib/utils";

type Status = "checking" | "connected" | "disconnected";

const statusStyles: Record<Status, { dot: string; label: string }> = {
  checking: { dot: "bg-yellow-400 animate-pulse", label: "Connecting..." },
  connected: { dot: "bg-green-500", label: "Database connected" },
  disconnected: { dot: "bg-red-500", label: "Database disconnected" },
};

const POLL_INTERVAL_MS = 10_000;

export function DbStatus() {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let ignore = false;

    function check() {
      fetch(API_ROUTES.health)
        .then(async (res) => {
          const data = await res.json();
          if (!ignore) setStatus(res.ok && data.status === "connected" ? "connected" : "disconnected");
        })
        .catch(() => !ignore && setStatus("disconnected"));
    }

    check();
    const timer = setInterval(check, POLL_INTERVAL_MS);
    return () => {
      ignore = true;
      clearInterval(timer);
    };
  }, []);

  const { dot, label } = statusStyles[status];

  return (
    <span className="flex items-center gap-2 text-xs text-gray-500">
      <span className={cn("h-2 w-2 rounded-full", dot)} />
      {label}
    </span>
  );
}
