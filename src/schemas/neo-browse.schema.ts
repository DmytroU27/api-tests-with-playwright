/**
 * JSON Schema for Asteroids NeoWs - Neo - Browse API response.
 * @see https://api.nasa.gov/
 * GET /neo/rest/v1/neo/browse - Browse the overall Asteroid data-set.
 * Dummy schema: expand with full NEO object shape later.
 */

import { Schema } from 'ajv';

const pageSchema: Schema = {
  type: 'object',
  properties: {
    size: { type: 'number' },
    total_elements: { type: 'number' },
    total_pages: { type: 'number' },
    number: { type: 'number' },
  },
  additionalProperties: true,
};

export const neoBrowseResponseSchema: Schema = {
  type: 'object',
  required: ['links', 'page', 'near_earth_objects'],
  properties: {
    links: {
      type: 'object',
      properties: {
        next: { type: 'string' },
        prev: { type: 'string' },
        self: { type: 'string' },
      },
      required: ['self'],
      additionalProperties: false,
    },
    page: pageSchema,
    near_earth_objects: {
      type: 'array',
      items: { type: 'object'},
    },
  },
  additionalProperties: false,
};
