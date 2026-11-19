import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ROUTES } from "@/constants/routes";
import { cn } from "cn";

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  className?: string;
}

const UserAvatar = ({ id, name, imageUrl, className = "size-9" }: Props) => {
  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(id)} className="shrink-0">
      <Avatar className={cn("overflow-hidden rounded-full after:hidden", className)}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="rounded-full object-cover"
            sizes="36px"
            quality={100}
          />
        ) : (
          <AvatarFallback className="primary-gradient font-space-grotesk text-sm font-bold tracking-wider text-white">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
