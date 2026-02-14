import { defineField, defineType } from "sanity";
import { buildImageValidation, IMAGE_RULES } from "./validationHelpers";

export default defineType({
  name: "siteDetail",
  title: "Site Detail",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      description: "The name of the restaurant, used in the header and SEO.",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(80)
          .error("Site name is required and should be 2-80 characters."),
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      description:
        "A brief description of the restaurant, used in SEO and the homepage.",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(300)
          .error(
            "Site description is required and should be 10-300 characters.",
          ),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "The restaurant's logo, used in the header and SEO.",
      options: {
        hotspot: true,
        accept: "image/jpeg,image/png,image/webp",
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the logo image for accessibility and SEO.",
          validation: (Rule) =>
            Rule.required()
              .min(8)
              .max(140)
              .error("Logo image alt text is required (8-140 characters)."),
        }),
      ],
      validation: buildImageValidation({
        ...IMAGE_RULES.logo,
        required: true,
        fieldLabel: "Logo image",
      }),
    }),
    defineField({
        name: "favicon",
        title: "Favicon",
        type: "image",
        description: "Small icon shown in browser tabs. Keep it clear and simple.",
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
              "Describe the favicon image for accessibility and SEO.",
            validation: (Rule) =>
              Rule.required()
                .min(8)
                .max(140)
                .error("Favicon image alt text is required (8-140 characters)."),
          }),
        ],
        validation: buildImageValidation({
          ...IMAGE_RULES.favicon,
          required: true,
          fieldLabel: "Favicon image",
        }),
      }),
  ],
});
