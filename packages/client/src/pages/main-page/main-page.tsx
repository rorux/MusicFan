import { Header } from '@widgets/header';
import { Artists } from '@features/artists';

export const MainPage = (): React.ReactElement => {
  return (
    <>
      <Header />
      <div className="container content-wrapper">
        <Artists />
      </div>
    </>
  );
};
