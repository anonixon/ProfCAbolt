import { Toast, ToastProvider } from '@radix-ui/react-toast'
import { cn } from '@lib/utils'

interface ToasterProps {
  className?: string
}

export function Toaster({ className }: ToasterProps) {
  return (
    <ToastProvider>
      <Toast
        className={cn(
          'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
          className
        )}
      >
        <div className="grid gap-1">
          <div className="text-sm font-semibold">Notification</div>
          <div className="text-sm opacity-90">Your action was completed successfully.</div>
        </div>
      </Toast>
    </ToastProvider>
  )
} 