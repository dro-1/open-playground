import { ROUTES } from "@/utils/routes";
import { Link } from "react-router-dom";

const pages: { text: string; url: string }[] = [
  {
    text: "GOT",
    url: ROUTES.got,
  },
];

export const Homepage = () => {
  return (
    <div className="min-h-dvh flex font-cinzel flex-col text-white justify-center items-center bg-[#111] text-center space-y-4">
      <h1 className="text-2xl lg:text-4xl">
        Everyone has the right to freedom of thought.
      </h1>
      <h1 className="text-2xl lg:text-4xl mb-4">
        This is where I express mine.
      </h1>
      <h1 className="text-2xl lg:text-4xl mb-4">Welcome to Dro's Playground</h1>

      <div className="mt-8 w-[80%] mx-auto grid grid-cols-3 gap-4 flex-wrap ">
        {pages.map((page, idx) => (
          <Link
            key={idx}
            style={{
              fontFamily: "Cinzel",
            }}
            to={page.url}
            className="text-xl py-1 px-4 bg-white text-[#111] rounded text-center"
          >
            {" "}
            {page.text}
          </Link>
        ))}
      </div>
    </div>
  );
};
