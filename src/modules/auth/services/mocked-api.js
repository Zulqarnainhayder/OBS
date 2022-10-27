import { makeApiResponse } from "src/services/mocked-response";

export default {
  login: () => makeApiResponse({
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJqdGkiOiI5MjcwNjg4My1kY2RhLTQ1ZTUtYmMwNy1kMWY5ZDhlNTQxODEiLCJleHAiOjE2NTUzNzkxMzcsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNTQ7aHR0cDovL2xvY2FsaG9zdDo1MjU0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIn0.c8sWg3j0I4kpPfAr0_fUFHN9eNbZrvyIu1LQgMTJ-5M",
    "refreshToken": null,
    "expires": 1654022496
}),
};
