import {test, expect, Locator} from '@playwright/test'

test('Booking.com Date Picker Test', async ({page}) => {
    await page.goto('https://www.booking.com/')

    await page.getByTestId("date-display-field-start").click()

    let checkInYear: string = '2026'
    let checkInMonth: string = 'June'
    let checkInDay: string = '20'

    while (true) {
        const checkInMonthYear: string = await page.locator("h3[aria-live='polite']").nth(0)
            .innerText()
        const currentMonth: string = checkInMonthYear.split(' ')[0]
        const currentYear: string = checkInMonthYear.split(' ')[1]

        if (currentMonth === checkInMonth && currentYear === checkInYear) {
            break
        } else {
            await page.locator("button[aria-label='Next month']").click()
        }
    }

    let allDates: Locator[] = await page.locator("table.b8fcb0c66a tbody").nth(0)
        .locator("td").all()
    let checkinDateSelected: boolean = false

    for (let date of allDates) {
        const dateText: string = await date.innerText()
        if (dateText === checkInDay) {
            await date.click()
            checkinDateSelected = true
            break
        }
    }
    expect(checkinDateSelected).toBe(true)

    let checkOutYear: string = '2026'
    let checkOutMonth: string = 'July'
    let checkOutDay: string = '20'

    while (true) {
        const checkOutMonthYear: string = await page.locator("h3[aria-live='polite']").nth(1)
            .innerText()
        const currentMonth: string = checkOutMonthYear.split(' ')[0]
        const currentYear: string = checkOutMonthYear.split(' ')[1]

        if (currentMonth === checkOutMonth && currentYear === checkOutYear) {
            break
        } else {
            await page.locator("button[aria-label='Next month']").click()
        }
    }

    allDates = await page.locator("table.b8fcb0c66a tbody").nth(1).locator("td").all()
    let checkoutDateSelected: boolean = false

    for (let date of allDates) {
        const dateText: string = await date.innerText()
        if (dateText === checkOutDay) {
            await date.click()
            checkoutDateSelected = true
            break
        }
    }
    expect(checkoutDateSelected).toBeTruthy()

    await page.waitForTimeout(2000)
})