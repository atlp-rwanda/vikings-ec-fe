const getFormFromObject = (data) => {
  const formData = new FormData();
  if (!data) {
    return null;
  }
  Object.keys(data).forEach((eachKey) => {
    if (Array.isArray(data[eachKey])) {
      data[eachKey].forEach((each) => formData.append(eachKey, each));
    } else {
      formData.append(eachKey, data[eachKey]);
    }
  });
  return formData;
};

export default getFormFromObject;
