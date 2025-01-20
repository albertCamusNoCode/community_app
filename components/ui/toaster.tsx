"use client";

import { useToast } from "@/app/actions/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider data-oid=".lrv8_6">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} data-oid="-p0vj1y">
            <div className="grid gap-1" data-oid="9oany2d">
              {title && <ToastTitle data-oid="ijvp25x">{title}</ToastTitle>}
              {description && (
                <ToastDescription data-oid="kvh6jkc">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose data-oid="ncolmg1" />
          </Toast>
        );
      })}
      <ToastViewport data-oid="62.xq_l" />
    </ToastProvider>
  );
}
