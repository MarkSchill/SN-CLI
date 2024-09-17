import "jsr:@std/dotenv/load";
import { parseArgs } from "jsr:@std/cli/parse-args";

const INSTANCE_URL = Deno.env.get("SN_INSTANCE");
const INSTANCE_USERNAME = Deno.env.get("SN_USERNAME");
const INSTANCE_PASSWORD = Deno.env.get("SN_PASSWORD");

type sys_user = {
  user_name: string;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
};

type sys_user_group = {};

type sys_user_grmember = {};

type flag_type = {
  [x: string]: unknown;
  user_name?: string | undefined;
  email?: string | undefined;
  company?: string | undefined;
  first?: string | undefined;
  last?: string | undefined;
  name?: string | undefined;
  user?: string | undefined;
  group?: string | undefined;
  _: Array<string | number>;
};

function recordObject(table: string, params: flag_type) {
  let record: sys_user | sys_user_group | sys_user_grmember = {};

  switch (table) {
    case "sys_user":
      record = {
        user_name: params.user_name,
        email: params.email,
        first_name: params.first,
        last_name: params.last,
        company: params.company,
      } as sys_user;
      break;
    case "sys_user_group":
      break;
    case "sys_user_grmember":
      break;
    default:
      break;
  }

  return record;
}

async function crud_create(
  table: string,
  record: sys_user | sys_user_group | sys_user_grmember,
) {
  const URL = `${INSTANCE_URL}/api/now/table/${table}`;
  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": `Basic ${
        btoa(INSTANCE_USERNAME + ":" + INSTANCE_PASSWORD)
      }`,
    },
    // body: JSON.stringify({}),
  };
  const res = await fetch(URL, options);
  const data = await res.json();
  console.log(data);
}

async function crud_read(
  table: string,
  record: sys_user | sys_user_group | sys_user_grmember,
) {
  const query_params = ``;

  const URL = `${INSTANCE_URL}/api/now/table/${table}?${query_params}`;
  const options = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": `Basic ${
        btoa(INSTANCE_USERNAME + ":" + INSTANCE_PASSWORD)
      }`,
    },
    body: JSON.stringify({}),
  };
  const res = await fetch(URL, options);
  const data = await res.json();
  console.log(data);
}

async function crud_update(
  table: string,
  record: sys_user | sys_user_group | sys_user_grmember,
) {
}

async function crud_delete(
  table: string,
  record: sys_user | sys_user_group | sys_user_grmember,
) {
}

if (import.meta.main) {
  const flags = parseArgs(Deno.args, {
    string: [
      "user_name",
      "company",
      "email",
      "first",
      "last", // sys_user
      "name",
      "company",
      "email", // sys_user_group
      "user",
      "group", // sys_user_grmember
    ],
  });

  const operation = Deno.args[0];
  const table = Deno.args[1];

  let obj: sys_user | sys_user_group | sys_user_grmember = recordObject(
    table,
    flags,
  );

  if (operation && table) {
    switch (operation) {
      case "create":
        crud_create(table, obj);
        break;
      case "read":
        crud_read(table, flags);
        break;
      case "update":
        crud_update(table, flags._);
        break;
      case "delete":
        crud_delete(table, flags._);
        break;
      default:
        console.log("Invalid operation, please ");
        break;
    }
  }
}
