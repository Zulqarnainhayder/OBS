export default {
  path: "company",
  meta: { label: "app.administration.companyLabel" },
  component: () => import("../layouts/company"),
  children: [
    {
      path: "",
      component: () => import("../pages/company")
    },
    {
      path: "data/:id",
      meta: { label: "app.administration.company.details.label" },
      component: () => import("../pages/company-details")
    },
    {
      path: "data",
      meta: { label: "app.administration.company.details.label" },
      component: () => import("../pages/company-details")
    }
  ]
};
