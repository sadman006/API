async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  const data = await response.json();
  console.log(data);
  return data;
}

export default async function Users() {
  const users = await getData();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-8 mt-10">
        Users
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-lg hover:shadow-xl transition duration-300"
          >
            <p className="text-sm text-gray-600 mb-1">{item.name}</p>

            <p className="text-sm text-gray-600 mb-2"> {item.username}</p>

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {item.email}
            </h2>

            <p className="text-gray-600 text-sm line-clamp-3">
              {item.address},
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {item.geo}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {item.phone}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {item.website}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {item.company}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
