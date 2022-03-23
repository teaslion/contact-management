import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { DefaultLayout } from 'layouts/DefaultLayout';
import { HomePage } from 'pages/Home';
import { AddContactPage } from 'pages/AddContactPage';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          {/* <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="contacts" element={<HomePage />}>
              <Route path="add" element={<AddContactPage />} />
              <Route index element={<HomePage />} />
            </Route>
          </Route> */}
          <Route path="/" element={<HomePage />} />
          <Route path="contacts" element={<HomePage />} />
          <Route path="contacts/add" element={<AddContactPage />} />
          <Route index element={<HomePage />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter >
  );
}

export default App;
