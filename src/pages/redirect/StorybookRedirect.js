import React, { useEffect } from 'react';

function StorybookRedirect() {
  useEffect(() => {
    window.location.href = 'https://www.chromatic.com/builds?appId=64218d727e570b64b94415f8';
  }, []);

  return (
    <div>
      <h1>Redirecting to Storybook...</h1>
    </div>
  );
}

export default StorybookRedirect;
