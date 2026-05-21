export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="font-ui font-semibold text-[10px] tracking-[0.28em] uppercase text-mid mb-3">
          Indlæser
        </div>
        <div className="font-display italic font-normal text-ink" style={{ fontSize: 28, letterSpacing: '-0.02em' }}>
          Et øjeblik.
        </div>
      </div>
    </div>
  );
}
