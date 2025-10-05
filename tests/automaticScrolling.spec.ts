import {test, expect, Locator} from '@playwright/test'

test('Automatic scrolling', async ({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://demowebshop.tricentis.com/')
    const footerText: string = await page.locator(".footer-disclaimer").innerText()
    console.log('Footer text capture:', footerText)

    await page.waitForTimeout(2000)
})

test('Scrolling inside the dropdown', async ({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator("#comboBox").click()
    const option: Locator = page.locator("#dropdown div:nth-child(12)")
    const optionText: string = await option.innerText()
    console.log('Option captured from Dropdown:', optionText)
    await option.click()

    await page.waitForTimeout(2000)
})

test.only('Scrolling inside the table', async ({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://datatables.net/examples/basic_init/scroll_xy.html')
    const name: string = await page.locator("tbody tr:nth-child(10) td:nth-child(2)").innerText()
    console.log('Last name from 10th row & 2nd column:', name)
    const email: string = await page.locator("tbody tr:nth-child(10) td:nth-child(9)").innerText()
    console.log('Email from 10th row & 9th column:', email)

    await page.waitForTimeout(2000)
})