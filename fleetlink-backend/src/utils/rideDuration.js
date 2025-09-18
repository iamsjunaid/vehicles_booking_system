// src/utils/rideDuration.js
function estimateRideDurationHours(fromPincode, toPincode) {
  const f = parseInt(String(fromPincode).replace(/\D/g, ""), 10);
  const t = parseInt(String(toPincode).replace(/\D/g, ""), 10);
  if (Number.isNaN(f) || Number.isNaN(t)) return 0;
  return Math.abs(f - t) % 24;
}

module.exports = { estimateRideDurationHours };
