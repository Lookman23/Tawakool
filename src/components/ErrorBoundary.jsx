import React from 'react';
import { Button } from '@/components/ui/button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erreur interceptée par ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
          <h1 className="text-3xl font-bold text-destructive mb-4">Oups ! Une erreur est survenue.</h1>
          <p className="text-muted-foreground mb-6">Nous sommes désolés, quelque chose s'est mal passé. Veuillez réessayer.</p>
          <Button onClick={() => window.location.reload()}>Recharger la page</Button>
          <details className="mt-6 text-sm text-muted-foreground bg-muted p-4 rounded-lg w-full max-w-lg">
            <summary>Détails de l'erreur (pour le développement)</summary>
            <pre className="mt-2 text-left whitespace-pre-wrap text-xs">
              {this.state.error?.toString()}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;