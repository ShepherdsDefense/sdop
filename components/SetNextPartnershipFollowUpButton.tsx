"use client";

import { useState } from "react";
import { schedulePartnershipFollowUp } from "@/app/partnerships/actions";

type SetNextPartnershipFollowUpButtonProps = {
  partnershipId: string;
};

export default function SetNextPartnershipFollowUpButton({
  partnershipId,
}: SetNextPartnershipFollowUpButtonProps) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSaving(true);

    try {
      await schedulePartnershipFollowUp(partnershipId, formData);
      setOpen(false);
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-slate-500"
      >
        Set Next Follow-Up
      </button>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-5 text-left text-slate-100">
      <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
        Next Follow-Up
      </p>

      <form action={handleSubmit} className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">
              Date
            </label>

            <input
              name="follow_up_date"
              type="date"
              required
              className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-base font-medium text-white outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">
              Type
            </label>

            <select
              name="follow_up_type"
              required
              defaultValue=""
              className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-base font-medium text-white outline-none focus:border-amber-400"
            >
              <option value="" disabled>
                Select type
              </option>

              <option value="Phone Call">Phone Call</option>
              <option value="Email">Email</option>
              <option value="Meeting">Meeting</option>
              <option value="Affiliate Check-In">Affiliate Check-In</option>
              <option value="Vendor Follow-Up">Vendor Follow-Up</option>
              <option value="Proposal">Proposal</option>
              <option value="Range Coordination">Range Coordination</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Notes
          </label>

          <textarea
            name="follow_up_notes"
            rows={4}
            placeholder="What needs to happen next?"
            className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-base font-medium text-white placeholder:text-slate-500 outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 hover:border-slate-500"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-300 disabled:opacity-60"
          >
            {saving ? "Scheduling..." : "Schedule Follow-Up"}
          </button>
        </div>
      </form>
    </div>
  );
}