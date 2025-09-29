import {test, expect, Locator} from '@playwright/test';

test('Verify dropdown contains duplicates', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    const dropdownOptions: Locator = page.locator('#animals>option')

    const optionsText: string[] = (await dropdownOptions.allTextContents()).map(text => text.trim())

    const mySet = new Set<string>()
    const duplicates: string[] = []

    for (const text of optionsText) {
        if (mySet.has(text)) {
            duplicates.push(text)
        } else {
            mySet.add(text)
        }
    }
    console.log("Duplicate options are: ", duplicates)

    if (duplicates.length > 0) {
        console.log("Duplicate options are: ", duplicates)
    } else {
        console.log("No duplicate options found")
    }

    expect(duplicates.length).toBe(0)

    await page.waitForTimeout(2000)
})