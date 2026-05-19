async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
}

export default async function Page() {
  const data = await getData();
  console.log(data);

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search posts..."
          className="flex-1 px-4 py-2 text-white rounded-lg outline-none placeholder:text-gray-400 border border-gray-300"
        />
        <button className="px-5 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Search
        </button>
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-lg hover:shadow-xl transition duration-300"
          >
            <p className="text-sm text-gray-600 mb-1">Post ID: {item.userId}</p>

            <p className="text-sm text-gray-600 mb-2"> {item.id}</p>

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {item.title}
            </h2>

            <p className="text-gray-600 text-sm line-clamp-3">{item.body}</p>
          </div>
        ))}
        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>User ID: {data.userId}</span>
          <button className="px-3 py-1 bg-sky-600 cursor-pointer text-white rounded-md hover:bg-sky-600">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
