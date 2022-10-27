import app from "modules/app/i18n/en";
import auth from "modules/auth/i18n/en";

export default {
  // Modules
  app,
  auth,

  // Global
  global: {
    appTitle: "App Studio",
    docs: "Documentation",
    languages: "Languages",
    languageDesc: "List of all languages on app",
    settings: "Settings",
    settingsDesc: "Application settings",
    forms: "Forms",
    formsDesc: "Examples of forms",
    languageLinkDesc: "Switch Languages",
    components: "Components",
    componentsLinkDesc: "List of all components docs",
    helpers: "Helpers",
    helpersLinkDesc: "List of all helpers",
    demos: "Demos",
    demosLinkDesc: "All demos",
    arabic: "Arabic",
    english: "English",
    darkMode: "Dark Mode",
    darkModeDesc: "Switch dark mode",
    dark: "Dark",
    light: "Light",
    search: 'Search ...',
    savedCaption: "Saved!",
    savedMessage: "Saved successfully",
    uploadCaption: "Uploaded!",
    uploadMessage: "Uploaded successfully",
    email: "Email Address",
    phone: "Phone Number",
    firstName: "First Name",
    lastName: "Last Name",
    dateRange: "Date Range",
    edit: "Edit",
    user: "User",
    copy: "Click to copy",
    copied: "Copied!",
    cancel: "Cancel",
    save: "Save",
    apply: "Apply",
    remove: "Remove",
    accountTypesLookup: {
      employee: "Employee",
    },
    reservationTypesLookup: {
      hotel: "Hotel",
      transportation: "Transportation",
    },
    reservationStatusLookup: {
      cancelled: "Cancelled",
      confirmed: "Confirmed",
    },
    userRolesLookup: {
      admin: "Admin",
      superAdmin: "SuperAdmin",
      reservationReviewer: "Reservations Reviewer",
      companiesReviewer: "Companies Reviewer",
      usersReviewer: "Users Reviewer",
    },
    languageLookup: {
      arabic: "Arabic",
      english: "English",
    },
    darkLightLookup: {
      dark: "Dark",
      light: "Light",
    },
    userStatusLookup: {
      active: "Active",
      inactive: "Inactive",
    },
    promoCodeStatusLookup: {
      active: "Active",
      notActive: "Not Active",
    },
    signatureLookup: {
      positive: 'Positive',
      negative: 'Negative',
    },
    taxComputationLookup: {
      fixedValue: 'Fixed Value',
      variableValue: 'Variable Value',
      percentageOfValue: 'Percentage Of Value',
      percentageOfTotal: 'Percentage Of Total'
    },

    // Errors
    errors: {
      undefined: "Something went wrong, please try again",
    },
  },
};
