---
title: "The One Billion Challenge"
date: 2024-03-03T14:00:00Z
image: /images/post/ibrc_crunching_numbers.png
categories: ["coding", "rust", "learning"]
featured: true
draft: false
---
# 1brc

## Intro

As I was going through my usual morning routine reading [hackernews](https://news.ycombinator.com/).  
I stumbled upon this announcement [1brc](https://www.morling.dev/blog/one-billion-row-challenge/) and thought it to be a cool idea to do it. I chose to use [rustlang](https://www.rust-lang.org) as its something I am want to be proficient in.

## The challenge

The challenge is to create a java program that retrieves temperature values from a text file. Then calculates the min, mean, and max temperature per weather station. The core of the challenge is to come up with the fastest program to process a file with 1 billion rows. The 1 billion file is approximately 12 GB in size.

## My Approach

Read the file using a buffered reader. And as I read, aggregate the min, mean and max and store in a Hashmap keyed by city name.  
Then sort the HashMap and print the results.

Sample code.

```
let file = File::open(filename)?;
// uses a reader buffer
let mut reader = BufReader::new(file);
let mut line = String::new();
loop {
    match reader.read_line(&mut line) {
        Ok(bytes_read) => {
            if bytes_read == 0 {
                info!("EOF Reached");
                break;
            }

            load_cities(&line, cities);

            line.clear();
        }
        Err(err) => {
            error!("err");
            return Err(err);
        }
    };
}
    ....
let city: Vec<&str> = line.trim().split(';').collect();
let city_name: String = city[0].to_string();
let t: f32 = city[1].parse::<f32>().unwrap();
cities
    .entry(city_name)
    .and_modify(|temps| {
        let (_mi, avg, _ma, total, count) = temps;
        let t1 = t;
        let t2 = t;
        *_mi = cmp::min_by(t1, *_mi, |a, b| a.total_cmp(b));
        *_ma = cmp::max_by(t2, *_ma, |a, b| a.total_cmp(b));
        *total += t;
        *count += 1.0;
        *avg = *total / *count;
    })
    .or_insert((t, t, t, t, 1.0));

```

I later figured out that I can remove the sort step by using [BTreeMap](https://doc.rust-lang.org/std/collections/struct.BTreeMap.html), which is a sorted hashmap.

## Conclusion

My code isn't optimized and tested to complete the challenge but you can access it from [github](https://github.com/denniswambua/rusty_1brc). 
Completed rust implementation from other developers can be checked from [here](https://github.com/gunnarmorling/1brc/discussions)  
The general optimal route is to:

1.  Use MMAP. Maps the file directly into memory. Avoid reading speed penalties.
2.  SIMD (Single Instruction Multiple Data) Parallel processing technique.  
3.  Multi-process the file, collect and merge the results.

## Todo
1. Next step is to benchmark the current implementation with the full dataset.
2. Implement the above optimizations.
3. Compare the results.
