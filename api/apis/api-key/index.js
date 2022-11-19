import { generateApiKey } from './generate-api-key/controller'
import { generateApiKeyValidator } from './generate-api-key/validators'
import { requestApiKey } from './request-api-key/controller'
import { requestApiKeyValidator } from './request-api-key/validators'

export const apiKeys = {
  request: [requestApiKeyValidator, requestApiKey],
  generate: [generateApiKeyValidator, generateApiKey]
}
