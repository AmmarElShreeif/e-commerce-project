import React from "react";

function RatingReview({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center">
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            key={star}
            className="start"
            style={{
              color: rating >= star ? "gold" : "gray",
              fontSize: `25px`,
            }}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </div>
  );
}

export default RatingReview;
