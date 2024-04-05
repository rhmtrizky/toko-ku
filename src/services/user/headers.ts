const headers = (token: any) => {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

export default headers;
