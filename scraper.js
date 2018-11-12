const puppeteer = require('puppeteer')

const initScraper = async () => {
	// you can add { devtools: true } to in the launch function to see live actions
	const browser = await puppeteer.launch()
	const scrapeOne = await findPriceByItem(browser)
	const scrapeMany = findPricesByItems(scrapeOne)
	const close = closeBrowser(browser)
	return {
		findPriceByItem: scrapeOne,
		findPricesByItems: scrapeMany,
		closeBrowser: close
	}
}

const findPriceByItem = async browser => {
	const page = await browser.newPage()
	await page.goto('https://www.bol.com/nl/', {
		waitUntil: 'networkidle0'
	})
	return async searchTerm => {
		// await page.waitFor(3000) You can add a delay when dealing with many searches
		await page.type('#searchfor', searchTerm)
		await page.select('#product_select', 'books_all')
		await page.click('input.search-btn')
		await page.waitForNavigation({ waitUntil: 'networkidle0' })
		try {
			await clickInput(page, 'input#facet_1426')
			await clickInput(page, 'input#facet_8293')
			await page.waitForSelector('a.product-title')
			return await page.$eval(
				'.price-block__highlight',
				priceBlock =>
					priceBlock.textContent
						.replace(/[\n\r]+|[\s]{2,}/g, ' ')
						.trim()
						.split(',')[0]
			)
		} catch (err) {
			err
			return 0
		}
	}
}

const findPricesByItems = findPriceByItem => async books => {
	for await (const book of books) {
		book.price = Number(await findPriceByItem(book.title))
		console.log(book.price, book.title)
	}
	console.log(books)
	return books
}

const clickInput = async (page, selector) => {
	await page.$eval(selector, input => {
		input.click()
	})
	return await page.waitForNavigation({ waitUntil: 'networkidle0' })
}

const closeBrowser = browser => async () => browser.close()

module.exports = initScraper
