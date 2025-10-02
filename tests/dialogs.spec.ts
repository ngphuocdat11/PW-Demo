import {test, expect, Locator} from "@playwright/test"

test('Simple Dialog', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    page.on('dialog', (dialog) => {
        console.log('Dialog type is:', dialog.type())
        expect(dialog.type()).toContain('alert')
        console.log('Dialog text:', dialog.message())
        expect(dialog.message()).toContain('I am an alert box!')
        dialog.accept()
    })

    await page.locator("#alertBtn").click()

    await page.waitForTimeout(2000)
})

test('Confirmation Dialog', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    page.on('dialog', (dialog) => {
        console.log('Dialog type is:', dialog.type())
        expect(dialog.type()).toContain('confirm')
        console.log('Dialog text:', dialog.message())
        expect(dialog.message()).toContain('Press a button!')
        dialog.accept()
        // dialog.dismiss()
    })

    await page.locator("#confirmBtn").click()
    const text: string = await page.locator("#demo").innerText()
    console.log('Output text:', text)
    await expect(page.locator("#demo")).toHaveText('You pressed OK!')

    await page.waitForTimeout(2000)
})

test.only('Prompt Dialog', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    page.on('dialog', (dialog) => {
        console.log('Dialog type is:', dialog.type())
        expect(dialog.type()).toContain('prompt')
        console.log('Dialog text:', dialog.message())
        expect(dialog.message()).toContain('Please enter your name:')
        expect(dialog.defaultValue()).toContain('Harry Potter')
        dialog.accept('John')
    })

    await page.locator("#promptBtn").click()
    const text: string = await page.locator("#demo").innerText()
    console.log('Output text:', text)
    await expect(page.locator("#demo")).toHaveText('Hello John! How are you today?')

    await page.waitForTimeout(2000)
})