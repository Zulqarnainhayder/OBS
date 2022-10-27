export default [
  {
    path: "users",
    component: () => import("../layouts/main"),
    meta: { label: "app.administration.users.usersAndGroupsLabel" },
    children: [
      {
        path: "",
        redirect: "/app/administration/users/users"
      },
      {
        path: "new-user",
        meta: { label: "app.administration.users.newUser.newUserLabel" },
        component: () => import("../pages/newuser"),
      },
      {
        path: "users",
        meta: { label: "app.administration.users.users.users" },
        component: () => import("../pages/users"),
      },
      {
        path: "user-details",
        meta: { label: "app.administration.users.userDetails.userDetails" },
        component: () => import("../pages/details"),
      },
      {
        path: "user-invitation",
        meta: { label: "app.administration.users.invitation.invitationLabel" },
        component: () => import("../pages/invitation"),
      },
      {
        path: "invited-users",
        meta: { label: "app.administration.users.invitedUsers.invitedUsersLabel" },
        component: () => import("../pages/invitedusers"),
      },
      {
        path: "deleted-users",
        meta: { label: "app.administration.users.deletedUsers.deletedUsersLabel" },
        component: () => import("../pages/deletedusers"),
      },
      {
        path: "logfile",
        meta: { label: "app.administration.users.logfile.userLogLabel" },
        component: () => import("../pages/logfile"),
      },
      {
        path: "app-access-groups",
        meta: { label: "app.administration.users.appAccessGroups.appAccessGroups" },
        component: () => import("../pages/appaccessgroups"),
      },
      {
        path: "app-group-details",
        meta: { label: "app.administration.users.appGroupDetails.appGroupDetails" },
        component: () => import("../pages/appgroupdetails"),
      },
      {
        path: "chart-access-groups",
        meta: { label: "app.administration.users.chartAccessGroups.chartAccessGroups" },
        component: () => import("../pages/chartaccessgroups"),
      },
      {
        path: "chart-group-details",
        meta: { label: "app.administration.users.chartAccessGroups.chartAccessGroups" },
        component: () => import("../pages/chartaccessgroups"),
      },
      // {
      //   path: "user-app-access-rights",
      //   meta: { label: "app.administration.users.userApp.userApp" },
      //   component: () => import("../pages/userapp"),
      // },
      // {
      //   path: "user-chart-access-rights",
      //   meta: { label: "app.administration.users.userChart.userChart" },
      //   component: () => import("../pages/userchart"),
      // },
    ],
  },
];
