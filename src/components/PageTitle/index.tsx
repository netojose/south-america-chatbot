import React from 'react';
import { Helmet } from 'react-helmet';

const PageTitle = ({ title }: { title: string }): React.ReactElement => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
);

export default PageTitle;