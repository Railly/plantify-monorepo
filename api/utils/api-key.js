
export const getDeterministicFakeUsername = (user) => {
  const { firstName, lastName, timesGeneratedApiKey } = user
  const username = `${firstName.slice(0, 3)}${lastName.slice(0, 3)}${timesGeneratedApiKey}`
  return username
}

export const getDeterministicFakePassword = (user) => {
  return 'Contra-2022-GA'
}

export const getDeterministicFakeEmail = (user) => {
  const { firstName, lastName, timesGeneratedApiKey } = user
  const email = `${firstName.slice(0, 3)}${lastName.slice(0, 3)}${
    timesGeneratedApiKey
  }@gmail.com`
  return email
}
