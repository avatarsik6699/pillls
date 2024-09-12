import React from "react";
import type { ErrorBoundaryProps, FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

type Props = Omit<
  ErrorBoundaryProps,
  "fallbackRender" | "fallback" | "FallbackComponent"
>;

const ErrorBoundaryAdapter = ({
  children,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (
    <ErrorBoundary
      {...props}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <DefaultFallback
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

const DefaultFallback: React.FC<FallbackProps> = props => {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {props.error instanceof Error
            ? props.error.message
            : typeof props.error === "string"
              ? props.error
              : JSON.stringify(props.error)}
        </code>
      </blockquote>
    </div>
  );
};

export default ErrorBoundaryAdapter;
