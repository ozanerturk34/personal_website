import { FormEventHandler, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Searchbar = () => {
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();
  const onSearch: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/blog/search?keyword=${keyword}`);
    },
    [router, keyword]
  );

  return (
    <div className="mb-4">
      <form onSubmit={onSearch}>
        <div className="flex shadow appearance-none border border-black dark:border-white rounded-full w-full p-4 leading-tight focus:outline-none focus:shadow-inner">
          <button type="submit" className="mr-2">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-green-800 dark:text-green-700"
            />
          </button>
          <label htmlFor="search" hidden>
            Search
          </label>
          <input
            className="flex-grow border-none bg-white dark:bg-black transition focus-visible:outline-none"
            id="search"
            type="text"
            placeholder="Search articles"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="mr-2" onClick={() => setKeyword("")}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      </form>
    </div>
  );
};
export default Searchbar;
