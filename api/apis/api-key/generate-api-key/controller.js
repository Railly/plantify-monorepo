import { chromium } from '@playwright/test'
import ApiKey from '../../../models/ApiKey'
import { getDeterministicFakeEmail, getDeterministicFakePassword, getDeterministicFakeUsername } from '../../../utils/api-key'

export const generateApiKey = async (req, res) => {
  const user = {
    _id: '60f1b9b0e3b2b8a0b0b0b0b0',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    timesGeneratedApiKey: 0
  }

  try {
    const username = getDeterministicFakeUsername(user)
    const password = getDeterministicFakePassword(user)
    const email = getDeterministicFakeEmail(user)

    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://admin.mlapi.ai/signup')
    await page.fill('input[name="username"]', username)
    await page.screenshot({ path: './screenshots/username.png' })
    await page.fill('input[name="password1"]', password)
    await page.screenshot({ path: './screenshots/password1.png' })
    await page.fill('input[name="password2"]', password)
    await page.screenshot({ path: './screenshots/password2.png' })
    await page.fill('input[name="email"]', email)
    await page.screenshot({ path: './screenshots/email.png' })
    await page.fill('input[name="first_name"]', user.firstName)
    await page.screenshot({ path: './screenshots/first_name.png' })
    await page.fill('input[name="last_name"]', user.lastName)
    await page.screenshot({ path: './screenshots/last_name.png' })
    await page.click('input[type="submit"]')
    await page.screenshot({ path: './screenshots/submit.png' })
    await page.waitForNavigation()
    await page.screenshot({ path: `./screenshots/${username}.png` })
    await page.screenshot({ path: `./screenshots/${username}-api-key.png` })
    // const apiKeyValue = await page.textContent('input[name="key"]') || 'SUPER_F'
    await browser.close()

    const apiKey = new ApiKey({ key: 'SUPER_F', username: user.username })

    await apiKey.save()
    res.status(200).json({
      ok: true,
      message: 'API key generated successfully',
      apiKey
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: 'Error while generating API key',
      err
    })
  }
}
