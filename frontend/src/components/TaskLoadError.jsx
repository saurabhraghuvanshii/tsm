import { Button } from "./Button";
import { ErrorState } from "./ErrorState";

export function TaskLoadError({ error, onRetry }) {
  if (error.status === 404) {
    return (
      <ErrorState
        title="Task not found"
        message="This task may have been deleted or the link is incorrect."
        action={<Button href="/">Back to tasks</Button>}
      />
    );
  }
  return <ErrorState message={error.message} onRetry={onRetry} />;
}
