const flags = parseArgs(Deno.args, {
  string: ["version"],
  default: { color: true },
  negatable: ["color"],
});

console.log(flags.help);
