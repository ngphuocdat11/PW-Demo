import {test, expect, Locator} from '@playwright/test';

test('Xpath Axes Demo', async ({page}) => {
    await page.goto('https://www.w3schools.com/html/html_tables.asp')

    const germanyCell:Locator = page.locator("//td[text()='Germany']/self::td")
    await expect(germanyCell).toHaveText('Germany')

    const parentRow:Locator = page.locator("//td[text()='Germany']/parent::tr")
    await expect(parentRow).toContainText('Alfreds Futterkiste Maria Anders Germany')
    console.log(await parentRow.allTextContents())

    const secondRow:Locator = page.locator("//table[@id='customers']//tr[2]/child::td")
    await expect(secondRow).toHaveCount(3)

    const table:Locator = page.locator("//td[text()='Germany']/ancestor::table")
    await expect(table).toHaveAttribute('id', 'customers')

    const allTds:Locator = page.locator("//table[@id='customers']/descendant::td")
    await expect(allTds).toHaveCount(18)

    const followingCell:Locator = page.locator("//td[text()='Germany']/following::td[1]")
    await expect(followingCell).toHaveText('Centro comercial Moctezuma')

    const noSibling:Locator = page.locator("//td[text()='Germany']/following-sibling::td")
    await expect(noSibling).toHaveCount(0)

    const rightSibling:Locator = page.locator("//td[text()='Maria Anders']/following-sibling::td")
    await expect(rightSibling).toHaveCount(1)

    const precedingCell:Locator = page.locator("//td[text()='Germany']/preceding-sibling::td[1]")
    await expect(precedingCell).toHaveText('Maria Anders')

    const leftSibling:Locator = page.locator("//td[text()='Germany']/preceding-sibling::td")
    await expect(leftSibling).toHaveCount(2)
    await expect(leftSibling.nth(0)).toHaveText('Alfreds Futterkiste')
    await expect(leftSibling.nth(1)).toHaveText('Maria Anders')



})