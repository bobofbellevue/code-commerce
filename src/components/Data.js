export let products = [
  {
    name: "CodeCraft",
    price: 49,
    licenses: 1,
    supportedOS: ["Windows", "macOS", "Linux"],
    description: "Novice programmers learn coding through games and puzzles.",
  },
  {
    name: "CodeGuardian",
    price: 199,
    licenses: 3,
    supportedOS: ["Windows", "macOS", "Linux"],
    description:
      "Advanced security tool protects code from unauthorized access.",
  },
  {
    name: "OptiMax",
    price: 149,
    licenses: 2,
    supportedOS: ["iOS", "FreeBSD"],
    description:
      "Intelligent code optimization tool that removes redundancies and fixes inefficiencies.",
  },
  {
    name: "CodeStreamX",
    price: 99,
    licenses: 1,
    supportedOS: ["Solaris", "Ubuntu", "Fedora"],
    description:
      "Collaborative code review tool suggests improvements to teams.",
  },
];

export let productTotal = 0;

export let shippingInfo = {
  express: false,
  name: "",
  address: "",
  zipCode: "",
  city: "",
  state: "",
  cellPhone: "",
  telephone: "",
};

export let paymentInfo = {
  name: "",
  cardNo: "",
  month: "",
  year: "",
  cvv: "",
};

export let loginInfo = {
  email: "",
  password: "",
  confirm: "",
  first: "",
  last: "",
  zipCode: "",
};

export let cartInfo = {
  discountCode: "",
  discountPct: 0,
};
