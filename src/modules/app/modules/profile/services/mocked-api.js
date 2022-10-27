import { makeApiResponse } from "src/services/mocked-response";

export default {
  get: () => makeApiResponse({
    "firstName": "Momen",
    "lastName": "Yasser",
    "phone": "0101060775116",
    "email": "momen@obs.com",
    "roles": [
        {
            "name": "SuperAdmin",
            "permissions": [
                {
                    "id": 1,
                    "name": "VIEW_DASHBOARD",
                    "label": "View dashboard",
                    "description": "User can view dashboard screen"
                },
                {
                    "id": 2,
                    "name": "VIEW_USERS_LIST",
                    "label": "View users list",
                    "description": "User can view users list"
                },
                {
                    "id": 3,
                    "name": "VIEW_USERS_SINGLE",
                    "label": "View single user",
                    "description": "User can view single user"
                },
                {
                    "id": 4,
                    "name": "EDIT_USERS_SINGLE",
                    "label": "Edit single user",
                    "description": "User can edit single user"
                },
                {
                    "id": 5,
                    "name": "VIEW_ROLES_LIST",
                    "label": "View roles list",
                    "description": "User can view roles list"
                },
                {
                    "id": 6,
                    "name": "VIEW_ROLES_SINGLE",
                    "label": "View single role",
                    "description": "User can view single role"
                },
                {
                    "id": 7,
                    "name": "EDIT_ROLES_SINGLE",
                    "label": "Edit single role",
                    "description": "User can edit single role"
                },
                {
                    "id": 8,
                    "name": "VIEW_RESERVATIONS_LIST",
                    "label": "View reservations list",
                    "description": "User can view reservations list"
                },
                {
                    "id": 9,
                    "name": "VIEW_RESERVATIONS_SHARED",
                    "label": "View shared reservations",
                    "description": "User can view shared reservations"
                },
                {
                    "id": 10,
                    "name": "VIEW_RESERVATIONS_REQUESTS",
                    "label": "View reservations requests",
                    "description": "User can view reservations requests"
                },
                {
                    "id": 11,
                    "name": "VIEW_RESERVATIONS_SINGLE",
                    "label": "View single reservation",
                    "description": "User can view single reservation"
                },
                {
                    "id": 12,
                    "name": "VIEW_COMPANIES_SAUDI",
                    "label": "View saudi companies",
                    "description": "User can view saudi companies"
                },
                {
                    "id": 13,
                    "name": "VIEW_COMPANIES_EXTERNAL",
                    "label": "View external companies",
                    "description": "User can view external companies"
                },
                {
                    "id": 14,
                    "name": "VIEW_COMPANIES_SINGLE",
                    "label": "View single company",
                    "description": "User can view single company"
                },
                {
                    "id": 15,
                    "name": "VIEW_COMPANIES_SINGLE_OVERVIEW",
                    "label": "View single company overview",
                    "description": "User can view single company overview"
                },
                {
                    "id": 16,
                    "name": "VIEW_COMPANIES_SINGLE_RESERVATION",
                    "label": "View single company reservations",
                    "description": "User can view single company reservations"
                },
                {
                    "id": 17,
                    "name": "EDIT_COMPANIES_SINGLE_SETTINGS",
                    "label": "Edit single company settings",
                    "description": "User can edit single company settings"
                },
                {
                    "id": 18,
                    "name": "EDIT_SETTINGS_GENERAL",
                    "label": "Edit general settings",
                    "description": "User can edit general settings"
                },
                {
                    "id": 19,
                    "name": "VIEW_PROFILE",
                    "label": "View profile",
                    "description": "User can view his profile"
                },
                {
                    "id": 20,
                    "name": "EDIT_PROFILE",
                    "label": "Edit profile",
                    "description": "User can edit his profile"
                }
            ]
        },
        {
            "name": "Admin",
            "permissions": []
        }
    ],
    "profileSettings": {
        "value": null
    }
  }),
  update: (data) => api.put(`${dashboardModule}/user/profile`, data),
};
