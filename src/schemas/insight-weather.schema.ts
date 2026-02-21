/**
 * JSON Schema for InSight Mars Weather API response.
 * @see https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf
 */

import { Schema } from "ajv";

const sensorSummarySchema: Schema = {
  type: 'object',
  properties: {
    av: { type: 'number' },
    ct: { type: 'number' },
    mn: { type: 'number' },
    mx: { type: 'number' },
  },
  required: ['av', 'ct', 'mn', 'mx'],
  additionalProperties: false,
};

const compassPointSchema: Schema = {
  type: 'object',
  properties: {
    compass_degrees: { type: 'number' },
    compass_point: { type: 'string' },
    compass_right: { type: 'number' },
    compass_up: { type: 'number' },
    ct: { type: 'number' },
  },
  required: ['compass_degrees', 'compass_point', 'compass_right', 'compass_up', 'ct'],
  additionalProperties: false,
};

const windDirectionSchema: Schema = {
  type: 'object',
  properties: {
    most_common: {
      oneOf: [{ ...compassPointSchema }, { type: 'null' }],
    },
  },
  required: ['most_common'],
  additionalProperties: true,
};

const perSolDataSchema: Schema = {
  type: 'object',
  properties: {
    AT: sensorSummarySchema,
    HWS: sensorSummarySchema,
    PRE: sensorSummarySchema,
    WD: windDirectionSchema,
    Season: {
      type: 'string',
      enum: ['winter', 'spring', 'summer', 'fall'],
    },
    First_UTC: { type: 'string' },
    Last_UTC: { type: 'string' },
  },
  additionalProperties: true,
};

const validityCheckSensorSchema: Schema = {
  type: 'object',
  properties: {
    sol_hours_with_data: {
      type: 'array',
      items: { type: 'integer', minimum: 0, maximum: 23 },
    },
    valid: { type: 'boolean' },
  },
  required: ['sol_hours_with_data', 'valid'],
  additionalProperties: false,
};

const validityChecksSchema: Schema = {
  type: 'object',
  properties: {
    sol_hours_required: { type: 'number' },
    sols_checked: {
      type: 'array',
      items: { type: 'string', pattern: '^\\d+$' },
    },
  },
  required: ['sol_hours_required', 'sols_checked'],
  additionalProperties: true, // dynamic sol keys with per-sensor validity
};

export const insightWeatherResponseSchema: Schema = {
  type: 'object',
  required: ['sol_keys'],
  properties: {
    sol_keys: {
      type: 'array',
      items: { type: 'string', pattern: '^\\d+$' },
      minItems: 1,
      maxItems: 7,
    },
    validity_checks: validityChecksSchema,
  },
  patternProperties: {
    '^\\d+$': perSolDataSchema,
  },
  additionalProperties: false,
};
