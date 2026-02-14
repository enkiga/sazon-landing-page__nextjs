import { defineField, defineType } from "sanity";
import { buildImageValidation, IMAGE_RULES } from "./validationHelpers";

export default defineType({
  name: "seo",
  title: "SEO Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "The SEO title for this page, shown in search results and browser tabs.",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(70)
          .error("SEO title is required and should be 10-70 characters."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description:
        "The SEO description for this page, shown in search results. Keep it clear and enticing.",
      validation: (Rule) =>
        Rule.required()
          .min(50)
          .max(160)
          .error(
            "SEO description is required and should be 50-160 characters.",
          ),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description:
        "The image that will be displayed when this page is shared on social media.",
      validation: (Rule) => buildImageValidation(IMAGE_RULES.hero)(Rule),
    }),
    ],preview: {
      select: {
        title: "title",
        media: "ogImage",
      },prepare(selection) {
        const { title, media } = selection;
        return {
          title: `SEO: ${title}`,
          media,
        };
      }
    },
});