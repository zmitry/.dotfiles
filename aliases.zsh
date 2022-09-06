alias tf=terraform
alias k=kubectl
alias gcluster="gcloud container clusters list --format=json | jq '.[].name' --raw-output | fzf | xargs -I _ gcloud container clusters get-credentials _ "
alias gproj="gcloud projects list | fzf | awk '{print \$1}' | xargs -I {} gcloud config set project {}"
alias gselect="gproj && gcluster"