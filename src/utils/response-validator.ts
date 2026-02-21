import { expect } from '@playwright/test';
import Ajv, { type ValidateFunction, type Schema } from 'ajv';

export const validateResponseBySchema = (
  data: unknown,
  schema: Schema
) => {
  const validate: ValidateFunction = new Ajv({
    allErrors: true,
    allowUnionTypes: true,
  }).compile(schema);
  expect(validate(data), `Response does not match the schema:\n${JSON.stringify(validate.errors, null, 2)}`).toBe(true);
};