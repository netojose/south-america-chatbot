import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageTitle = ({ title }: { title: string }): React.ReactElement => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <h1 className="text-4xl font-bold text-center my-5">{title}</h1>
  </>
);

export default PageTitle;
