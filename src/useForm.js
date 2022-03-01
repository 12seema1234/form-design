const useFrom = () => {
  const dataValidator = ({ name, age, ...restProps }) => {

    console.log(restProps)

    let isVallid = true;

    const nameRegex = /^[a-zA-Z ]{2,30}$/;

    /**
     * We will wrire validattion logig here if we found
     * any error here for input data then we make isValid to false
     */

    if (!nameRegex.test(name)) {
      isVallid = false;
      throw new Error(
        "Error in name ! , Name should be grater than two charector and less than 30. It could only contains alphbet charectors"
      );
    }

    if (typeof age !== "number" && age < 0) {
      isVallid = false;
      throw new Error("Error in age !. Age should not be a negative value.");
    }

    if (isVallid)
      return {
        name,
        age,
        ...restProps
      };
    else return false;
  };

  return {
    dataValidator,
  };
};

export default useFrom;
