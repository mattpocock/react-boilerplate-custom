import React from 'react';
import { FormattedMessage } from 'react-intl';
import convertFromImmutable from 'utils/helperFunctions/convertFromImmutable';
import messages from './messages';

export const notUndefined = value =>
  typeof value !== 'undefined' && value !== '' ? (
    undefined
  ) : (
    <FormattedMessage {...messages.notUndefined} />
  );

export const arrayHasLength = immutableValue => {
  const array = convertFromImmutable(immutableValue);
  return typeof array !== 'undefined' && array.length && array.length > 0 ? (
    undefined
  ) : (
    <FormattedMessage {...messages.notUndefined} />
  );
};

export const isValidEmail = val => {
  if (!val) return undefined;
  // eslint-disable-next-line
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    val,
  ) ? (
    undefined
  ) : (
    <FormattedMessage {...messages.invalidEmail} />
  );
};

export const isCommaDelimited = val => {
  if (!val) return undefined;
  return /[^0-9|,| ]/.test(val) ? (
    <FormattedMessage {...messages.useCommaDelimited} />
  ) : (
    undefined
  );
};

export const endsWithNumber = val => {
  if (!val) return undefined;
  return /[0-9]$/.test(val) ? (
    undefined
  ) : (
    <FormattedMessage {...messages.endsWithNumber} />
  );
};

export const mustBePositiveNumber = val => {
  if (!val) return undefined;
  const num = Number(val);
  return num > 0 ? (
    undefined
  ) : (
    <FormattedMessage {...messages.greaterThanZero} />
  );
};

export const mustBeLessThanOneHundred = val => {
  if (!val) return undefined;
  const num = Number(val);
  return num < 101 ? (
    undefined
  ) : (
    <FormattedMessage {...messages.lessThanOneHundred} />
  );
};

export const mustBeNumber = val => {
  if (!val) return undefined;
  const num = Number(val);
  return /^[0-9]+$'/.test(num) ? (
    <FormattedMessage {...messages.mustBeNumber} />
  ) : (
    undefined
  );
};

export const mustBeLessThanOrEqualToOne = val => {
  if (!val) return undefined;
  const num = Number(val);
  return num <= 1 ? (
    undefined
  ) : (
    <FormattedMessage {...messages.mustBeLessThanOrEqualToOne} />
  );
};

export const mustBeZeroOrPositiveNumber = val => {
  if (!val) return undefined;
  const num = Number(val);
  return num > -1 ? (
    undefined
  ) : (
    <FormattedMessage {...messages.zeroOrGreater} />
  );
};

export const onlyOneArrayMemberPermitted = (val = []) => {
  if (!val || !val?.length) return undefined;
  if (val?.length > 1) {
    return <FormattedMessage {...messages.mustOnlyChooseOne} />;
  }
  return undefined;
};
