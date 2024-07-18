import {
    SideNavigation, SideNavigationItem, TitleBar, ExitIcon, NoAuthorizationTemplate, Text, Button, Field, ErrorText, SideNavigationSubItem, TooltipProvider, UploadIcon,
  } from 'ui-components';

import React from "react";
import { useMemo } from 'react';
import AppBackground from '../../components/AppBackground';
import { Feedback } from '../../components/Feedback/Feedback';
import { useAuth } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../../components/Avatar';
import { MainContent } from '../../components/MainContent';
import { Scrollbar } from 'react-scrollbars-custom';
import QuickSwitcher from '../../components/QuickSwitcher/QuickSwitcher';
import {
  Routes,
  Route,
  Link,
  useLocation,
  redirect,
} from "react-router-dom";
import { DashboardIcon } from '../../components/icons/DashboardIcon';
import { DashboardView } from '../DashboardView/DashboardView';
import { useRouting } from '../../hooks/useRouting';

const render = (props) => () => <TitleBar {...props} />;
export const MainView = () => {
    const collapsed = false;
    const [t] = useTranslation('common');
    const {
        onLogout, me, loading, error,
      } = useAuth();
      const { goBack } = useRouting();
      const location = useLocation()
      const is_ISO = false;
      const active = () => {return true}
      const routes = useMemo(() => {
        const _routes = [{
          link: '/dashboard',
          icon: <DashboardIcon />,
          title: 'dashboard',
          element: <DashboardView/>,
        }];
        return _routes;
      }, [])
    return (<React.Fragment>
          <AppBackground>
      <TooltipProvider>
        <SideNavigation
          collapsed={collapsed}
          footer={[
            <Feedback key="-1" />,
            <SideNavigationItem key="0" icon={<ExitIcon />} onClick={onLogout}>{t('logout')}</SideNavigationItem>,
          ]}
        >
          <Avatar collapsed={collapsed} />
          {routes?.map((route) => {
            if (route.hidden) {
              return <div key={route.link} />;
            }

            const content = (
              <SideNavigationItem
                active={active(route.link, location)}
                icon={route.icon}
                disabled={route.disabled}
              >
                {!collapsed && t(`nav.${route.title}`)}
              </SideNavigationItem>
            );

            return (
              <React.Fragment key={route.link}>
                <Link key={route.link} to={route.link}>
                  {content}
                </Link>
                {route.subroutes?.map((subroute, i) => (
                  <Link key={subroute.link} to={subroute.link}>
                    <SideNavigationSubItem active={active(subroute.link, location)} first={i === 0}>
                      {t(`nav.${(is_ISO && subroute.iso_title) ? subroute.iso_title : subroute.title}`)}
                    </SideNavigationSubItem>
                  </Link>
                ))}
              </React.Fragment>
            );
          })}
        </SideNavigation>

        <MainContent collapsed={collapsed}>
          <Scrollbar
            style={{
              width: '100%', height: '100%',
            }}
            removeTracksWhenNotUsed
            minimalThumbSize={30}
            scrollDetectionThreshold={100}
          >

            <Routes>
              {routes.map((route) => {
                const props = {};
                if (route.element) {
                  // props.element = route.element;
                  props.element =  <TitleBar
                  fixed
        title={t('details_title')}
        onBackClicked={goBack}
                  right={[<Link key="chicken" to={`/workflow`}><Button key="0" padded>{t('create_service')}</Button></Link>]}
                />
                } else {
                  // props.render = render({ title: t(`nav.${route.title}`) });
                }

                return (
                  <Route key={route.link} path={route.link} {...props} />
                );
              })}
              {/* <Route path="/" render={() => redirect("/dashboard")} /> */}
            </Routes>
          </Scrollbar>
          <QuickSwitcher routes={routes} />
        </MainContent>
      </TooltipProvider>

    </AppBackground>
    </React.Fragment>)
}