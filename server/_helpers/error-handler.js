function errorHandler(err, req, res, next) {
  console.log("받은에러", err);
  if (typeof err === "string") {
    console.log("호이호잉 스트링~~!");
    return res.status(400).json({ message: err });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Invaild Token" });
  }

  return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
