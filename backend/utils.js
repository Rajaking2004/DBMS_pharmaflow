
const checkExpiryDate = (expiryDate) => {
    const currentDate = new Date();
    const parsedExpiryDate = new Date(expiryDate);
    return currentDate > parsedExpiryDate;
};

module.exports = { checkExpiryDate };
