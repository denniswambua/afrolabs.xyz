import Base from "@layouts/Baseof";
import { humanize, markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { FaFolder } from "react-icons/fa";


const Apps = ({ apps }) => {
  return (
    <Base title={"apps"}>
      <section className="section pt-0">
        {markdownify(
          "Applications",
          "h1",
          "h2 mb-16 bg-theme-light dark:bg-darkmode-theme-dark py-12 text-center lg:text-[55px]"
        )}
        <div className="container pt-12 text-center">
          <ul className="row">
            {apps.map((app, i) => (
              <li
                key={`app-${i}`}
                className="mt-4 block lg:col-4 xl:col-3"
              >
                <Link
                  href={`/apps/${app.name}`}
                  className="flex w-full items-center justify-center rounded-lg bg-theme-light px-4 py-4 font-bold text-dark transition hover:bg-primary hover:text-white  dark:bg-darkmode-theme-dark dark:text-darkmode-light dark:hover:bg-primary dark:hover:text-white"
                >
                  <FaFolder className="mr-1.5" />
                  {humanize(app.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Base>
  );
};

export default Apps;

export const getStaticProps = () => {

  const appsWithPostsCount = [{
    name: "summarize"
  }];
  return {
    props: {
      apps: appsWithPostsCount,
    },
  };
};
