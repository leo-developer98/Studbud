const axios = require('axios')
// 'event' and 'context' are automatically passed to the function
// event contains the query parameters that we will be passing with the API call
export async function handler(event, context) {
//   extract the word query parameter from the HTTP request
  const word = event.queryStringParameters.word || "automobile";
  try {
    // send request to the WordsAPI
    const response = await axios({
      "method":"GET",
      "url":`https://wordsapiv1.p.rapidapi.com/words/${word}`,
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key":"02df4fb51bmsh702ed367223bfccp13c6d8jsnf367d77b2d56"
      }
    })
    // START OF NEW CODE
    // create new array to push data to
    let results = [];
    response.data.results.map(def => {
      let definitionArray = [];
      // creates array of keys in object
      const keys = Object.keys(def);
      keys.map(key => {
        // builds regex that looks for capital letters
        // The response parameters are in camelCase, so we need to ID
        // the capital letters and add spaces instead so the 
        // front end can easily display the parameter labels
        const regex = /(?=[A-Z])/;
        // creates presentable label
        const label = key.split(regex).join(' ').toLowerCase();
        // grabs the value for the parameter from the
        // definition object in response
        const value = def[key];
        // constructs new object to send to frontend
        let newObj = {
          label,
          value,
          isString: typeof value === 'string' ? true : false
        };
        definitionArray.push(newObj)
      })
      results.push(definitionArray)
    })
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  } catch (err) {
    console.log(err)
    return { statusCode: 500, body: err.toString() }
  }
}