import type { ImageRule, SlugRule, ValidationContext } from "sanity";

type ImageValue = {
  asset?: {
    _ref?: string;
  };
};

type AssetMetadata = {
  size?: number;
  extension?: string;
};

type ImageValidationLimits = {
  maxBytes: number;
  maxWidth: number;
  maxHeight: number;
  minWidth?: number;
  minHeight?: number;
  allowedExtensions: readonly string[];
  required?: boolean;
  fieldLabel?: string;
};

type SlugValue = {
  current?: string;
};

const IMAGE_REF_REGEX = /^image-[a-zA-Z0-9_]+-(\d+)x(\d+)-([a-z0-9]+)$/;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function parseImageRef(ref?: string): {
  width?: number;
  height?: number;
  extension?: string;
} {
  if (!ref) {
    return {};
  }

  const match = ref.match(IMAGE_REF_REGEX);

  if (!match) {
    return {};
  }

  return {
    width: Number(match[1]),
    height: Number(match[2]),
    extension: match[3].toLowerCase(),
  };
}

async function getAssetMetadata(
  context: ValidationContext,
  assetRef: string,
): Promise<AssetMetadata | null> {
  if (typeof context.getClient !== "function") {
    return null;
  }

  const client = context.getClient({ apiVersion: "2024-10-01" });

  const result = await client.fetch<AssetMetadata | null>(
    `*[_id == $assetId][0]{size, extension}`,
    { assetId: assetRef },
  );

  return result;
}

export function buildImageValidation(limits: ImageValidationLimits) {
  return (rule: ImageRule): ImageRule => {
    const baseRule = limits.required ? rule.required() : rule;
    const configuredRule = limits.required
      ? baseRule.error(`${limits.fieldLabel ?? "Image"} is required.`)
      : baseRule;

    return configuredRule.custom(
      async (value: unknown, context: ValidationContext) => {
        const typedValue = value as ImageValue | undefined;
        const assetRef = typedValue?.asset?._ref;

        if (!assetRef) {
          return true;
        }

        const parsedRef = parseImageRef(assetRef);
        const metadata = await getAssetMetadata(context, assetRef);

        const extension = (
          metadata?.extension ??
          parsedRef.extension ??
          ""
        ).toLowerCase();

        if (!limits.allowedExtensions.includes(extension)) {
          return `${limits.fieldLabel ?? "Image"} must be one of: ${limits.allowedExtensions.join(", ")}.`;
        }

        if (
          typeof metadata?.size === "number" &&
          metadata.size > limits.maxBytes
        ) {
          return `${limits.fieldLabel ?? "Image"} must be ${formatBytes(limits.maxBytes)} or smaller.`;
        }

        const width = parsedRef.width;
        const height = parsedRef.height;

        if (typeof width === "number" && width > limits.maxWidth) {
          return `${limits.fieldLabel ?? "Image"} width must be ${limits.maxWidth}px or less.`;
        }

        if (typeof height === "number" && height > limits.maxHeight) {
          return `${limits.fieldLabel ?? "Image"} height must be ${limits.maxHeight}px or less.`;
        }

        if (
          typeof width === "number" &&
          typeof limits.minWidth === "number" &&
          width < limits.minWidth
        ) {
          return `${limits.fieldLabel ?? "Image"} width must be at least ${limits.minWidth}px.`;
        }

        if (
          typeof height === "number" &&
          typeof limits.minHeight === "number" &&
          height < limits.minHeight
        ) {
          return `${limits.fieldLabel ?? "Image"} height must be at least ${limits.minHeight}px.`;
        }

        return true;
      },
    );
  };
}

export const IMAGE_RULES = {
  hero: {
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxBytes: 450 * 1024,
    maxWidth: 2400,
    maxHeight: 1600,
    minWidth: 1200,
    minHeight: 630,
  },
  gallery: {
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxBytes: 350 * 1024,
    maxWidth: 2000,
    maxHeight: 2000,
    minWidth: 800,
    minHeight: 800,
  },
  menu: {
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxBytes: 300 * 1024,
    maxWidth: 1600,
    maxHeight: 1600,
    minWidth: 600,
    minHeight: 600,
  },
  location: {
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxBytes: 350 * 1024,
    maxWidth: 2000,
    maxHeight: 1600,
    minWidth: 900,
    minHeight: 600,
  },
  logo: {
    allowedExtensions: ["png", "webp", "svg"],
    maxBytes: 200 * 1024,
    maxWidth: 1200,
    maxHeight: 1200,
    minWidth: 200,
    minHeight: 200,
  },
  favicon: {
    allowedExtensions: ["png", "svg", "ico"],
    maxBytes: 100 * 1024,
    maxWidth: 512,
    maxHeight: 512,
    minWidth: 64,
    minHeight: 64,
  },
  icon: {
    allowedExtensions: ["png", "webp", "svg"],
    maxBytes: 120 * 1024,
    maxWidth: 512,
    maxHeight: 512,
    minWidth: 64,
    minHeight: 64,
  },
} as const;

export function slugFormatValidation(fieldLabel: string) {
  return (rule: SlugRule): SlugRule =>
    rule.required().custom((value: SlugValue | undefined) => {
      const slug = value?.current ?? "";

      if (!slug) {
        return `${fieldLabel} is required.`;
      }

      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        return `${fieldLabel} must use lowercase letters, numbers, and hyphens only.`;
      }

      return true;
    });
}

export const SLUGIFY = (input: string): string =>
  input
    .toLowerCase()
    .trim()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
