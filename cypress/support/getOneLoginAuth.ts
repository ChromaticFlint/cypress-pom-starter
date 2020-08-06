const puppeteer = require('puppeteer')

// fix the type: any that was used when convering to ts
exports.getOneLoginAuth = async function getAuthToken(userObject: any) {
  const { email, password, url, auth_url } = userObject;
  const credentials = await puppeteer
    .launch( { headless: true })
    .then(async (browser: any) => {
      try {
      let page = await browser.newPage();
      
      await page.goto(auth_url)
      await page.waitForSelector('') // Add Username/Email Field Selector
      await page.type('', email) // Add Username/Email Field Selector
      await page.waitFor(3000)
      await page.click('') // Add next button selector if next is required to see password field
      await page.waitForSelector('') // Add Passwword Field Selector
      await page.type('', password) // Add Passwword Field Selector
      await page.click('') // Add next button selector if next is required to see password field

      // Navigate to App
      await page.waitFor(5000)
      await page.reload()
      page = await browser.newPage()
      await page.waitFor(5000)
      await page.goto(url)
      await page.waitFor(2000)
      try {
        await page.waitForSelector('', {timeout: 4000}) // Add a selector only seen on successful authenticion
      }
      finally {
        await page.reload()
        await page.waitForSelector('', {timeout: 4000}) // Add a selector only seen on successful authenticion
      }
      
      // Pretty sure this to line 42 can be cleaned up.
      let localStorageData = await page.evaluate(() => {
        return JSON.stringify(localStorage)
      })

      browser.close()
      localStorageData = JSON.parse(localStorageData)
      return localStorageData

      } catch (error) {
        console.error(error)
        browser.close()
        return 0
      }
    })
    return credentials
}
