import {test, expect} from '@playwright/test';

test('Verify page URL', async({page}) => {
    await page.goto('http://www.automationpractice.pl/index.php')
    let url:string = page.url()
    console.log('Url: ', url)
    await expect(page).toHaveURL(/automationpractice/)

})