### How can we design the system in a way that every Company will be able to serve games on their gaming site from their domain?
First of all, it is important for us to ask companies to redirect from their domains to gPlatform, where
the backend will accept requests, but already taking into account the domain from which this request was sent

### What modification should be done to the users table at gPlatform to support this change? 
Create an additional table to store companies and their domains, add users to an existing table
, or create an auxiliary table to explicitly indicate the user's affiliation
to a particular domain. It is also possible to implement with games so that there is a division of games into different domains.
Ideally, it is possible to automatically create a new database for each site.

### Considering we have 1 backend cluster that serves all companies, how can we validate a user login on one gaming domain in such a way that it does not give access to a different gaming domain? (i.e. authenticating on site A, grants access to site A only)
By sending a request that takes into account the sending domain, it is also worth working with licenses,
creating a separate role-based permission control module for greater reliability
