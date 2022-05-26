const getArrayRepOfFaces = (detectedFaces) => {
  const arrayRepOfFaces = detectedFaces.allIds.map((faceId) => ({
    ...detectedFaces.byId[faceId],
  }));
  return arrayRepOfFaces;
};

export default getArrayRepOfFaces;
