/* global describe expect test */
import { readFileSync } from 'node:fs'
import * as fsPath from 'node:path'

import Ajv from 'ajv'
import yaml from 'js-yaml'

const registryPath = fsPath.resolve(__dirname, '..', 'registry.yaml')
const registrySchemaPath = fsPath.resolve(__dirname, '..', 'registry.schema.yaml')

describe('registry.schema.json', () => {
  test('can be parsed', () => {
    const jsonS = readFileSync(registrySchemaPath, { encoding : 'utf8' })
    expect(() => yaml.load(jsonS)).not.toThrow()
  })
})

describe('registry.json', () => {
  test('can be parsed', () => {
    const jsonS = readFileSync(registryPath, { encoding : 'utf8' })
    expect(() => yaml.load(jsonS)).not.toThrow()
  })

  test('conforms to the schema', () => {
    const registryJSON = yaml.load(readFileSync(registryPath, { encoding : 'utf8' }))
    const registrySchemaJSON = yaml.load(readFileSync(registrySchemaPath, { encoding : 'utf8' }))

    const ajv = new Ajv()
    const validate = ajv.compile(registrySchemaJSON)
    validate(registryJSON)
    expect(validate.errors).toBe(null)
  })
})
