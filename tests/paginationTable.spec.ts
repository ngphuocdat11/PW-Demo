import {test, expect, Locator} from '@playwright/test'

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

    await page.waitForTimeout(2000)
})