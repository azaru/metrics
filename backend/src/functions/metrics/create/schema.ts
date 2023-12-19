export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    timestamp: { type: 'number' },
    value: { type: 'number' }
  },
  // required: ['name', 'timestamp', 'value']
} as const;
