import {test, expect} from '@playwright/test'

test('Single file upload', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    await page.locator("#singleFileInput").setInputFiles('uploads/Test1.txt')
    await page.locator("button:has-text('Upload Single File')").click()

    const message: string = await page.locator("#singleFileStatus").innerText()
    expect(message).toContain('Test1.txt')
    console.log('Upload successful')

    await page.waitForTimeout(2000)
})

test.only('Multiple file upload', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    await page.locator("#multipleFilesInput").setInputFiles(['uploads/testfile1.pdf', 'uploads/testfile2.pdf'])
    await page.locator("button:has-text('Upload Multiple Files')").click()

    const message: string = await page.locator("#multipleFilesStatus").innerText()
    expect(message).toContain('testfile1.pdf')
    expect(message).toContain('testfile2.pdf')
    console.log('Files upload successful')

    await page.waitForTimeout(2000)
})