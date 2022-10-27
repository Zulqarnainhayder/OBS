export default {
  path: "organization",
  meta: { label: "app.administration.organizationLabel" },
  component: () => import("../layouts/organization"),
  children: [
    {
      path: "",
      meta: { label: "app.administration.organization.label" },
      redirect: "/app/administration/organization/details"
    },
    {
      path: "details",
      meta: { label: "app.administration.organization.details.label" },
      component: () => import("../pages/organization-details")
    }
  ]
};
