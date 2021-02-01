import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const { PROJECT_ID, PRIVATE_KEY, CLIENT_EMAIL } = publicRuntimeConfig

export default {
  private_key: PRIVATE_KEY,
  client_email: CLIENT_EMAIL,
  project_id: PROJECT_ID,
}
