import React, {FunctionComponent} from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export const Layout: FunctionComponent = ({children}) => {
  return (
    <div>
      <Header/>
      <div>
        {children}
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;