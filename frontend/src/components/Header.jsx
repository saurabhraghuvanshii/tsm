import Link from "next/link";
import { ListChecks, Plus } from "lucide-react";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 rounded-md text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-contrast">
            <ListChecks className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight">Taskboard</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href="/tasks/new" variant="primary">
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">New task</span>
            <span className="sr-only sm:hidden">New task</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
