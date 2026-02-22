"use client";

import { useState } from "react";
import Image from "next/image";
import SectionWrapper from "../reusables/section-wrapper";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { Shuffle } from "lucide-react";

const MEXICAN_RESTAURANT_IMAGES = [
  "https://images.unsplash.com/photo-1563292415-32e65839b52c?auto=format&fit=crop&w=1925&q=80",
  "https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?auto=format&fit=crop&w=1925&q=80",
  "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?auto=format&fit=crop&w=1925&q=80",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1925&q=80",
  "https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=1925&q=80",
  "https://images.unsplash.com/photo-1582169296194-e4d644c48063?auto=format&fit=crop&w=1925&q=80",
  "https://images.unsplash.com/photo-1533050487297-09b4502d642b?auto=format&fit=crop&w=1925&q=80",
  "https://images.unsplash.com/photo-1528150231110-394467f62e8a?auto=format&fit=crop&w=1925&q=80",
  "https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?auto=format&fit=crop&w=1925&q=80",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1925&q=80",
  "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=1925&q=80",
  "https://images.unsplash.com/photo-1504113859335-f050e40291f0?auto=format&fit=crop&w=1925&q=80",
] as const;

const FEATURED_BENTO_TILES = [
  { className: "md:col-span-2 md:row-span-2", area: 4 },
  { className: "md:col-span-2", area: 2 },
  { className: "md:row-span-2", area: 2 },
] as const;

const DEFAULT_TILE_CLASS = "col-span-1 row-span-1";
const DESKTOP_GRID_COLUMNS = 6;
const DESKTOP_GRID_ROWS = 2;
const DESKTOP_GRID_CAPACITY = DESKTOP_GRID_COLUMNS * DESKTOP_GRID_ROWS;
const FEATURED_TILE_EXTRA_AREA = FEATURED_BENTO_TILES.reduce(
  (total, tile) => total + tile.area - 1,
  0,
);
const MAX_VISIBLE_IMAGES = Math.max(
  FEATURED_BENTO_TILES.length,
  DESKTOP_GRID_CAPACITY - FEATURED_TILE_EXTRA_AREA,
);
const GALLERY_IMAGES = MEXICAN_RESTAURANT_IMAGES.slice(0, MAX_VISIBLE_IMAGES);

function shuffleArray<T>(items: readonly T[]): T[] {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }
  return next;
}

function pickRandomUniqueIndices(total: number, picks: number): number[] {
  const pool = Array.from({ length: total }, (_, index) => index);
  return shuffleArray(pool).slice(0, Math.min(total, picks));
}

function buildRandomBentoClasses(total: number): string[] {
  const classes = Array.from({ length: total }, () => DEFAULT_TILE_CLASS);
  const featuredIndices = pickRandomUniqueIndices(
    total,
    FEATURED_BENTO_TILES.length,
  );

  featuredIndices.forEach((tileIndex, featureIndex) => {
    classes[tileIndex] =
      `${DEFAULT_TILE_CLASS} ${FEATURED_BENTO_TILES[featureIndex].className}`;
  });

  return classes;
}

function buildInitialBentoClasses(total: number): string[] {
  const classes = Array.from({ length: total }, () => DEFAULT_TILE_CLASS);

  FEATURED_BENTO_TILES.forEach((tile, index) => {
    if (index < total) {
      classes[index] = `${DEFAULT_TILE_CLASS} ${tile.className}`;
    }
  });

  return classes;
}

const ImageLibrarySection = () => {
  const [shuffledImages, setShuffledImages] = useState<string[]>(() => [
    ...GALLERY_IMAGES,
  ]);
  const [bentoClasses, setBentoClasses] = useState<string[]>(() =>
    buildInitialBentoClasses(GALLERY_IMAGES.length),
  );

  const shuffleGallery = () => {
    const nextImages = shuffleArray(shuffledImages);
    setShuffledImages(nextImages);
    setBentoClasses(buildRandomBentoClasses(nextImages.length));
  };

  return (
    <SectionWrapper className="py-16 flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-col gap-0">
          <Typography variant="h2" className="text-foreground">
            Life at Sazón
          </Typography>
          <Typography variant="body" className="text-foreground/80 mt-1">
            Good Food, good vibes, good times.
          </Typography>
        </div>
        <Button
          type="button"
          onClick={shuffleGallery}
          className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 self-end"
          aria-label="Shuffle gallery layout"
        >
          <Shuffle className="size-4 mx-4 lg:mx-0" />
          <Typography variant="button" className="ml-2 hidden lg:inline-flex">
            More Moments
          </Typography>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:grid-rows-2 md:grid-flow-dense lg:max-h-[60vh]">
        {shuffledImages.map((src, index) => (
          <div
            key={src}
            className={`group relative h-44 overflow-hidden rounded-lg md:h-full ${bentoClasses[index]}`}
          >
            <Image
              src={src}
              alt={`Mexican restaurant dish ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              width={1925}
              height={1080}
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ImageLibrarySection;
