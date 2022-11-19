import { chromium } from '@playwright/test'
import User from '../../../models/User'
import { DESCRIPTION_120_CHAR } from '../../../utils/api-key'

export const generateApiKey = async (req, res) => {
  const { username } = req.user
  console.log({ username })
  try {
    const browser = await chromium.launch()
    const page = await browser.newPage()

    /** Finishing 'Create Account' process */
    await page.goto('https://admin.mlapi.ai/login')
    await page.fill('input[name="username"]', username)
    await page.screenshot({ path: './screenshots/request-api-key-1.png' })
    await page.fill('input[name="password"]', 'mobile-2022')
    await page.screenshot({ path: './screenshots/request-api-key-2.png' })
    await page.click('button[type="submit"]')
    await page.screenshot({ path: './screenshots/request-api-key-3.png' })
    await page.waitForSelector('text=Create account')
    await page.screenshot({ path: `./screenshots/${username}-api-key.png` })
    await page.fill('input[name="name"]', 'Prueba XD')
    await page.click('input[id="id_expected_usage_0"]')
    await page.click('input[id="id_category_1"]')
    await page.fill('textarea[name="project_name_description"]', DESCRIPTION_120_CHAR)
    await page.screenshot({ path: './screenshots/request-api-key-4.png' })
    await page.click('input[type="submit"]')
    await page.screenshot({ path: './screenshots/request-api-key-5.png' })

    /** Actually generating the API Key */
    const createButton = await page.waitForSelector('text=Create new API key')
    await createButton.click()
    await page.screenshot({ path: './screenshots/request-api-key-6.png' })
    await page.click('input[id="systemRadio1"]')
    await page.fill('input[name="name"]', 'Plantify')
    await page.fill('input[name="credits"]', '100')
    await page.click('button[type="submit"]')
    await page.screenshot({ path: './screenshots/request-api-key-7.png' })

    /** Retrieving API Key */
    await page.waitForSelector('text=API key Plantify created.')
    const getButton = await page.waitForSelector('text=Show key')
    await getButton.click()
    const apiKey = await page.getAttribute('input[id="copy-input"]', 'value')
    await browser.close()

    await User.updateOne({ username }, {
      $set: {
        apiKey
      }
    }).exec()

    res.status(200).json({
      ok: true,
      message: 'API generated successfully',
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
