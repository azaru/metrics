export default {
  type: "object",
  properties: {
    queryStringParameters: {
      type: "object",
      properties: {
        from: {
          type: "number",
        },
        to: {
          type: "number",
        },
      },
    },
  },
} as const;
