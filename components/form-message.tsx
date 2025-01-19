export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div
      className="flex flex-col gap-2 w-full max-w-md text-sm"
      data-oid="82..07w"
    >
      {"success" in message && (
        <div
          className="text-foreground border-l-2 border-foreground px-4"
          data-oid="kkmk7rn"
        >
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div
          className="text-destructive-foreground border-l-2 border-destructive-foreground px-4"
          data-oid="2fuk04d"
        >
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-foreground border-l-2 px-4" data-oid="v-qtse5">
          {message.message}
        </div>
      )}
    </div>
  );
}
