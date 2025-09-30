import {test, expect, Locator} from "@playwright/test"

test('Static web table', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    const table: Locator = page.locator("table[name='BookTable'] tbody")
    await expect(table).toBeVisible()

    const rows: Locator = table.locator("tr")
    await expect(rows).toHaveCount(7)

    const rowsCount: number = await rows.count()
    console.log("Number of rows in the table: ", rowsCount)
    expect(rowsCount).toBe(7)

    const columns: Locator = rows.locator("th")
    await expect(columns).toHaveCount(4)

    const columnsCount: number = await columns.count()
    console.log("Number of columns/ headers:", columnsCount)

    const secondRowCell: Locator = rows.nth(2).locator("td")
    const secondRowText: string[] = await secondRowCell.allInnerTexts()
    console.log('2nd Row data:', secondRowText)
    await expect(secondRowCell).toHaveText(['Learn Java', 'Mukesh', 'Java', '500'])
    console.log('printing 2nd row data:')
    for (let text of secondRowText) {
        console.log(text)
    }

    console.log('Printing all Table Data')
    const allRowData: Locator[] = await rows.all()

    console.log('BookName   Author  Subject Price')
    for (let row of allRowData.slice(1)) {
        const cols: string[] = await row.locator('td').allInnerTexts()
        console.log(cols.join('\t'))
    }

    console.log('Bookes written by Mukesh')
    const mukeshBooks: string[] = []

    for (let row of allRowData.slice(1)) {
        const cells: string[] = await row.locator('td').allInnerTexts()
        const author: string = cells[1]
        const book: string = cells[0]
        if (author === 'Mukesh') {
            console.log(`${author}\t ${book}`)
            mukeshBooks.push(book)
        }
    }
    expect(mukeshBooks).toHaveLength(2)

    let totalPrice: number = 0
    for (let row of allRowData.slice(1)) {
        const cells: string[] = await row.locator('td').allInnerTexts()
        const price: string = cells[3]
        totalPrice += parseInt(price)
    }
    console.log('Total Price of all books: ', totalPrice)
    expect(totalPrice).toBe(7100)
    

    await page.waitForTimeout(2000)
})