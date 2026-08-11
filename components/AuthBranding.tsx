import Image from "next/image";

type AuthBrandingProps = {
  compact?: boolean;
};

export default function AuthBranding({
  compact = false,
}: AuthBrandingProps) {
  return (
    <div className="text-center">
      <Image
  src="/sdop-logo.png"
  alt="Shepherds Defense"
  width={compact ? 120 : 150}
  height={compact ? 100 : 125}
  priority
  className="mx-auto"
/>

      <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
        Shepherds Defense
      </p>

      <h1
        className={
          compact
            ? "mt-2 text-4xl font-black tracking-tight"
            : "mt-2 text-5xl font-black tracking-tight"
        }
      >
        SDOP
      </h1>

      <p className="mt-2 text-lg text-slate-300">
        Shepherds Defense Operations Portal
      </p>

      <p className="mt-3 text-sm font-semibold text-amber-400">
        Equip • Protect • Lead
      </p>
    </div>
  );
}