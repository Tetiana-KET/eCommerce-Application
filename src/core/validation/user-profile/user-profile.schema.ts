import { z } from 'zod';
import {
  addressSchema,
  birthDateSchema,
  firstNameSchema,
  lastNameSchema,
} from '../user-registration/user-registration.schema';
import { validateAddress, validateAddressType } from '../user-registration/user-registration.validation';
import { emailSchema, passwordSchema } from '../user-login/user-login.schema';

export const personalInformationSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  dateOfBirth: birthDateSchema,
  email: emailSchema,
});

export const passwordInformationSchema = z.object({
  password: passwordSchema,
  newPassword: passwordSchema,
});

export const profileAddressSchema = addressSchema
  .and(z.object({ addressUID: z.string() }))
  .superRefine((formValues, context) => {
    validateAddressType(formValues, context);
  });

export const profileAddressesSchema = z
  .object({
    addresses: z.array(profileAddressSchema),
    defaultShippingAddressIdx: z.number(),
    defaultBillingAddressIdx: z.number(),
  })
  .superRefine((formValues, context) => {
    formValues.addresses.forEach((_, index, addresses) => validateAddress(addresses, index, context));
  });
