import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-rose-50 dark:bg-rose-950/40 p-4">
            <AlertTriangle size={28} className="text-rose-500" />
          </div>
          <h2 className="text-base font-semibold text-slate-700 dark:text-slate-300">
            Something went wrong
          </h2>
          <p className="mt-1.5 max-w-xs text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {this.state.error.message}
          </p>
          <button
            type="button"
            onClick={() => this.setState({ error: null })}
            className="mt-6 rounded-lg bg-brand-500 hover:bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
