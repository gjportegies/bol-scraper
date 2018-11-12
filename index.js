const initScraper = require('./scraper')

const book = [
	{
		title: 'Jaws'
	}
]

initScraper()
	.then(scraper => {
		scraper.findPricesByItems(book)
	})
	.then(booksWithPrices => console.log(booksWithPrices))
	.catch(err => err)
