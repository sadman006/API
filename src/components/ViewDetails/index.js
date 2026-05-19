"use client";
import Image from "next/image";
export default function ViewDetails({ product }) {
  return (
    <div>
      <div>
        <Image
          src={product.image}
          alt={product.logo}
          width={500}
          height={500}
          className="mx-auto"
        />
      </div>

      <h1>{product.title}</h1>

      <p>{product.description}</p>

      <p>Rating: {product.rating}</p>

      <p>Buying Percentage: {product.buyingPercentage}%</p>

      <p>
        Usage Experience:
        {product.usageExperience}/10
      </p>

      {product.reviews.map((review, index) => (
        <div key={index}>
          <h2>{review.user}</h2>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
