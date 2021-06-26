import React from 'react';

const Ball = ({ bounce }: { bounce: string }) => <div className={`h-3 w-3 bg-royalblue-600 rounded-full mx-1 ${bounce}`} />;

const PageLoader = (): React.ReactElement => (
  <div className="flex justify-center my-20">
    <Ball bounce="animate-bounce" />
    <Ball bounce="animate-bounce200" />
    <Ball bounce="animate-bounce400" />
  </div>
);

export default PageLoader;
