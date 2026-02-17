import type { ComponentProps, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "lg:text-7xl md:text-5xl text-3xl font-extrabold tracking-[-0.025rem]",
      h2: "text-[30px] font-bold",
      h3: "text-xl font-semibold",
      body: "lg:text-xl text-base font-normal leading-6",
      small: "text-sm font-medium tracking-[0.1em]",
      button: "text-sm font-bold tracking-[0.05em]",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const defaultElementByVariant = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  small: "small",
  button: "span",
} as const;

function Typography({
  className,
  variant = "body",
  asChild = false,
  ...props
}: ComponentProps<"p"> &
  VariantProps<typeof typographyVariants> & {
    asChild?: boolean;
  }) {
  const resolvedVariant = variant ?? "body";
  const Comp: ElementType = asChild
    ? Slot.Root
    : defaultElementByVariant[resolvedVariant];

  return (
    <Comp
      data-slot="typography"
      data-variant={resolvedVariant}
      className={cn(
        typographyVariants({ variant: resolvedVariant, className }),
      )}
      {...props}
    />
  );
}

export { Typography, typographyVariants };
