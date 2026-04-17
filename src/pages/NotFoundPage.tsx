import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 rounded-full bg-slate-100 dark:bg-slate-800 p-4">
        <FileQuestion size={28} className="text-slate-400 dark:text-slate-500" />
      </div>
      <h1 className="text-base font-semibold text-slate-700 dark:text-slate-300">
        Page not found
      </h1>
      <p className="mt-1.5 max-w-xs text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand-500 hover:bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        Back to home
      </Link>
    </div>
  )
}
