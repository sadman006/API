export default async function Albums() {
  async function getData() {
    const response = await fetch(
      "http://jsonplaceholder.typicode.com/commments",
    );
    const data = await response.json();
    return data;
  }

  const todos = await getData();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-8 mt-10">
        Todos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {todos.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-lg hover:shadow-xl transition duration-300"
          >
            <p className="text-sm text-gray-600 mb-1">Post ID: {item.userId}</p>

            <p className="text-sm text-gray-600 mb-2"> {item.id}</p>

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {item.title}
            </h2>

            <p className="text-gray-600 text-sm line-clamp-3">
              {item.completed}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
