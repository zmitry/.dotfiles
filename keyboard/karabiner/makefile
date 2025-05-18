sync:
	ts-node config.ts

check:
	echo "checking..."
	jsonnetfmt rules.jsonnet > /dev/null

fmt:
	jsonnetfmt rules.jsonnet -o rules.jsonnet
	jsonnetfmt utils.jsonnet -o utils.jsonnet
