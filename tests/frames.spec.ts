import {test, expect, Locator, Frame} from '@playwright/test'

test('frames demo', async ({page}) => {
    await page.goto('https://ui.vision/demo/webtest/frames/')

    // const frames: Frame[] = page.frames()
    // console.log('Number of frames:', frames.length)
    //
    // const frame: Frame = page.frame("https://ui.vision/demo/webtest/frames/frame_1.html")
    //
    // if (frame) {
    //     await frame.locator("input[name='mytext1']").fill('Hello')
    //     // await frame.fill("input[name='mytext1']", 'Hello')
    // } else {
    //     console.log('Frame is not available')
    // }

    const inputBox: Locator = page.frameLocator("[src='frame_1.html']")
        .locator("[name='mytext1']")
    await inputBox.fill('John')

    await page.waitForTimeout(2000)
})

test.only('inner frames demo', async ({page}) => {
    await page.goto('https://ui.vision/demo/webtest/frames/')

    const frame3: Frame = page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_3.html'})

    if (frame3) {
        await frame3.locator("[name='mytext3']").fill('Welcome')
        const childFrames: Frame[] = frame3.childFrames()
        console.log('Child frames inside frame 3:', childFrames.length)
        const radio: Locator = childFrames[0].getByLabel("I am a human")
        await radio.check()
        await expect(radio).toBeChecked()
    } else {
        console.log('Frame 3 is not found')
    }

    await page.waitForTimeout(2000)
})