import {test, expect, Locator} from '@playwright/test'

test('Comparing methods', async ({page}) => {
    await page.goto('https://demowebshop.tricentis.com/')

    const products: Locator = page.locator(".product-title")

    // console.log(await products.nth(1).innerText())
    // console.log(await products.nth(1).textContent())

    const count: number = await products.count()
    for (let i: number = 0; i < count; i++) {
        // const productName: string = await products.nth(i).innerText()
        // console.log(productName)

        // const productName: string = await products.nth(i).textContent()
        // console.log(productName)

        const productName: string = await products.nth(i).textContent()
        console.log(productName.trim())
    }

    console.log('Comparing allInnerTexts and allTextContents')

    // const productNames: string[] = await products.allInnerTexts()
    // console.log('Product names captured by allInnerTexts:', productNames)

    const productNames: string[] = await products.allTextContents()
    console.log('Product names captured by allInnerTexts:', productNames)

    const productNamesTrim: string[] = productNames.map(text => text.trim())
    console.log('Product Names after trimmed:', productNamesTrim)

    const productsLocators: Locator[] = await products.all()
    console.log(productsLocators)

    // console.log(await productsLocators[1].innerText())

    for (let productLocator of productsLocators) {
        console.log(await productLocator.innerText())
    }

    for (let i in productsLocators) {
        console.log(await productsLocators[i].innerText())
    }

    await page.waitForTimeout(2000)
})