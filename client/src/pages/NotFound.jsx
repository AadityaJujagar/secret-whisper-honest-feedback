export const NotFound = () => {
  return (
    <div className="min-h-[80vh] w-full flex text-center items-center justify-center bg-gray-50">
      <div className="w-full mx-4">
        <div className="pt-6">
          <h1 className="text-2xl text-center font-bold text-gray-900">
            404 Page Not Found
          </h1>

          <p className="mt-4 text-sm text-gray-600">
            Did you click the wrong profile link?
          </p>
        </div>
      </div>
    </div>
  );
};
