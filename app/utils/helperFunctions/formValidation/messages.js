/*
 * Form Validation Messages
 *
 * This contains all the text for the Form Validation functions.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  notUndefined: {
    id: 'app.containers.utils.helperFunctions.formValidation.notUndefined',
    defaultMessage: 'Required',
  },
  invalidEmail: {
    id: 'app.containers.formValidation.invalidEmail',
    defaultMessage: 'Invalid Email',
  },
  useCommaDelimited: {
    id: 'app.containers.formValidation.useCommaDelimited',
    defaultMessage: 'Use a list of PIN codes separated by commas',
  },
  endsWithNumber: {
    id: 'app.containers.formValidation.endsWithNumber',
    defaultMessage: 'Must end with a number',
  },
  greaterThanZero: {
    id: 'app.containers.formValidation.greaterThanZero',
    defaultMessage: 'Must be greater than zero',
  },
  mustBeNumber: {
    id: 'app.containers.formValidation.mustBeNumber',
    defaultMessage: 'Must be a number',
  },
  lessThanOneHundred: {
    id: 'app.containers.formValidation.lessThanOneHundred',
    defaultMessage: 'Number must be less than one hundred',
  },
  zeroOrGreater: {
    id: 'app.containers.formValidation.zeroOrGreater',
    defaultMessage: 'Must be 0 or greater',
  },
  mustOnlyChooseOne: {
    id: 'app.containers.formValidation.mustOnlyChooseOne',
    defaultMessage: 'Only one must be chosen',
  },
  mustBeLessThanOrEqualToOne: {
    id: 'app.containers.formValidation.mustBeLessThanOrEqualToOne',
    defaultMessage: 'Must be less than or equal to 1',
  },
});
