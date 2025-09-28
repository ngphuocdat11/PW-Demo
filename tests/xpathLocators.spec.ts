import {test, expect, Locator} from '@playwright/test';

test('Xpath demo in playwright', async ({page}) => {

    await page.goto('https://demowebshop.tricentis.com/')

    const absoluteLogo:Locator = page.locator(
        "xpath=/html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]")
    await expect(absoluteLogo).toBeVisible()

    const relativeLogo:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']")
    await expect(relativeLogo).toBeVisible()

    const products:Locator = page.locator("//h2//a[contains(@href,'computer')]")
    const productsCount:number = await products.count()
    console.log('No of computer related products: ', productsCount)
    expect(productsCount).toBeGreaterThan(0)

   // console.log( await products.textContent())

    console.log('First computer related product: ', await products.first().textContent())
    console.log('Last computer related product: ', await products.last().textContent())
    console.log('Nth computer related product: ', await products.nth(3).textContent())

    const productTitles:string[] = await products.allTextContents()

    console.log('All computer related product titles: ', productTitles)

    for(let pt of productTitles) {
        console.log(pt)
    }

    const buildingProducts:Locator = page.locator("//h2/a[starts-with(@href,'/build')]")
    const count:number = await buildingProducts.count()
    expect(count).toBeGreaterThan(0)

    const regLink:Locator = page.locator("//a[text()='Register']")
    await expect(regLink).toBeVisible()

    const lastItem:Locator = page.locator("//div[@class='column follow-us']//li[last()]")
    await expect(lastItem).toBeVisible()
    console.log('Text content of last item: ', await lastItem.textContent())

    const positionItem:Locator = page.locator("//div[@class='column follow-us']/ul/li[position()=3]")
    await expect(positionItem).toBeVisible()
    console.log('Text content of position item: ', await positionItem.textContent())


})