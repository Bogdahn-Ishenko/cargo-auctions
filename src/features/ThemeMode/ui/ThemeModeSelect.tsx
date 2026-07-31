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
  const SelectedThemeIcon =
    themeOptions.find((option) => option.value === selectedTheme)?.icon ??
    RiComputerLine;

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
        className="w-10 border-border bg-card px-2 text-foreground focus-visible:border-ring sm:w-[132px] sm:px-2.5 [&_[data-slot=select-value]]:hidden sm:[&_[data-slot=select-value]]:flex"
        size="sm"
      >
        <SelectedThemeIcon className="size-4 text-muted-foreground sm:hidden" />
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
