COMMIT_RANGE=$1
TARGETS=$2
BRANCH_NAME=$3
# Split the branches into an array
IFS=',' read -r -a TARGETS_ARRAY <<< "$TARGETS"
echo "Commit range: $COMMIT_RANGE"
# Loop through each branch and create PR
for TARGET in "${TARGETS_ARRAY[@]}"
do
    BRANCH_TARGET=$(echo $BRANCH_NAME-$TARGET |  tr '/' '-')
    echo "Creating PR for $BRANCH_TARGET"
    # Create a new branch from the base branch (main)
    git checkout -b $BRANCH_TARGET origin/$TARGET

    # Cherry-pick commits in the range
    git cherry-pick $COMMIT_RANGE
    # Push the new branch to the remote
    git push
    echo https://github.com/CyberhavenInc/dataflow/compare/$TARGET...$BRANCH_TARGET/$TARGET
done



