"use client";

import { useState } from "react";
import { deleteChurch } from "@/app/churches/actions";

type DeleteChurchButtonProps = {
  churchId: string;
  churchName: string;
};

export default function DeleteChurchButton({
  churchId,
  churchName,
}: DeleteChurchButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    setDeleting(true);

    await deleteChurch(churchId);
  }

  if (confirming) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-red-300">
          Delete {churchName}?
        </p>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-500 disabled:opacity-60"
        >
          {deleting ? "Deleting..." : "Yes, Delete"}
        </button>

        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={deleting}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-xl border border-red-900/70 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-950/40 hover:text-red-300"
    >
      Delete Church
    </button>
  );
}