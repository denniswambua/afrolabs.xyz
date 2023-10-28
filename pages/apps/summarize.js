import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "../../layouts/components/ImageFallback";
import React, { useState } from 'react'

// category page
const Summarize = ({ app_name }) => {
  const [isLoading, setIsLoading] = useState(false)

  const [summraryResult, setSummraryResult] = useState("")
  async function onSubmit(event) {
    event.preventDefault()

    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/api/summarize', {
        method: 'POST',
        body: formData,
      })
 
      // Handle response if necessary
      const data = await response.json()

      setSummraryResult(data.message)
    } catch (error) {
      // Handle error if necessary
      console.error(error)
    } finally {
      setIsLoading(false) // Set loading to false when the request completes
    }

  }

  return (
    <Base title={app_name}>
      <div className="section mt-16">
        <div className="container">
          <div className="row relative pb-16">
            <ImageFallback
              className="-z-[1] object-cover object-top"
              src={"/images/map.svg"}
              fill="true"
              alt="map bg"
              priority={true}
            />
            <h1 className="h2 mb-12">
              Application:
              <span className="section-title ml-1 inline-block capitalize">
                {app_name.replace("-", " ")}
              </span>
            </h1>
            <span className="ml-3 text-lg ">
              Get a concise summary of the article while conserving the overall meaning.    
            </span>
            <div className="row">
              <div className="lg:col-8">
              <article>
                <h2 className="h2 text-left lg:text-[55px] mt-12">
                  Summary results
                </h2>
                <div className="top-3 ml-3 text-lg">
                  {summraryResult}
                </div>
                </article>
              </div>
              <div className="lg:col-4">
                <div className="row rounded border border-border p-4 px-3 dark:border-darkmode-border lg:p-6">
                  <form onSubmit={onSubmit} className="contact-form mt-12">
                    <div className="mb-6">
                      <label className="mb-2 block font-secondary" htmlFor="subject">
                        Enter url
                      </label>
                      <input
                        className="form-input w-full"
                        name="url"
                        type="url"
                        placeholder="http://..."
                        required
                      />
                    </div>
                    <button className="d-block  btn btn-primary mt-4 w-full" type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Summarize;

// // category page routes
// export const getStaticPaths = () => {


//   const paths = allCategories.map((category) => ({
//     params: {
//       category: category,
//     },
//   }));

//   return { paths, fallback: false };
// };

// category page data
export const getStaticProps = ({ params }) => {

  return {
    props: {
      app_name: "Summarize"
    },
  };
};
