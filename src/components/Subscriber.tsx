import { type FormEventHandler, useCallback, useState } from "react";

const Subscriber = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const submitForm: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      alert(`${name + " - " + email}`);
    },
    [name, email]
  );

  return (
    <>
      <h2 className="text-center text-3xl mt-8">
        Join me on my software engineering journey
      </h2>
      <p className="text-center mt-8">
        Subscribe my free newsletter to know more about all tech stuff
      </p>
      <form className="mt-8">
        <div className="mb-4">
          <label htmlFor="name" hidden>
            Name
          </label>
          <input
            className="shadow appearance-none border border-black dark:border-white bg-white dark:bg-black transition  rounded-full w-full p-4 leading-tight focus:outline-none focus:shadow-inner"
            id="name"
            type="text"
            placeholder="Enter name"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" hidden>
            Email
          </label>
          <input
            className="shadow appearance-none border border-black dark:border-white  bg-white dark:bg-black transition rounded-full w-full p-4 mb-3 leading-tight focus:outline-none focus:shadow-inner"
            id="email"
            type="email"
            placeholder="Enter email"
          />
        </div>
        <button
          className="bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-800 text-white font-bold p-4 rounded-full w-full focus:outline-none focus:shadow-inner"
          type="button"
        >
          Subscribe to free newsletter
        </button>
      </form>
    </>
  );
};

export default Subscriber;
