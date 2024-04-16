import React, { useEffect, useState } from "react";

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});

class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
  },
  {
    hasError: boolean;
  }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wrong.</h1>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload the page
          </button>
        </>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [count, setCount] = useState(0);

  if (count === 3) {
    throw new Error("Something went wrong");
  }

  useEffect(() => {
    setTimeout(() => {
      throw new Error("Something went wrong inside effect");
    }, 1000);
  }, []);

  return (
    <>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button
        onClick={() => {
          throw new Error("Something went wrong inside handler");
        }}
      >
        Throw error inside handler
      </button>

      <button
        onClick={() => {
          Promise.reject("Something went wrong inside promise");
        }}
      >
        Promise rejection inside handler
      </button>
    </>
  );
}

export default function AppWithErrorBoundary() {
  return (
    <main>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </main>
  );
}
