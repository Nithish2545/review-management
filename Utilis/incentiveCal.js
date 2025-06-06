function calculateIncentive(ratings) {
  const { packing, timeliness, dressCode, overallRating } = ratings;

  // Example logic:
  // Eligible if dressCode is "Yes" AND timeliness is "Yes"
  // AND overallRating >= 3 AND packing >= 3

  const incentiveEligible =
    timeliness === "Yes" &&
    dressCode === "Yes" &&
    overallRating >= 3 &&
    packing >= 3;

  return {
    incentiveEligible,
    incentiveValue: incentiveEligible ? 100 : 0,
  };
}

export default calculateIncentive;
