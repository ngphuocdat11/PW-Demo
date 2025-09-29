import {test, expect, Locator} from '@playwright/test';

test('', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    await page.locator("input[name='username']").fill('Admin')
    await page.locator("input[name='password']").fill('admin123')
    await page.locator("button[type='submit']").click()

    await page.getByText("PIM").click()
    await page.locator("form i").nth(2).click()
    await page.waitForTimeout(2000)

    const options: Locator = page.locator("div[role='listbox'] span")
    const count: number = await options.count()
    console.log('Number of options in a dropdown:', count)

    console.log('All the text content:', await options.allTextContents())

    console.log('Printing all the options:')
    for (let i: number = 0; i < count; i++) {
        // console.log(await options.nth(i).innerText())
        console.log(await options.nth(i).textContent())
    }

    for (let i: number = 0; i < count; i++) {
        const text = await options.nth(i).textContent()
        if (text === 'Automation Tester') {
            await options.nth(i).click()
            break
        }
    }

    await page.waitForTimeout(2000)
})