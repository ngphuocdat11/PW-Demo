import {test, expect, Locator} from '@playwright/test'
import {match} from "node:assert";

test('Read data from all the table pages', async ({page}) => {
    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html')
    let hasMorePages: boolean = true

    while (hasMorePages) {
        const rows: Locator[] = await page.locator("#example>tbody>tr").all()
        for (let row of rows) {
            console.log(await row.innerText())
        }
        await page.waitForTimeout(2000)

        const nextButton: Locator = page.locator("button[aria-label='Next']")
        const isDisabled: string = await nextButton.getAttribute('class')
        if (isDisabled.includes('disabled')) {
            hasMorePages = false
        } else {
            await nextButton.click()
        }
    }

    await page.waitForTimeout(2000)
})

test('Filter the rows and check the rows count', async ({page}) => {
    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html')

    const dropdown: Locator = page.locator("#dt-length-0")
    await dropdown.selectOption({label: '25'})

    // const rows: Locator[] = await page.locator("#example tbody tr").all()
    // expect(rows.length).toBe(25)

    const rows: Locator = page.locator("#example tbody tr")
    await expect(rows).toHaveCount(25)


    await page.waitForTimeout(2000)
})

test.only('Search for specific data in a table', async ({page}) => {
    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html')

    const searchBox: Locator = page.locator("#dt-search-0")
    await searchBox.fill('Paul Byrd')
    await page.waitForTimeout(2000)
    const rows: Locator[] = await page.locator("#example tbody tr").all()

    if (rows.length >= 1) {
        let matchFound: boolean = false
        for (let row of rows) {
            const text: string = await row.innerText()
            if (text.includes('Paul Byrd')) {
                console.log('Record exist - found')
                matchFound = true
                break;
            }
        }
        // expect(matchFound).toBe(true)
        expect(matchFound).toBeTruthy()
    } else {
        console.log('No rows found with search text')
    }

    await page.waitForTimeout(2000)
})