// src/components/ErrorBoundary.js

import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to display fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can log the error and info to an error reporting service
    console.error("Error:", error);
    console.error("Error Info:", info);
    this.setState({ error, info });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI if there is an error
      return (
        <div>
          <h1>Something went wrong. Please try again later.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.info ? this.state.error.toString() + '\n' + this.state.info.componentStack : null}
          </details>
        </div>
      );
    }

    // If no error, render children components as usual
    return this.props.children;
  }
}

export default ErrorBoundary;
