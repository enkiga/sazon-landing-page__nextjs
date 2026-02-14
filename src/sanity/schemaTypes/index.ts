import type { SchemaTypeDefinition } from "sanity";
import homePage from "./homePage";
import menuCategory from "./menuCategory";
import menuItem from "./menuItem";
import promotion from "./promotion";
import galleryImage from "./galleryImage";
import review from "./review";
import location from "./location";
import seo from "./seo";
import siteDetail from "./siteDetail";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    seo,
    siteDetail,
    homePage,
    menuCategory,
    menuItem,
    promotion,
    galleryImage,
    review,
    location,
  ],
};
