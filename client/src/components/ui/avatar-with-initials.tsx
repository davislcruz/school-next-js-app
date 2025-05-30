import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "ms" | "md" | "lg";

interface AvatarWithInitialsProps {
  name: string;
  size?: AvatarSize;
  className?: string;
}

const sizeClassMap: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-xs",
  ms: "w-10 h-10 text-xs", // Medium-small - for conversation list
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-base",
};

const getInitials = (name: string) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const getRandomColor = (name: string) => {
  const colors = [
    "bg-blue-600",
    "bg-purple-600",
    "bg-emerald-600",
    "bg-indigo-600",
    "bg-rose-600",
    "bg-teal-600",
    "bg-violet-600",
    "bg-slate-700",
  ];
  
  // Use a hash function to get a consistent color for the same name
  const hash = name.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  return colors[hash % colors.length];
};

const getInlineBackgroundColor = (name: string) => {
  const colors = [
    "#2563eb", // blue-600
    "#9333ea", // purple-600
    "#059669", // emerald-600
    "#4f46e5", // indigo-600
    "#e11d48", // rose-600
    "#0d9488", // teal-600
    "#8b5cf6", // violet-600
    "#374151", // slate-700
  ];
  
  const hash = name.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  return colors[hash % colors.length];
};

export function AvatarWithInitials({
  name,
  size = "md",
  className,
}: AvatarWithInitialsProps) {
  const initials = getInitials(name);
  const colorClass = getRandomColor(name);
  const inlineColor = getInlineBackgroundColor(name);
  
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0",
        sizeClassMap[size],
        className
      )}
      style={{
        backgroundColor: inlineColor,
        background: inlineColor
      }}
    >
      {initials}
    </div>
  );
}

export default AvatarWithInitials;
