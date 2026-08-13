"use client";

import { useState } from "react";
import { scheduleFollowUp } from "@/app/churches/actions";

type SetNextFollowUpButtonProps = {
  churchId: string;
};

export default function SetNextFollowUpButton({
  churchId,
}: SetNextFollowUpButtonProps) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSaving(true);

    try {
      await scheduleFollowUp(churchId, formData);
      setOpen(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-400"
      >
        {open ? "Cancel" : "Set Next Follow-Up"}
      </button>

      {open && (
        <form
          action={handleSubmit}
          className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950/60 p-5 text-left sm:min-w-[420px]"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Next Follow-Up
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Date
              </label>

              <input
                name="follow_up_date"
                type="date"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Type
              </label>

              <select
                name="follow_up_type"
                required
                defaultValue=""
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200 outline-none focus:border-amber-400"
              >
                <option value="">Select type</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Email">Email</option>
                <option value="Meeting">Meeting</option>
                <option value="Proposal">Proposal</option>
                <option value="Visit">Visit</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Notes
            </label>

            <textarea
              name="follow_up_notes"
              rows={3}
              placeholder="What needs to happen next?"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200 outline-none placeholder:text-slate-600 focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-4 w-full rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300 disabled:opacity-60"
          >
            {saving ? "Scheduling..." : "Schedule Follow-Up"}
          </button>
        </form>
      )}
    </div>
  );
}