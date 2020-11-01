import React, { useContext } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { PropertyProvider } from '../providers/PropertyProvider';
import { WorkOrderProvider } from '../providers/WorkOrderProvider';
import PropertyManagerDash from './Dashboard/PropertyManagerDash';
import TenantDash from './Dashboard/TenantDash';
import PropertyList from './Properties/PropertyList';
import PropertyDetails from './Properties/PropertyDetails';
import WorkOrderDetails from './WorkOrder/WorkOrderDetails';
import WorkOrderAddForm from '../components/WorkOrder/WorkOrderAddForm';

const ApplicationViews = () => {
  const propertyManagerViews = [
    {
      name: "Dashboard",
      provider: PropertyProvider,
      component: withRouter(PropertyManagerDash),
      path: "/",
      to: "/login"
    },
    {
      name: "Properties",
      provider: PropertyProvider,
      component: withRouter(PropertyList),
      path: "/properties",
      to: "/login"
    },
    {
      name: "Property Details",
      provider: PropertyProvider,
      component: withRouter(PropertyDetails),
      path: "/properties/details/:id",
      to: "/login"
    },
    {
      name: "WorkOrder Details",
      provider: WorkOrderProvider,
      component: withRouter(WorkOrderDetails),
      path: "/workorder/details/:id",
      to: "/login"
    }
  ];

  const tenantViews = [
    {
      name: "Dashboard",
      provider: WorkOrderProvider,
      component: withRouter(TenantDash),
      path: "/",
      to: "/login"
    },
    {
      name: "New WorkOrder",
      provider: WorkOrderProvider,
      component: withRouter(WorkOrderAddForm),
      path: "/workorder/new",
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