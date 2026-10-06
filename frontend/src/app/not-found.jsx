import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <p className="text-sm font-medium text-muted">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">The page you are looking for does not exist or has been moved.</p>
      <Button href="/" className="mt-6">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to tasks
      </Button>
    </div>
  );
}
