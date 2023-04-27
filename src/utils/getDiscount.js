const getDiscount = (price, bonus) => parseInt((bonus / price) * 100, 10);
export default getDiscount;
