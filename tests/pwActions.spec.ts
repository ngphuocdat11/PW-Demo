import {test, expect, Locator} from '@playwright/test';

test('Text Input Actions', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    const textBox:Locator = page.locator("#name")
    await expect(textBox).toBeVisible()
    await expect(textBox).toBeEnabled()
    const maxLength:string = await textBox.getAttribute('maxlength')
    expect(maxLength).toBe('15')
    await textBox.fill('John Kennedy')

    // console.log("text content of First Name: ", await textBox.textContent())

    const enteredValue:string = await textBox.inputValue()
    console.log("input value of First Name: ", enteredValue)
    expect(enteredValue).toBe('John Kennedy')

    await page.waitForTimeout(2000)
})

test('Radio Button Actions', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    const maleRadio:Locator = page.locator('#male')
    await expect(maleRadio).toBeVisible()
    await expect(maleRadio).toBeEnabled()
    expect(await maleRadio.isChecked()).toBe(false)

    await maleRadio.check()
    expect(await maleRadio.isChecked()).toBe(true)
    await expect(maleRadio).toBeChecked()

    await page.waitForTimeout(2000)
})

test.only('CheckBox Actions', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    const sundayCheckbox:Locator = page.getByLabel('Sunday')

    // await sundayCheckbox.check()
    // await expect(sundayCheckbox).toBeChecked()

    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const checkBoxes:Locator[] = days.map(index => page.getByLabel(index))
    expect(checkBoxes.length).toBe(7)

    /*
    for(const checkbox of checkBoxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked()
    }

    for(const checkbox of checkBoxes.slice(-3)) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked()
    }

    for(const checkbox of checkBoxes) {
        if(await checkbox.isChecked()){
            await checkbox.uncheck()
            await expect(checkbox).not.toBeChecked()
        } else {
            await checkbox.check()
            await expect(checkbox).toBeChecked()
        }
    }

    const indexes:number[] = [1, 3 ,6]
    for(const i of indexes) {
        await checkBoxes[i].check()
        await expect(checkBoxes[i]).toBeChecked()
    }
     */

    const weekname:string = 'Friday'
    for(const label of days) {
        if(label.toLowerCase() === weekname.toLowerCase()) {
            const checkbox:Locator = page.getByLabel(label)
            await checkbox.check()
            await expect(checkbox).toBeChecked()
        }
    }

    await page.waitForTimeout(2000)
})