import { defineField, defineType } from "sanity";
import { buildImageValidation, IMAGE_RULES } from "./validationHelpers";

export default defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Public name of this branch/location.",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(80)
          .error("Location name is required and should be 2-80 characters."),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      description: "Street address details for customers and maps.",
      fields: [
        defineField({
          name: "buildingName",
          title: "Building Name",
          type: "string",
          description: "Name of the building or complex, if applicable.",
          validation: (Rule) =>
            Rule.required()
              .min(5)
              .max(120)
              .error("Building name is required and should be 5-120 characters."),
        }),
        defineField({
          name: "streetName",
          title: "Street Name",
          type: "string",
          description: "Street name and number, like 123 Main St.",
          validation: (Rule) =>
            Rule.required().min(2).max(80).error("Street name is required."),
        }),
        defineField({
          name: "city",
          title: "City",
          type: "string",
          description: "City where this location is based.",
          validation: (Rule) =>
            Rule.required().min(2).max(80).error("City is required."),
        }),
        defineField({
          name: "country",
          title: "Country",
          type: "string",
          description: "Country where this location is based.",
          validation: (Rule) =>
            Rule.required().min(2).max(80).error("Country is required."),
        }),
      ],
      validation: (Rule) => Rule.required().error("Address is required."),
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "array",
      description: "Opening and closing times by day.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "day",
              title: "Day of the Week",
              type: "string",
              description: "Day name, for example Monday.",
              validation: (Rule) => Rule.required().error("Day is required."),
            }),
            defineField({
              name: "open",
              title: "Opening Time",
              type: "string",
              description: "When this location opens on that day (e.g. 09:00).",
              validation: (Rule) =>
                Rule.required()
                  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
                  .error("Use 24-hour time format like 09:00."),
            }),
            defineField({
              name: "close",
              title: "Closing Time",
              type: "string",
              description:
                "When this location closes on that day (e.g. 21:00).",
              validation: (Rule) =>
                Rule.required()
                  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
                  .error("Use 24-hour time format like 21:00."),
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("Add at least one day of hours."),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "Main contact phone number for customers.",
      validation: (Rule) =>
        Rule.required()
          .regex(/^\+?[0-9()\-\s]{7,20}$/)
          .error("Enter a valid phone number."),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "Public email for customer enquiries.",
      validation: (Rule) =>
        Rule.required().email().error("Enter a valid email address."),
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Map Embed URL",
      type: "url",
      description:
        "Paste the map embed URL so customers can find the location.",
      validation: (Rule) =>
        Rule.required()
          .uri({ scheme: ["http", "https"] })
          .error("Enter a valid http/https map URL."),
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media Links",
      type: "array",
      description: "Links to your social profiles.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              description:
                "Social network name, such as Instagram or Facebook.",
              validation: (Rule) =>
                Rule.required().error("Platform is required."),
            }),
            defineField({
              name: "handle",
              title: "Handle",
              type: "string",
              description: "Your account name on that platform.",
              validation: (Rule) =>
                Rule.required().error("Handle is required."),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              description: "Small icon for the platform.",
              options: {
                hotspot: false,
                accept: "image/png,image/webp,image/svg+xml",
              },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                  description: "Describe the social icon for accessibility.",
                  validation: (Rule) =>
                    Rule.required()
                      .min(3)
                      .max(80)
                      .error("Icon alt text is required (3-80 characters)."),
                }),
                defineField({
                  name: "caption",
                  title: "Caption",
                  type: "string",
                  description: "Optional short caption for this icon.",
                  validation: (Rule) =>
                    Rule.max(180).error(
                      "Caption must be 180 characters or less.",
                    ),
                }),
              ],
              validation: buildImageValidation({
                ...IMAGE_RULES.icon,
                fieldLabel: "Social icon",
              }),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              description: "Full link to this social profile.",
              validation: (Rule) =>
                Rule.required()
                  .uri({ scheme: ["http", "https"] })
                  .error("Enter a valid profile URL."),
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.unique().error("Social media links must be unique."),
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
