/**
 * JSON Schema for Asteroids NeoWs - Neo - Feed API response.
 * @see https://api.nasa.gov/
 * Based on response structure from GET /neo/rest/v1/feed
 */

import { Schema } from 'ajv';

const linksSchema: Schema = {
  type: 'object',
  properties: {
    next: { type: 'string' },
    previous: { type: 'string' },
    self: { type: 'string' },
  },
  additionalProperties: true,
};

const diameterUnitSchema: Schema = {
  type: 'object',
  properties: {
    estimated_diameter_min: { type: 'number' },
    estimated_diameter_max: { type: 'number' },
  },
  required: ['estimated_diameter_min', 'estimated_diameter_max'],
  additionalProperties: false,
};

const estimatedDiameterSchema: Schema = {
  type: 'object',
  properties: {
    kilometers: diameterUnitSchema,
    meters: diameterUnitSchema,
    miles: diameterUnitSchema,
    feet: diameterUnitSchema,
  },
  required: ['kilometers', 'meters', 'miles', 'feet'],
  additionalProperties: false,
};

const relativeVelocitySchema: Schema = {
  type: 'object',
  properties: {
    kilometers_per_second: { type: 'string' },
    kilometers_per_hour: { type: 'string' },
    miles_per_hour: { type: 'string' },
  },
  additionalProperties: true,
};

const missDistanceSchema: Schema = {
  type: 'object',
  properties: {
    astronomical: { type: 'string' },
    lunar: { type: 'string' },
    kilometers: { type: 'string' },
    miles: { type: 'string' },
  },
  additionalProperties: true,
};

const closeApproachItemSchema: Schema = {
  type: 'object',
  properties: {
    close_approach_date: { type: 'string' },
    close_approach_date_full: { type: 'string' },
    epoch_date_close_approach: { type: 'number' },
    relative_velocity: relativeVelocitySchema,
    miss_distance: missDistanceSchema,
    orbiting_body: { type: 'string' },
  },
  required: [
    'close_approach_date',
    'close_approach_date_full',
    'epoch_date_close_approach',
    'relative_velocity',
    'miss_distance',
    'orbiting_body',
  ],
  additionalProperties: true,
};

const neoObjectSchema: Schema = {
  type: 'object',
  properties: {
    links: linksSchema,
    id: { type: 'string' },
    neo_reference_id: { type: 'string' },
    name: { type: 'string' },
    nasa_jpl_url: { type: 'string' },
    absolute_magnitude_h: { type: 'number' },
    estimated_diameter: estimatedDiameterSchema,
    is_potentially_hazardous_asteroid: { type: 'boolean' },
    close_approach_data: {
      type: 'array',
      items: closeApproachItemSchema,
    },
    is_sentry_object: { type: 'boolean' },
  },
  required: [
    'links',
    'id',
    'neo_reference_id',
    'name',
    'nasa_jpl_url',
    'absolute_magnitude_h',
    'estimated_diameter',
    'is_potentially_hazardous_asteroid',
    'close_approach_data',
    'is_sentry_object',
  ],
  additionalProperties: true,
};

export const neoFeedResponseSchema: Schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['links', 'element_count', 'near_earth_objects'],
  properties: {
    links: linksSchema,
    element_count: { type: 'number' },
    near_earth_objects: {
      type: 'object',
      patternProperties: {
        '^\\d{4}-\\d{2}-\\d{2}$': {
          type: 'array',
          items: neoObjectSchema,
        },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: true,
};
