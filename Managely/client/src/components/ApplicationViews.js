import React, { useContext } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { PropertyProvider } from '../providers/PropertyProvider';
import PropertyManagerDash from './Dashboard/PropertyManagerDash';
import TenantDash from './Dashboard/TenantDash';

const ApplicationViews = () => {
  const propertyManagerViews = [
    {
      name: "Dashboard",
      provider: PropertyProvider,
      component: withRouter(PropertyManagerDash),
      path: "/",
      to: "/login"
    }
  ];

  const tenantViews = [
    {
      name: "Dashboard",
      provider: PropertyProvider,
      component: withRouter(TenantDash),
      path: "/",
      to: "/login"
    }
  ];

  const { isLoggedIn, isPropertyManager } = useContext(UserProfileContext);

  const routes = isPropertyManager ? propertyManagerViews.map((el, index) => {
    return (
      <Route key={index} path={el.path} exact>
        <el.provider>
          {isLoggedIn ? <el.component /> : <Redirect to={el.to} />}
        </el.provider>
      </Route>
    )
  }) : tenantViews.map((el, index) => {
    return (
      <Route key={index} path={el.path} exact>
        <el.provider>
          {isLoggedIn ? <el.component /> : <Redirect to={el.to} />}
        </el.provider>
      </Route>
    )
  })

  return (
    <main>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>

        <Route path="/register" exact>
          <PropertyProvider>
            <Register />
          </PropertyProvider>
        </Route>

        {routes}
      </Switch>
    </main>
  )
}

export default ApplicationViews;