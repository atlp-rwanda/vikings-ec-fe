const switchCurrentImage = (left, currentImage, products, selectedProduct) => {
  const product = products.find(
    (product) => product.id === selectedProduct.id
  );
  const imagesLength = product.images.length;
  let currIdx, currImg;
  if (currentImage >= 0 && left) {
    currIdx = currentImage - 1;
    currImg = product.images[currIdx];
  } else if (currentImage < imagesLength && !left) {
    currIdx = currentImage + 1;
    currImg = product.images[currIdx];
  } else if (currentImage >= imagesLength) {
    currIdx = currentImage - 1;
    currImg = product.images[imagesLength - 1];
  } else if (currentImage < 0) {
    currIdx = currentImage - 1;
    currImg = product.images[imagesLength - 1];
  }
  return { imagesLength, currIdx, currImg };
};

export default switchCurrentImage;
