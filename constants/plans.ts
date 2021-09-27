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
      price: 132
    },
  },
  ENTERPRISE: {
    MONTHLY: {
      planId: "price_1ImeAfKjfMUjJasDFlwUCNoU",
      price: 49
    },
    ANNUALLY: {
      planId: "price_1ImeBOKjfMUjJasDXvG5H7By",
      price: 420
    },
  },
};

export const PLAN_ID_TO_PLAN_DETAILS: PLANS_TYPE = {
  "price_1Ime8ZKjfMUjJasDMtLRYnWH" : {
    planType: "Pro",
    planDuration: "Monthly",
    price: 14,
    moveToAnnually: "price_1Ime9pKjfMUjJasD9gkfdcnu"
  },
  "price_1Ime9pKjfMUjJasD9gkfdcnu": {
    planType: "Pro",
    planDuration: "Annually",
    price: 132,
    moveToMonthly: "price_1Ime8ZKjfMUjJasDMtLRYnWH"
  },
  "price_1ImeAfKjfMUjJasDFlwUCNoU": {
    planType: "Enterprise",
    planDuration: "Monthly",
    price: 49,
    moveToAnnually: "price_1ImeBOKjfMUjJasDXvG5H7By"
  },
  "price_1ImeBOKjfMUjJasDXvG5H7By": {
    planType: "Enterprise",
    planDuration: "Annually",
    price: 420,
    moveToMonthly: "price_1ImeAfKjfMUjJasDFlwUCNoU"
  }

}
