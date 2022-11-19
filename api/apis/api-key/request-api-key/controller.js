import { chromium } from '@playwright/test'

export const requestApiKey = async (req, res) => {
  const { email, username, firstName, lastName } = req.user

  try {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://admin.mlapi.ai/signup')
    await page.fill('input[name="username"]', username)
    await page.screenshot({ path: './screenshots/username.png' })
    await page.fill('input[name="password1"]', 'mobile-2022')
    await page.screenshot({ path: './screenshots/password1.png' })
    await page.fill('input[name="password2"]', 'mobile-2022')
    await page.screenshot({ path: './screenshots/password2.png' })
    await page.fill('input[name="email"]', email)
    await page.screenshot({ path: './screenshots/email.png' })
    await page.fill('input[name="first_name"]', firstName)
    await page.screenshot({ path: './screenshots/first_name.png' })
    await page.fill('input[name="last_name"]', lastName)
    await page.screenshot({ path: './screenshots/last_name.png' })
    await page.click('input[type="submit"]')
    await page.screenshot({ path: './screenshots/submit.png' })
    await page.waitForSelector('text=Confirm your email address first.')
    await page.screenshot({ path: `./screenshots/${username}-api-key.png` })
    await browser.close()

    res.status(200).json({
      ok: true,
      message: 'API key requested successfully, please check your email'
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: 'Error while requesting API key',
      err
    })
  }
}
