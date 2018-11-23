# apollo-server-test
Testing repository combining Apolloserver with data from Kentico Cloud

## Prerequisites
* [NodeJs + npm](https://nodejs.org/) installed

## How to run

1. Clone the repository
2. Run `npm install` to install al required packages
3. Run `node index.js` to run the server
4. Open browser on address http://localhost:4000/ to see the playground
    
The playground is ready with two queries `items` and `itemsByType`.

Items load all items:
```
{
items {
    system {
      name
      codename
      language
      type
      lastModified
    }
  }
}
```

Query preconfigured for 'article type' (with title text field element):
```
{
  itemsByType(type: "article") {
    system {
      id
      codename
    }
    title {
      value
    }
  }
}
```

