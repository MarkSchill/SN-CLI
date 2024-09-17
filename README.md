# SN CLI
This is a testing project to integrate the ServiceNow API with the terminal via [deno](https://deno.com/).

## Features
- Allow for CRUD operations via the [ServiceNow Table API](https://docs.servicenow.com/bundle/xanadu-api-reference/page/integrate/inbound-rest/concept/c_TableAPI.html)
- Access list of specific records like sys_user, sys_user_group, sys_user_grmember

## How to use
- Inside of your ServiceNow instance, add the role `query_no_domain_table_api` to the user that you want to run the API as
- Create a `.env` file with the following environment variables
- - SN_INSTANCE=<URL of your ServiceNow instance>
- - SN_USERNAME=<Username of your API user>
- - SN_PASSWORD=<Password of your API user>

## Command line usage
