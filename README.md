# Bol Scraper
A little server side scraper build with NodeJS and [Puppeteer](https://github.com/GoogleChrome/puppeteer) that searches a price for books on the [bol.com](https://bol.com) platform.

## Installation
```bash
git clone https://github.com/timruiterkamp/Bol-scraper.git  
cd Bol-scraper  
npm i
nodemon index
```

## Usage 🚀
Currently the scraper needs an array of objects with a title so it can lookup the books by title and find it's price. The price is now cut off at the first number, so keep in mind you will only get whole numbers.

```J
[
    { 
        title: 'Jaws'
    }
]
```
Result after the scraper is done:
```Js
[ 
    { 
        title: 'Jaws', 
        price: 12 
    }
]
```

### You can add custom filters as:

  
To retrieve a certain filter, open your element inspector and inspect the dropdown filter near the searbar as seen below.
  
![Filter by category]('https://github.com/timruiterkamp/bol-scraper/blob/master/searchbar.png') 
  
``` Javascript 
// Look up only a certain type of items, in this case books.
await page.select('#product_select', 'books_all')

```

  
Or filter by custom filters in the sidebar of a page.

```Javascript
// Just look up the input id's of the filters and you can use them like this:

// This searches for second hand books
await clickInput(page, 'input#facet_1426')

// This searches for dutch bases books
await clickInput(page, 'input#facet_8293')
```

## To Do: 
- [X] Support a list of filters
- [ ] Create more examples 

## Code description
| Files   |      Description      |
|----------|-------------|
| index.js |  Base of the code where the initialize of the scraper takes place|
| scraper.js |  The scraper code with variable settings like filters  |


## License
[MIT LICENSE](license.txt)