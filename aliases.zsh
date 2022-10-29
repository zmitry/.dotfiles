# shortcuts
alias tf=terraform
alias k=kubectl
alias dc="docker compose"
alias pip=pip3

# gcp
alias prod_projects="cat ~/Documents/Production.csv | python3 -c 'import csv, json, sys; print(json.dumps([dict(r) for r in csv.DictReader(sys.stdin)]))' | jq '[.[] | { key: .Project, value: . }] | from_entries'"
alias gcp_projects="gcloud projects list --format json | jq -r '[.[] | {key:.projectId, value: .}] | from_entries'"
alias merge_jsons="jq --slurp 'reduce .[] as \$item ({}; . * \$item)'"
alias project_info="echo \$(prod_projects) \$(gcp_projects) | merge_jsons  | jq -r '.[] | [.Customer, .projectId, . | tostring]| join(\" \")'  | fzf --with-nth 1,2 --preview 'echo {3..} | jq -r  | cat'"
alias gcluster="gcloud container clusters list --format=json | jq '.[].name' --raw-output | fzf | xargs -I _ gcloud container clusters get-credentials _ "
alias gproj="gcloud projects list | fzf | awk '{print \$1}' | xargs -I {} gcloud config set project {}"
alias gselect="gproj && gcluster"

# git
alias d="kitty +kitten diff"
alias pr_open='gh pr view --web'
