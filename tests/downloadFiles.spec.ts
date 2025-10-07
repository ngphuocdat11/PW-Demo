import {test, expect} from '@playwright/test'
// @ts-ignore
import fs from 'fs'

test('Download text files', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html')

    await page.locator("#inputText").fill('welcome')
    await page.locator("#generateTxt").click()

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator("#txtDownloadLink").click()
    ])
    const downloadedFilePath = 'downloads/testfile.txt'
    await download.saveAs(downloadedFilePath)

    const fileExists = fs.existsSync(downloadedFilePath)
    expect(fileExists).toBe(true)

    if (fileExists) {
        fs.unlinkSync(downloadedFilePath)
    }

    await page.waitForTimeout(2000)
})

test.only('Download pdf files', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html')

    await page.locator("#inputText").fill('welcome')
    await page.locator("#generatePdf").click()

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator("#pdfDownloadLink").click()
    ])
    const downloadedFilePath = 'downloads/testfile.pdf'
    await download.saveAs(downloadedFilePath)

    const fileExists = fs.existsSync(downloadedFilePath)
    expect(fileExists).toBe(true)

    if (fileExists) {
        fs.unlinkSync(downloadedFilePath)
    }

    await page.waitForTimeout(2000)
})