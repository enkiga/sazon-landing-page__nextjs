/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * It's disabled in this deployment target to keep the Cloudflare Worker bundle size under the free-plan limit.
 */

import { notFound } from "next/navigation";

export const dynamic = "force-static";

export const metadata = {
  title: "Studio",
};

export default async function StudioPage() {
  notFound();
}
