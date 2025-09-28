import {test, expect, Locator} from "@playwright/test";

test('Single Select Dropdown', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    // await page.locator('#colors').selectOption(['Red', 'Blue', 'Green'])
    // await page.locator('#colors').selectOption(['red','blue' , 'green'])
    // await page.locator('#colors').selectOption([{label:'Red'}, {label:'Blue'}, {label:'Green'}])
    await page.locator('#colors').selectOption([{index:0}, {index:2}, {index:4}])

    const dropdownOptions:Locator = page.locator('#colors>option')
    await expect(dropdownOptions).toHaveCount(7)

    const optionsText:string[] = (await dropdownOptions.allTextContents()).map(text => text.trim())
    // console.log(optionsText)
    expect(optionsText).toContain('Green')

    for(const option of optionsText){
        console.log(option)
    }



    await page.waitForTimeout(2000)

})