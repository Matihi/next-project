"use client";

const Error = ({ error, reset }) => {
  console.log(error);

  return (
    <div className="h-full flex flex-col justify-center items-center ">
      <p>Something went wrong fetching dishes!</p>
      <button
        className="bg-gray-400 text-white p-1 rounded-sm hover:bg-gray-500 "
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
};

export default Error;
