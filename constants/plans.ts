type PLANS_TYPE = {
  [key: string]: any;
};

export const PLANS:PLANS_TYPE = {
  PRO: {
    MONTHLY: {
      planId: "price_1Ime8ZKjfMUjJasDMtLRYnWH",
      price: 14
    },
    ANNUALLY: {
      planId: "price_1Ime9pKjfMUjJasD9gkfdcnu",
      price: 204
    },
  },
  ENTERPRISE: {
    MONTHLY: {
      planId: "price_1ImeAfKjfMUjJasDFlwUCNoU",
      price: 30
    },
    ANNUALLY: {
      planId: "price_1ImeBOKjfMUjJasDXvG5H7By",
      price: 350
    },
  },
};

export const PLAN_ID_TO_PLAN_DETAILS: PLANS_TYPE = {
  "price_1Ime8ZKjfMUjJasDMtLRYnWH" : {
    planType: "Pro",
    planDuration: "Monthly",
    price: 14
  },
  "price_1Ime9pKjfMUjJasD9gkfdcnu": {
    planType: "Pro",
    planDuration: "Annually",
    price: 204
  },
  "price_1ImeAfKjfMUjJasDFlwUCNoU": {
    planType: "Enterprise",
    planDuration: "Monthly",
    price: 30
  },
  "price_1ImeBOKjfMUjJasDXvG5H7By": {
    planType: "Enterprise",
    planDuration: "Annually",
    price: 350
  }

}
