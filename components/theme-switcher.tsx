"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  return (
    <DropdownMenu data-oid="-p0mm14">
      <DropdownMenuTrigger asChild data-oid="s0_69a2">
        <Button variant="ghost" size={"sm"} data-oid="nahj6th">
          {theme === "light" ? (
            <Sun
              key="light"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
              data-oid="g497rck"
            />
          ) : theme === "dark" ? (
            <Moon
              key="dark"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
              data-oid="b5ft8_e"
            />
          ) : (
            <Laptop
              key="system"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
              data-oid="qrhkjxe"
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-content"
        align="start"
        data-oid="c840-qp"
      >
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => setTheme(e)}
          data-oid="_q.e5ij"
        >
          <DropdownMenuRadioItem
            className="flex gap-2"
            value="light"
            data-oid="w8z_pxl"
          >
            <Sun
              size={ICON_SIZE}
              className="text-muted-foreground"
              data-oid="1o4zrkj"
            />{" "}
            <span data-oid="x.dcx.u">Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="flex gap-2"
            value="dark"
            data-oid="h3-4:3v"
          >
            <Moon
              size={ICON_SIZE}
              className="text-muted-foreground"
              data-oid="2husn6z"
            />{" "}
            <span data-oid="4yu-idm">Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="flex gap-2"
            value="system"
            data-oid="w.1xl10"
          >
            <Laptop
              size={ICON_SIZE}
              className="text-muted-foreground"
              data-oid="kt.o52r"
            />{" "}
            <span data-oid="1d-3c_6">System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
