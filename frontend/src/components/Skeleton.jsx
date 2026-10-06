export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-surface-2 ${className}`} aria-hidden="true" />;
}
