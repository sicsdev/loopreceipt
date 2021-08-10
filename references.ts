export const name = "rahul";
/*
how to use useFetch
const {
    data,
    loading,
    sendRequest: saveCreatedGroup,
    requestSent,
  } = useFetch<{ group: EntityGroup }>(
    deferrer(groupsApi.create, {
      members: loopers,
    }),
    {
      deferred: true,
      numRetriesOnError: 3,
      retryMethodOnError: () => {
        console.log("retry");
      },
      methodOnError: () => {
        console.log("redirect to login page");
        // router.push("/login");
      },
    }
  );
*/

/*
javascript password validation
 validate: function () {
        return (
          validations.isRequired(this) &&
          validations.atLeastOneUpperCaseCharacter(this) &&
          validations.atLeastOneLowerCaseCharacter(this) &&
          validations.atLeastOneDigit(this) &&
          validations.atLeastOneSpecialCharacter(this) &&
          validations.minMaxLength({ min: 8 })(this)
        );
      },
*/
