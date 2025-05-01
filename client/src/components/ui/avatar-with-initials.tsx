import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarWithInitialsProps {
  name: string;
  size?: AvatarSize;
  className?: string;
}

const sizeClassMap: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-xs",
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
    "bg-primary-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-pink-500",
  ];
  
  // Use a hash function to get a consistent color for the same name
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
  
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0",
        sizeClassMap[size],
        colorClass,
        className
      )}
    >
      {initials}
    </div>
  );
}

export default AvatarWithInitials;
