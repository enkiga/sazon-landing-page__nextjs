import type { StructureResolver } from "sanity/structure";
import {
  BookmarkIcon,
  EarthGlobeIcon,
  FeedbackIcon,
  HomeIcon,
  ImagesIcon,
  InfoOutlineIcon,
  MasterDetailIcon,
  PinIcon,
  TagIcon,
  UlistIcon,
  VersionsIcon,
} from "@sanity/icons";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(MasterDetailIcon)
        .child(
          S.list()
            .title("Site Details")
            .items([
              S.listItem()
                .title("General Details")
                .icon(InfoOutlineIcon)
                .child(
                  S.editor()
                    .id("siteDetail")
                    .schemaType("siteDetail")
                    .documentId("siteDetail"),
                ),
              S.listItem()
                .title("SEO Settings")
                .icon(EarthGlobeIcon)
                .child(
                  S.editor().id("seo").schemaType("seo").documentId("seo"),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Home Page")
        .icon(HomeIcon)
        .child(
          S.editor()
            .id("homePage")
            .schemaType("homePage")
            .documentId("homePage"),
        ),

      S.listItem()
        .title("Restaurant Menu")
        .icon(VersionsIcon)
        .child(
          S.list()
            .title("Restaurant Menu")
            .items([
              S.listItem()
                .title("Categories")
                .icon(BookmarkIcon)
                .child(
                  S.documentTypeList("menuCategory").title("Menu Categories"),
                ),
              S.listItem()
                .title("Items")
                .icon(UlistIcon)
                .child(S.documentTypeList("menuItem").title("Menu Items")),
                S.listItem()
                .title("Promotions")
                .icon(TagIcon)
                .child(S.documentTypeList("promotion").title("Promotions")),
            ]),
        ),
      S.listItem()
        .title("Gallery Images")
        .icon(ImagesIcon)
        .child(S.documentTypeList("galleryImage").title("Gallery Images")),
      S.listItem()
        .title("Reviews")
        .icon(FeedbackIcon)
        .child(S.documentTypeList("review").title("Reviews")),
      S.listItem()
        .title("Locations")
        .icon(PinIcon)
        .child(S.documentTypeList("location").title("Locations")),
    ]);
