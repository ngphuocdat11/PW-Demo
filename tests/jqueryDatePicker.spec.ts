import {test, expect, Locator, Page} from '@playwright/test'

async function selectDate(targetYear: string, targetMonth: string, targetDay: string, page: Page,
                          isFuture: boolean) {
    while (true) {
        const currentMonth: string = await page.locator(".ui-datepicker-month").textContent()
        const currentYear: string = await page.locator(".ui-datepicker-year").textContent()

        if (currentMonth === targetMonth && currentYear === targetYear) {
            break;
        }

        if (isFuture) {
            await page.locator(".ui-datepicker-next").click()
        } else {
            await page.locator(".ui-datepicker-prev").click()
        }
    }

    const allDates: Locator[] = await page.locator(".ui-datepicker-calendar td").all()

    for (let date of allDates) {
        const dateText: string = await date.innerText()

        if (dateText === targetDay) {
            await date.click()
            break
        }
    }
}

test('JQuery datepicker', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    const dateInput: Locator = page.locator("#datepicker")
    await expect(dateInput).toBeVisible()

    // await dateInput.fill('06/20/2025')

    await dateInput.click()

    const year = '2024'
    const month = 'June'
    const day = '20'

    await selectDate(year, month, day, page, false)
    const expectedDate = '06/20/2024'
    await expect(dateInput).toHaveValue(expectedDate)

    await page.waitForTimeout(2000)
})