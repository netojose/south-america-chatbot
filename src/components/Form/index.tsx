import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';

const Form = function <FormValues>({
  children,
  onSubmit,
  rules,
}: {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FormValues>;
  rules?: { [field: string]: Yup.AnySchema };
}): React.ReactElement {
  const methods = useForm<FormValues>({ resolver: yupResolver(Yup.object().shape(rules || {})) });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
export { default as Button } from './Button';
export { default as Input } from './Input';
