const constants = {
  //common
  defaultError: 'Something went wrong. Please try again later.',
  apiTimeout: 100000
};

type ConstantsType = typeof constants;

export const getConstant = (code: keyof ConstantsType) =>
  constants[code] as (typeof constants)[typeof code];
