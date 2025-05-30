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

const getRandomGradient = (name: string) => {
  const gradients = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-purple-500", 
    "from-green-500 to-blue-500",
    "from-yellow-500 to-orange-500",
    "from-pink-500 to-red-500",
    "from-indigo-500 to-purple-500",
    "from-teal-500 to-green-500",
    "from-orange-500 to-red-500",
    "from-cyan-500 to-blue-500",
    "from-violet-500 to-purple-500"
  ];
  
  // Use a hash function to get a consistent gradient for the same name
  const hash = name.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  return gradients[hash % gradients.length];
};

export function AvatarWithInitials({
  name,
  size = "md",
  className,
}: AvatarWithInitialsProps) {
  const initials = getInitials(name);
  const gradientClass = getRandomGradient(name);
  
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 bg-gradient-to-br",
        gradientClass,
        sizeClassMap[size],
        className
      )}
    >
      {initials}
    </div>
  );
}

export default AvatarWithInitials;
