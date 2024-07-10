import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from 'react-router-dom'
import Layout from './MyComponents/Layout/Layout.jsx'
import HomeScreen from './MyComponents/HomeScreen/Page/HomeScreen.jsx'
import ProductDetailScreen from './MyComponents/ProductDetail/Page/ProductDetailScreen.jsx'
import ProductListingScreen from './MyComponents/ProductListing/ProductListingScreen.jsx'
import PrivateRoute from './MyComponents/PrivateRoute/PrivateRoute.jsx'
import ProfileScreen from './MyComponents/AuthDialog/updateprofile/ProfileScreen.jsx'
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index={true} path='/' element={<HomeScreen />} />
        <Route path='/products' element={<ProductListingScreen />} />
        <Route path='/products/:id' element={<ProductDetailScreen />} />
        <Route path='' element={<PrivateRoute />}>
          <Route path='/profile' element={<ProfileScreen />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App