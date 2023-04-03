import { Header } from '@widgets/header';
import { Search } from '@features/search';

export const MainPage = (): React.ReactElement => {
  return (
    <>
      <Header />
      <div className="container content-wrapper">
        <Search />
      </div>
    </>
  );
};
