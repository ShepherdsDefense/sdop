"use client";

import { useState } from "react";
import { completeTask } from "@/app/tasks/actions";

type CompleteTaskButtonProps = {
  taskId: string;
};

export default function CompleteTaskButton({
  taskId,
}: CompleteTaskButtonProps) {
  const [completing, setCompleting] = useState(false);

  async function handleComplete() {
    setCompleting(true);

    try {
      await completeTask(taskId);
    } finally {
      setCompleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleComplete}
      disabled={completing}
      className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-300 disabled:opacity-60"
    >
      {completing ? "Completing..." : "Complete Task"}
    </button>
  );
}