import {test, expect, Locator} from '@playwright/test'

test('Veirfy Chrome CPU load in dynamic table', async ({page}) => {
    await page.goto('https://practice.expandtesting.com/dynamic-table')

    const table: Locator = page.locator("table.table tbody")
    await expect(table).toBeVisible()

    const rows: Locator[] = await table.locator("tr").all()
    console.log('Number of rows in a table:', rows.length)
    expect(rows).toHaveLength(4)

    let cpuLoad: string = ''
    for (const row of rows) {
        const processName: string = await row.locator("td").nth(0).innerText()
        if (processName === 'Chrome') {
            // const cpuLoad: string = await row.locator("td:has-text('%')").innerText()
            cpuLoad = await row.locator("td", {hasText: "%"}).innerText()
            console.log('CPU Load of Chrome:', cpuLoad)
            break;
        }
    }

    let yellowBoxText: string = await page.locator("p#chrome-cpu").innerText()
    console.log('Chrome CPU lod from yellow box:', yellowBoxText)

    if (yellowBoxText.includes(cpuLoad)) {
        console.log('CPU load of Chrome is equal.')
    } else {
        console.log('CPU load of Chrome is not equal.')
    }

    expect(yellowBoxText).toContain(cpuLoad)

    await page.waitForTimeout(3000)
})