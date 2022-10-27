import ObsForm from "src/components/form";
import ObsLookups from "src/components/lookups";
import ObsFormAction from "src/components/form/action";
import ObsFormInputs from "src/components/form/inputs";
import ObsTable from "src/modules/app/components/table";
import ObsPageHero from "src/modules/app/components/page-hero";
import ObsCopyBtn from "src/modules/app/components/copy-btn";
import ObsLabelValue from "src/modules/app/components/label-value";
import ObsDialogPage from "src/modules/app/components/dialog-page";

import CountryFlag from "vue-country-flag";

export default ({ app }) => {
  Object.keys(ObsFormInputs).forEach((componentName) => {
    app.component(componentName, ObsFormInputs[componentName]);
  });

  app.component("ObsForm", ObsForm);
  app.component("ObsFormAction", ObsFormAction);
  app.component("ObsTable", ObsTable);
  app.component("ObsLookups", ObsLookups);
  app.component("ObsPageHero", ObsPageHero);
  app.component("ObsCopyBtn", ObsCopyBtn);
  app.component("ObsLabelValue", ObsLabelValue);
  app.component("ObsDialogPage", ObsDialogPage);

  app.component("CountryFlag", CountryFlag);
};
