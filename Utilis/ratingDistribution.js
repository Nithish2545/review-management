function ratingDistribution(ratingsArray) {
  try {
    const colors = {
      5: "bg-emerald-500",
      4: "bg-purple-500",
      3: "bg-yellow-500",
      2: "bg-orange-400",
      1: "bg-blue-400",
    };

    const ratingCounts = ratingsArray.reduce((acc, item) => {
      const rating = item.ratings.overallRating;
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});

    const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: ratingCounts[star] || 0,
      color: colors[star],
    }));

    return ratingDistribution;
  } catch (error) {
    console.log(error);
  }
}

export default ratingDistribution;
