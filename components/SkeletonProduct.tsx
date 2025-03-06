import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 p-6 max-w-7xl mx-auto">
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="h-8 bg-gray-200 animate-pulse rounded-lg mb-4 w-3/4"></div>

        <div className="h-4 bg-gray-200 animate-pulse rounded-lg mb-3 w-1/2"></div>

        <div className="mb-4">
          <div className="h-6 bg-gray-200 animate-pulse rounded-lg mb-2 w-1/4"></div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((option) => (
              <div
                key={option}
                className="w-20 h-8 bg-gray-200 animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="h-6 bg-gray-200 animate-pulse rounded-lg mb-2 w-1/4"></div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((type) => (
              <div
                key={type}
                className="w-20 h-8 bg-gray-200 animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg mb-2 w-1/4"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded-lg w-1/3"></div>
        </div>

        <div className="h-12 bg-gray-200 animate-pulse rounded-lg mb-4"></div>

        <div className="h-4 bg-gray-200 animate-pulse rounded-lg w-1/2"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
