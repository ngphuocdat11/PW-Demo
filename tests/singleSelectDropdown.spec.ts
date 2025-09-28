import {test, expect, Locator} from "@playwright/test";

test('Single Select Dropdown', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    await page.locator('#country').selectOption('Japan')
    await page.locator('#country').selectOption({value:'france'})
    await page.locator('#country').selectOption({label:'Canada'})
    await page.locator('#country').selectOption({index:3})

    const dropdownOptions:Locator = page.locator('#country>option')
    await expect(dropdownOptions).toHaveCount(10)

    const optionsText:string[] = (await dropdownOptions.allTextContents()).map(text => text.trim())
    console.log(optionsText)

    expect(optionsText).toContain('Japan')

    for(const option of optionsText){
        console.log(option)
    }


    await page.waitForTimeout(2000)

})