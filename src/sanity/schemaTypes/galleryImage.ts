import { defineField, defineType } from "sanity";
import { buildImageValidation, IMAGE_RULES } from "./validationHelpers";

export default defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description:
        "Upload a photo for the gallery. Keep it clear and lightweight so the page loads fast.",
      options: {
        hotspot: true,
        accept: "image/jpeg,image/png,image/webp",
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description:
            "Describe what is in this image in simple words for screen readers and search engines.",
          validation: (Rule) =>
            Rule.required()
              .min(8)
              .max(140)
              .error("Add clear alt text between 8 and 140 characters."),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional short text shown with the image.",
          validation: (Rule) =>
            Rule.max(180).error("Caption must be 180 characters or less."),
        }),
      ],
      validation: buildImageValidation({
        ...IMAGE_RULES.gallery,
        required: true,
        fieldLabel: "Gallery image",
      }),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Short text to explain what this gallery image shows.",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(180)
          .error("Caption is required and should be 3-180 characters."),
    }),
    defineField({
      name: "altText",
      title: "Alt Text",
      type: "string",
      description:
        "Accessibility text for this image. Explain the image as if someone cannot see it.",
      validation: (Rule) =>
        Rule.required()
          .min(8)
          .max(140)
          .error("Alt text is required and should be 8-140 characters."),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Smaller number appears first in the gallery.",
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(0)
          .error("Sort Order is required and must be 0 or higher."),
    }),
  ],
  preview: {
    select: {
      title: "caption",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title || "No caption",
        media: media,
      };
    },
  },
});
