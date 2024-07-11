import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
            <ToastTitle className={`text-lg ${props.variant === 'default' ? 'text-green-700' : 'text-red-700'}`}>
                {props.variant && props.variant === "default" ? "Well done!" : "Oh snap!"}
              </ToastTitle>
              {description && (
                <ToastDescription className="text-normal">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
