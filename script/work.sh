
gen_tf() {
    CLEANUP_TF_WORKSPACE=false
    while getopts "c" opt; do
      case "${opt}" in
        c)
          CLEANUP_TF_WORKSPACE=true
          ;;
      esac
    done
    shift $((OPTIND-1))

    GIT_REPO_NAME=$(pwd | rev | awk -F "/" '{printf $2}' | rev)

    if [[ "$GIT_REPO_NAME" == "dev-playground" || "$GIT_REPO_NAME" == "prod-infrastructure" ]]; then

        # Get Terraform Workspace name from the current dir name
        TF_WORKSPACE_NAME="${PWD##*/}"

        # Get Env type from git repo name
        ENV_TYPE="dev"
        if [[ "$GIT_REPO_NAME" == "prod-infrastructure" ]]; then
            ENV_TYPE="prod"
        fi

        # Move at git workspace root level
        cd ..

        # Install cookiecutter pip requirements
        pip install -r ../environments-templates/templates/workspace/requirements.txt >/dev/null

        # Backup current workspace code
        if [ "$CLEANUP_TF_WORKSPACE" = true ]; then
            mv ${TF_WORKSPACE_NAME} ${TF_WORKSPACE_NAME}".bkp"
        else
            cp -R ${TF_WORKSPACE_NAME} ${TF_WORKSPACE_NAME}".bkp"
        fi

        # Generate tf code via cookiecutter
        python ../environments-templates/templates/workspace/cookiecutter_runner.py \
            -w "$TF_WORKSPACE_NAME"                                                 \
            -e "$ENV_TYPE"                                                          \
            -p ../environments-definitions                                          \
            -i "$(whoami) (local-run)"

        if [ $? -ne 0 ]; then
            rm -rf ${TF_WORKSPACE_NAME}
            mv ${TF_WORKSPACE_NAME}".bkp" ${TF_WORKSPACE_NAME}
            echo "ERROR"
        else
            rm -rf ${TF_WORKSPACE_NAME}".bkp"
            echo "DONE"
        fi

        cd $TF_WORKSPACE_NAME

    else
        echo "Only TF workspaces from 'dev-playground' and 'prod-infrastructure' git repos are supported"
    fi

    echo ""
    echo ""
}
