import { Checkbox } from "../ui/checkbox";

export function TutorialStep({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative" data-oid=".0luk58">
      <Checkbox
        id={title}
        name={title}
        className={`absolute top-[3px] mr-2 peer`}
        data-oid="nr7h.:c"
      />

      <label
        htmlFor={title}
        className={`relative text-base text-foreground peer-checked:line-through font-medium`}
        data-oid=".kb71n0"
      >
        <span className="ml-8" data-oid="_crs08l">
          {title}
        </span>
        <div
          className={`ml-8 text-sm peer-checked:line-through font-normal text-muted-foreground`}
          data-oid="syvvxej"
        >
          {children}
        </div>
      </label>
    </li>
  );
}
