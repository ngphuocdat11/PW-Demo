import {test, expect, Locator} from '@playwright/test'

test('Autosuggest dropdown', async ({page}) => {
    await page.goto('https://www.flipkart.com/')

    await page.locator("input[name='q']").fill("smart")
    await page.waitForTimeout(2000)

    const options: Locator = page.locator("ul>li")
    const count: number = await options.count()
    console.log("Number of suggested options:", count)

    console.log("5th option:", await options.nth(5).innerText())

    console.log('Print all the auto suggestion')
    for (let i: number = 0; i < count; i++) {
        console.log(await options.nth(i).textContent())
    }

    for (let i: number = 0; i < count; i++) {
        // console.log(await options.nth(i).innerText())
        const text = await options.nth(i).textContent()
        if (text === 'smartphone') {
            await options.nth(i).click()
            break
        }
    }


    await page.waitForTimeout(2000)
})