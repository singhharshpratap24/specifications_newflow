class PageElementHelper {

    async checkElementVisibility(selector) {
        try {
            // Use page.$() to check if the element exists in the DOM
            const element = await page.$(selector);
            if (element) {
                // Use evaluate() to check if the element is visible
                const isVisible = await page.evaluate(el => {
                    const style = window.getComputedStyle(el);
                    return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
                }, element);
                if (isVisible) {
                    return true;
                } else {
                    console.log("Element is Present in DOM but not Visible");
                }
            } else {
                console.log('Element is not present in the DOM');
            }
        } catch (error) {
            console.error('[ASSERT ERROR]Assertions:checkElementVisibility' + selector);
        }
    }

    async assertLinkEnabled(Link_Element) {
        try {
            console.log('Inside assert')
            await page.getByRole('link', { name: Link_Element }).isVisible()
        } catch (error) {
            console.error('[ASSERT ERROR]Assertions:checkElementEnable' + Link_Element)
        }
    }

    async findLocator(selector, timeout) {
        try {
            await page.waitForSelector(selector, { timeout: timeout });
            const locator = page.locator(selector);

            return locator;
        } catch (error) {
            const NoSuchElementError = `[NoSuchElementException] : Error accessing locator with selector: ${selector}`
            throw NoSuchElementError
        }
    };

    async getElementText(selector, timeout) {
        try {
            await page.waitForSelector(selector, { timeout: timeout });
            const locator = page.locator(selector);
            const locatorText = await locator.textContent();
            if (locatorText === null) {
                throw new Error(`Element found but text content is null for selector: ${selector}`);
            }
            return String(locatorText.trim());
        } catch (error) {
            const NoSuchElementError = `[NoSuchElementException] : Error accessing locator with selector: ${selector}`
            throw NoSuchElementError
        }
    }

}

module.exports = PageElementHelper
