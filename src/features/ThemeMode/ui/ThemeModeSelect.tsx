import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { RiComputerLine, RiMoonLine, RiSunLine } from "@remixicon/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const themeOptions = [
  { icon: RiComputerLine, label: "Система", value: "system" },
  { icon: RiMoonLine, label: "Темная", value: "dark" },
  { icon: RiSunLine, label: "Светлая", value: "light" },
] as const;

export function ThemeModeSelect() {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  const selectedTheme = isMounted ? (theme ?? "system") : "system";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Select
      disabled={!isMounted}
      onValueChange={setTheme}
      value={selectedTheme}
    >
      <SelectTrigger
        aria-label="Тема интерфейса"
        className="w-[132px] border-border bg-card text-foreground focus-visible:border-ring"
        size="sm"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">
        {themeOptions.map(({ icon: Icon, label, value }) => (
          <SelectItem key={value} value={value}>
            <Icon className="size-4 text-muted-foreground" />
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
