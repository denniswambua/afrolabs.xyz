import { Formidable } from "formidable";

import * as cheerio from 'cheerio';

export const config = {
    api: {
      bodyParser: false,
      sizeLimit: '1mb',
    }
  }

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        headers: { Authorization: "Bearer " + process.env.HF_INFERENCE_API_KEY },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }


export default async function handler(request, response) {
  // https://www.eff.org/deeplinks/2023/10/mastercard-should-stop-selling-our-data
    var form = new Formidable({});
    let fields;
    let files;

    [fields, files] = await form.parse(request)

    console.log("fields", fields);

    const web_url = fields["url"][0]

    let resp = await fetch(web_url);


    if (resp.status === 200) {
      // get the response body (the method explained below)
      let textHTML =  await resp.text();
      const $ = cheerio.load(textHTML);
      const pageText = $('article').text();

      console.log(pageText);

      const results = await query({"inputs": pageText, "parameters": {"min_length": 100, "max_length":250}});

      console.log(results);

      response.status(200).json({ message: results[0]["summary_text"] })
    } else {
        console.log(resp.status);
        response.status(200).json({ message: resp.status })
    }
    
  }